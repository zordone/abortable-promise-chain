<!-- prettier-ignore -->
## Tasks

- ✅ Creating with executor
- ✅ Creating from a normal Promise
- ✅ Normal `then`/`catch`/`finally` flow
- ✅ All handlers get an `abort` function parameter that aborts the rest of the chain
- ✅ Add test suite
- ✅ Add eslint & prettier
- ✅ Write readme
- ✅ Publish to npm (with the `np` tool)
- ✅ Add code coverage badge
- use Promise.race instead of the timeout->done in the tests?
- Readme: side by side example
- add jsdoc comments
- add onAborted as an executor param?

## Release process

1. Commit and push all changes
1. Run `npm run release`
1. It will ask for a new version
1. It will ask for a 2FA token, copy the one called "npm" from the Authenticator app
1. It will open the github release notes page. Fill it out.
1. After the release, run `npx codecov --token="<token>"`. Copy the token from [here](https://codecov.io/gh/zordone/abortable-promise-chain/settings).
1. Done. Verify github and npm.
