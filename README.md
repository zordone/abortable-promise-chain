# abortable-promise-chain

A Promise subclass to make the promise chain abortable.

## Why?

Sometimes in a promise chain you need to abort the chain, and prevent any additional `then`/`catch`/`finally` from running.

In simple cases, this can be done by just throwing an eception and catching it at the end of the chain. But let's imagine a more complex chain: multiple different `catch` handlers, handling different kinds of exceptions, only some of which are fatal. As complexity grows it's harder and harder (and uglier and harder to read) to make this happen.

That's why I wrote this package.

## Installation

1. To install the package, just run:

```shell
npm install abortable-promise-chain --save
```

2. Import it in your code and start using it:

```javascript
import AbortablePromise from 'abortable-promise-chain';

AbortablePromise.from(someApiCall())
  .then((res, abort) => {
    if (res.something) {
      abort();
    }
    return res;
  })
  .then(res => {
    // this won't run.
  });
```

## Usage

There are two ways of creating an `AbortablePromise`:

1. From an [executor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise#Syntax) function, just like we would use for creating a nomal `Promise`:

```javascript
const executor = (resolve, reject) => setTimeout(resolve(123), 1000);
const abortable = new AbortablePromise(executor);
```

2. From an already created normal `Promise`. (Note that we are using the `.from` static method instead of the constrructor here)

```javascript
const promise = fetch('some url');
const abortable = AbortablePromise.from(promise);
```

After we created our `AbortablePromise`, it's working exactly the same as a normal `Promise` except for one thing.

Every handler we pass to the `then` / `catch` / `finally` methods are getting an extra, second parameter which is the `abort` function. This can be used to (surprise!) abort the chain. That means no additional `then` / `catch` / `finally` handlers will be called and the promise will never be resolved or rejected.

Note that `finally` normally doesn't get any parameters, but we still use the second parameter for the abort function (for consistency), so you need to ignore the first one (which is always undefined).

```javascript
// ...continuing the previous example

abortable
  .then((res, abort) => {
    // i can call abort here
  })
  .catch((err, abort) => {
    // or here
  })
  .finally((_, abort) => {
    // or here
  });
```

## Pros

There are some other packages for a similar use case, but this one is:

- Tiny: ~4KB minified.
- Well tested: 100% test coverage.
- Safe: No known vulnerabilites according to npm audit.
- Self contained: No external dependencies (only devDependencies).

## Done

That's it, I hope you find this useful.
