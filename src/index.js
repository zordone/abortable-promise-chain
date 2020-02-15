const noop = () => {};
const emptyPromise = new Promise(noop);

export default class AbortablePromise extends Promise {
  constructor(executor) {
    super(executor);
    this._aborted = false;
  }

  static from(promise) {
    if (promise instanceof AbortablePromise) {
      return promise;
    }
    return new AbortablePromise((resolve, reject) =>
      promise.then(resolve).catch(reject)
    );
  }

  _abort() {
    this._aborted = true;
  }

  _wrapHandler(handler) {
    if (!handler) {
      return handler;
    }
    return res => {
      let handlerResult;
      try {
        // run the original handler, pass the abort function in case it wants to abort
        handlerResult = handler(res, () => this._abort());
      } catch (ex) {
        // if it did abort, we ignore any exceptions thrown after that
        if (!this._aborted) {
          throw ex;
        }
      }
      // if it did abort, ignore the result and return empty promise
      if (this._aborted) {
        return emptyPromise;
      }
      // otherwise return the normal result
      return handlerResult;
    };
  }

  then(thenHandler, catchHandler) {
    return AbortablePromise.from(
      super.then(
        this._wrapHandler(thenHandler),
        this._wrapHandler(catchHandler)
      )
    );
  }

  catch(handler) {
    return AbortablePromise.from(super.catch(this._wrapHandler(handler)));
  }

  finally(handler) {
    return AbortablePromise.from(super.finally(this._wrapHandler(handler)));
  }
}
