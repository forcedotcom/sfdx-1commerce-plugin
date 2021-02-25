/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { singleRecordQuery } from '../../../shared/queries';

const TOPIC = '1commerce';
const CMD = `${TOPIC}:import:products`;
const DEFAULT_PATH = '/commerce/webstores/import';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('sfdx-1commerce-plugin', TOPIC);

/**
 * Imports the Products in the CSV file Id provided for the webstore Id provided.
 */
export class ImportProducts extends SfdxCommand {
  protected static requiresUsername = true;

  public static description = 'Import uploaded data into a given webstore';

  public static examples = [`$ sfdx ${CMD} -d 00Dxx0000000000 -w 00Dxx0000000000`];

  protected static flagsConfig = {
    dataid: flags.string({
      char: 'd',
      required: true,
      description: messages.getMessage('dataIdDescription'),
    }),
    webstoreid: flags.string({
      char: 'w',
      description: messages.getMessage('webstoreIdDescription'),
    }),
    name: flags.string({
      char: 'n',
      description: messages.getMessage('nameDescription'),
    }),
  };

  public async run(): Promise<any> {
    const conn = this.org.getConnection();

    if (!this.flags.webstoreid && !this.flags.name) {
      throw new Error('you need to supply a webstore Id or name: ' + ImportProducts.examples);
    }

    let webStoreId = this.flags.webstoreid;
    if (!webStoreId) {
      this.ux.log(`Searching for WebStore ID from given name: ${this.flags.name}`);
      webStoreId = (
        await singleRecordQuery({
          conn,
          query: `select Id from WebStore where Name='${this.flags.name}'`,
        })
      ).Id;
    }

    this.ux.log(`Starting import for WebStore ID: ${webStoreId} to ${conn.baseUrl()}${DEFAULT_PATH}`);

    const importProductsResults = await conn.request({
      method: 'POST',
      url: `${conn.baseUrl()}${DEFAULT_PATH}`,
      body: `{
            "dataId": "${this.flags.dataid}",
            "webstoreId": "${webStoreId}"
          }`,
      headers: {
        key: 'Content-Type',
        type: 'text',
        value: 'application/json',
      },
    });

    const returnResult = JSON.stringify(importProductsResults);

    this.ux.log(`Results: ${returnResult}`);

    return returnResult;
  }
}
