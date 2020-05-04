# crabs

**Run multiple [crab](https://github.com/dabapps/crab) processes with a single command**

## Contributing

### Prerequisites

Ensure you are using NodeJS 12.

If you have [NVM](https://github.com/nvm-sh/nvm#installing-and-updating) installed you can simply run the following inside the project directory (each time you work on the project):

```shell
nvm use
```

If you don't have the correct version install already this may prompt you to run (just once):

```
nvm install
```

### Install dependencies

```shell
npm ci
```

### Build the binaries

```shell
npm run dist
```

This will output several binaries into `./bin`.
