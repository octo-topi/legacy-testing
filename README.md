# Legacy testing

VanillaJs port of Cyrille Martraire [QuoteBot](https://github.com/cyriux/legacy-testing-kata-java).

## Install

```shell
git clone git@github.com:octo-topi/legacy-testing.git
nvm use
npm install
```

## Run

```shell
npm run application
```

You'll get an error message: this is as expected.

```text
Error: Missing license
```

## Test

Automated tests

```shell
npm run test
```

Assertion coverage (Mutation testing using Stryker)

```shell
npm run assertion-coverage
```

Run tests on all commits of a pull request; to make sure all tests pass.

```shell
git rebase --exec "npm run test" main
```