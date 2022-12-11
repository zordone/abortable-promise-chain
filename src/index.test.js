/* eslint-disable no-unused-vars */
import AbortablePromise from './index';

const noop = () => {};
const timeout = (ms = 10) => new Promise(resolve => setTimeout(resolve, ms));
const shouldntRun = name => () => {
  throw `${name} should't run`;
};
const shouldBePending = async promise => {
  await timeout();
  const status = await Promise.race([promise, Promise.resolve('pending')]);
  expect(status).toBe('pending');
};

describe('new AbortablePromise()', () => {
  it('handles a `then` chain without errors', () => {
    const executor = (resolve, reject) => setTimeout(resolve(1));
    const abortable = new AbortablePromise(executor)
      .then(res => res * 2)
      .then(res => res * 3);
    return expect(abortable).resolves.toBe(6);
  });

  it('catches executor rejects', () => {
    const executor = (resolve, reject) => setTimeout(reject('foo'));
    const abortable = new AbortablePromise(executor)
      .then(res => 'ok')
      .catch(err => 'caught');
    return expect(abortable).resolves.toBe('caught');
  });

  it('ignores `catch` after a successful `then`', () => {
    const executor = (resolve, reject) => setTimeout(resolve('foo'));
    const abortable = new AbortablePromise(executor)
      .then(res => 'ok')
      .catch(err => 'caught');
    return expect(abortable).resolves.toBe('ok');
  });

  it('catches executor rejects with a 2 param `then`', () => {
    const executor = (resolve, reject) => setTimeout(reject('foo'));
    const abortable = new AbortablePromise(executor).then(
      res => 'ok',
      err => 'caught'
    );
    return expect(abortable).resolves.toBe('caught');
  });

  it('catches exceptions thrown in a `then`', () => {
    const executor = (resolve, reject) => setTimeout(resolve(2));
    const abortable = new AbortablePromise(executor)
      .then(res => {
        throw 'something';
      })
      .catch(err => 'caught');
    return expect(abortable).resolves.toBe('caught');
  });

  it('rejects after uncaught errors', () => {
    const executor = (resolve, reject) => setTimeout(resolve(2));
    const abortable = new AbortablePromise(executor).then(res => {
      throw 'something';
    });
    return expect(abortable).rejects.toBe('something');
  });
});

describe('AbortablePromise.from()', () => {
  it("doesn't wrap a Promise multiple times", () => {
    const promise = Promise.resolve('foo');
    const wrap1 = AbortablePromise.from(promise);
    const wrap2 = AbortablePromise.from(wrap1);
    expect(wrap1).toBe(wrap2);
  });

  it('handles a `then` chain without errors', () => {
    const promise = Promise.resolve(3);
    const abortable = AbortablePromise.from(promise)
      .then(res => res * 3)
      .then(res => res * 4);
    return expect(abortable).resolves.toBe(36);
  });

  it('rejects if the original Promise rejects', () => {
    const promise = Promise.reject('error');
    const abortable = AbortablePromise.from(promise).then(res => 'ok');
    return expect(abortable).rejects.toBe('error');
  });

  it('handles a 2 param `then` with no errors', () => {
    const promise = Promise.resolve('value');
    const abortable = AbortablePromise.from(promise).then(
      res => 'then',
      err => 'catch'
    );
    expect(abortable).resolves.toBe('then');
  });

  it('handles a 2 param `then` with errors', () => {
    const promise = Promise.reject('error');
    const abortable = AbortablePromise.from(promise).then(
      res => 'then',
      err => 'catch'
    );
    expect(abortable).resolves.toBe('catch');
  });

  it('converts returned values to AbortablePromise', () => {
    const promise = Promise.resolve(6);
    const abortable = AbortablePromise.from(promise)
      .then(res => 'primitive value')
      .then((res, abort) => {
        expect(abort).toBeDefined();
        return Promise.resolve('native promise');
      })
      .then((res, abort) => {
        expect(abort).toBeDefined();
        return 'ok';
      });
    return expect(abortable).resolves.toBe('ok');
  });

  it('handles multiple `then`-`catch` pairs', () => {
    const promise = Promise.resolve('value');
    const abortable = AbortablePromise.from(promise)
      .then(res => 'then1')
      .then(res => {
        throw 'error1';
      })
      .catch(err => {
        expect(err).toBe('error1');
        return 'catch1';
      })
      .then(res => {
        expect(res).toBe('catch1');
        throw 'error2';
      })
      .catch(err => {
        expect(err).toBe('error2');
        return 'catch2';
      });
    return expect(abortable).resolves.toBe('catch2');
  });
});

describe('finally()', () => {
  it('runs after a resolved chain', () => {
    const promise = Promise.resolve(4);
    const onFinally = jest.fn();
    return AbortablePromise.from(promise)
      .then(res => 'foo')
      .finally(onFinally)
      .then(res => {
        expect(onFinally).toBeCalled();
        expect(res).toBe('foo');
      });
  });

  it('runs after a rejected chain', () => {
    const promise = Promise.reject('error');
    const onFinally = jest.fn();
    return AbortablePromise.from(promise)
      .catch(err => 'caught')
      .finally(onFinally)
      .then(res => {
        expect(onFinally).toBeCalled();
        expect(res).toBe('caught');
      });
  });

  it('runs after a `throw` in the chain', () => {
    const promise = Promise.resolve(5);
    const onFinally = jest.fn();
    return AbortablePromise.from(promise)
      .then(res => {
        throw 'error';
      })
      .finally(onFinally)
      .catch(noop)
      .then(() => expect(onFinally).toBeCalled());
  });
});

describe('aborting', () => {
  it('can abort in `then`', async () => {
    const promise = AbortablePromise.from(Promise.resolve('original'))
      .then((res, abort) => {
        abort();
        return 'this should be ignored';
      })
      .then(shouldntRun('then'));
    return shouldBePending(promise);
  });

  it('can abort in `catch`', async () => {
    const promise = AbortablePromise.from(Promise.reject('error'))
      .catch((res, abort) => {
        abort();
        return 'this should be ignored';
      })
      .then(shouldntRun('then'));
    return shouldBePending(promise);
  });

  it('can abort in `finally`', async () => {
    const promise = AbortablePromise.from(Promise.reject('error'))
      .finally((_, abort) => {
        abort();
        return 'this should be ignored';
      })
      .then(shouldntRun('then'));
    return shouldBePending(promise);
  });

  it('can abort in the `onFulfilled` handler of a 2 param `then`', async () => {
    const promise = AbortablePromise.from(Promise.resolve('value'))
      .then(
        (res, abort) => abort(),
        err => 'catch'
      )
      .then(shouldntRun('then'));
    return shouldBePending(promise);
  });

  it('can abort in the `onRejected` handler of a 2 param `then`', async () => {
    const promise = AbortablePromise.from(Promise.reject('error'))
      .then(
        res => 'then',
        (err, abort) => abort()
      )
      .then(shouldntRun('then'));
    return shouldBePending(promise);
  });

  it('ignores exceptions thrown after `abort`', async () => {
    const promise = AbortablePromise.from(Promise.resolve('original'))
      .then((res, abort) => {
        abort();
        throw 'after abort';
      })
      .then(shouldntRun('then'))
      .catch(shouldntRun('catch'))
      .finally(shouldntRun('finally'));
    return shouldBePending(promise);
  });
});
