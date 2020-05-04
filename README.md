# crabs 🦀🦀

**Run multiple [crab](https://github.com/dabapps/crab) processes with a single command**

## Installation

Make sure you have installed [crab](https://github.com/dabapps/crab)... duh.

Download the relevant release for your machine from the [GitHub releases](https://github.com/JakeSidSmith/crabs/releases).

First we need to make sure the file is executable e.g.

```shell
chmod +x ~/Downloads/crabs-macos
```

If you are using MacOS Catalina then you'll have to do a stupid thing before you can start using crabs.

Right click on the file you downloaded. Select "Open". A dialog will appear. Select "Open" again. You can then kill the terminal this opened.

Now just move it to somewhere on your path:

```shell
mv ~/Downloads/crabs-macos /usr/local/bin/crabs
```

## Usage

Run all processes for a project (including a crab router):

```shell
crabs
```

Exclude process(es):

```shell
crabs -x worker -x scheduler
```

Run specified process(es):

```shell
crabs router web watch-js
```

Note: specifying processes will ignore excluded processes so the following would still run the "web" process:

```shell
crabs web -x web
```

You can even use `!` and `*` wildcards e.g.

The following will start all processes beginning with "watch":

```shell
crabs 'watch*'
```

Either of the following will exclude processes containing "worker":

```shell
crabs -x '*worker*'
crabs '!*worker*'
```

You can add global excludes using the `CRABS_EXCLUDE` environment variable!

Just stick a comma separated list of the things you'd like to exclude in your bash profile (or wherever you put those things).

The following would exclude all processes containing "worker", "scheduler", or "email":

```shell
export CRABS_EXCLUDE='*worker*,*scheduler*,*email*'
```

Because of the special `!` and `*` characters, you will need escape them if you want to match processes with those in the names (which would be really weird, why would you do that?).

E.g. if you had a process called "w\*e\*b" and a process called "web", running the following would start both:

```shell
crabs 'w*e*b'
```

You would have to escape the `*`s with something like:

```shell
crabs 'w\*e\*b'
```

View help and usage info:

```shell
crabs --help
```

## Environment variables

Crabs uses the crab `PROC_FILE` environment variable to look for procfiles. You can read how that works in the [crab documentation](https://github.com/dabapps/crab).

You can use the `CRABS_EXCLUDE` environment variable to globally exclude processes (comma separated) e.g.

```shell
export CRABS_EXCLUDE='*worker*,*scheduler*,*email*'
```

These can still be overridden by specifying them when running crabs. The following would still start a "worker" process even though "\*worker\*" is globally excluded:

```shell
crabs worker
```

## Contributing

### Prerequisites

Ensure you are using NodeJS 12.

If you have [NVM](https://github.com/nvm-sh/nvm#installing-and-updating) installed you can simply run the following inside the project directory (each time you work on the project):

```shell
nvm use
```

If you don't have the correct version install already this may prompt you to run (just once):

```shell
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

### Build and symlink for testing

This will remove any existing installation, output several binaries into `./bin`, and symlink the macos binary:

```shell
rm /usr/local/bin/crabs && npm run dist && ln bin/crabs-macos /usr/local/bin/crabs
```
