#sfdx-1commerce-plugin
=====================

SDFX Commands for managing 1Commerce WebStores and Data

## Installing

```
sfdx plugins:install https://github.com/forcedotcom/sfdx-1commerce-plugin
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
<!-- tocstop -->
<!-- install -->

# Usage
<!-- usage -->
```sh-session
$ npm install -g sfdx-1commerce-plugin
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
sfdx-1commerce-plugin/0.0.5 darwin-x64 node-v14.15.1
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`sfdx 1commerce:import:products -d <string> [-w <string>] [-n <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-1commerceimportproducts--d-string--w-string--n-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx 1commerce:search:start [-n <string> | -i <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-1commercesearchstart--n-string---i-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx 1commerce:import:products -d <string> [-w <string>] [-n <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Import uploaded data into a given webstore

```
USAGE
  $ sfdx 1commerce:import:products -d <string> [-w <string>] [-n <string>] [-u <string>] [--apiversion <string>] 
  [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --dataid=dataid                                                               (required) ID of a file in FFX; CSV
                                                                                    only for 230; JSON and XML (?)
                                                                                    planned for the future. To be
                                                                                    imported into the store

  -n, --name=name                                                                   The name of the webstore to import
                                                                                    to that was created. This or the
                                                                                    webstoreId is required

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -w, --webstoreid=webstoreid                                                       the ID of the webstore to import to,
                                                                                    will fetch/create the defaults
                                                                                    associated with this webstore if
                                                                                    needed. This is or the name is
                                                                                    required.

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx 1commerce:import:products -d 00Dxx0000000000 -w 00Dxx0000000000
```

_See code: [lib/commands/1commerce/import/products.js](https://github.com/forcedotcom/sfdx-1commerce-plugin/blob/v0.0.5/lib/commands/1commerce/import/products.js)_

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

_See code: [lib/commands/1commerce/search/start.js](https://github.com/forcedotcom/sfdx-1commerce-plugin/blob/v0.0.5/lib/commands/1commerce/search/start.js)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->

# How-to-Contribute

Please submit a PR! 

Information on development can be found here: https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_plugins.meta/sfdx_cli_plugins/cli_plugins.htm
