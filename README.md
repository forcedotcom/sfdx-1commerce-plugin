#sfdx-1commerce-plugin
=====================

SDFX Commands for managing 1Commerce WebStores and Data

## Installing

```
sfdx plugins:install sfdx-1commerce-plugin
```

### Installing from source
1. Install the SDFX CLI.
1. Clone the repository
1. Install node_modules modules: `yarn install`
1. Link the plugin: `sfdx plugins:link .`

## Docs

```
sfdx 1commerce -h
```

## Salesforce Internal Developers

* [See below](#sfdc-internal)

# Table of Contents

<!-- toc -->
* [Table of Contents](#table-of-contents)
* [Usage](#usage)
* [Commands](#commands)
* [How-to-Contribute](#how-to-contribute)
* [SFDC-Internal](#sfdc-internal)
<!-- tocstop -->
<!-- install -->

# Usage
<!-- usage -->
```sh-session
$ npm install -g sfdx-1commerce-plugin
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
sfdx-1commerce-plugin/0.0.1 darwin-x64 node-v14.11.0
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`sfdx 1commerce:search:start [-n <string> | -i <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-1commercesearchstart--n-string---i-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx 1commerce:search:start [-n <string> | -i <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Start search indexing for a given webstore

```
USAGE
  $ sfdx 1commerce:search:start [-n <string> | -i <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -i, --id=id                                                                       ID of webstore to index
  -n, --name=name                                                                   name of webstore to index

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  sfdx 1commerce:search:start -n storeName
  // Finds a store and indexes it
```
<!-- commandsstop -->
<!-- debugging-your-plugin -->

# How-to-Contribute

Please submit a PR! 

Information on development can be found here: https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_plugins.meta/sfdx_cli_plugins/cli_plugins.htm

