# crabs 🦀🦀

**Run multiple [crab](https://github.com/dabapps/crab) processes with a single command**

## Installation

Download the relevant release for your machine from the [GitHub releases](https://github.com/JakeSidSmith/crabs/releases).

If you are using MacOS Catalina then you'll have to do a stu[id thing before you can start using crabs.

Right click on the file you downloaded. Select "Open". A dialog will appear. Select "Open" again. You can then kill the terminal this opened.

Now just make it executable and move it to somewhere on your path:

```shell
chmod +x ~/Downloads/crabs-macos
mv ~/Downloads/crabs-macos /usr/local/bin/crabs
```

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
