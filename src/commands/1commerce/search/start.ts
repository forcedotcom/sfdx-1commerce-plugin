/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { flags, SfdxCommand } from '@salesforce/command';
import { AnyJson } from '@salesforce/ts-types';
import { singleRecordQuery } from '../../../shared/queries';

export default class SearchIndex extends SfdxCommand {
  public static description = 'Start search indexing for a given webstore';

  public static examples = [
    `sfdx 1commerce:search:start -n storeName
// Finds a store and indexes it
`,
  ];

  protected static requiresUsername = true;

  protected static flagsConfig = {
    name: flags.string({
      char: 'n',
      description: 'name of webstore to index',
      exclusive: ['id'],
    }),
    id: flags.string({
      char: 'i',
      description: 'ID of webstore to index',
      exclusive: ['name'],
    }),
  };

  public async run(): Promise<AnyJson> {
    const conn = this.org.getConnection();

    if (!this.flags.id && !this.flags.name) {
      throw new Error('you have to supply either --id or --name');
    }

    let webStoreId = this.flags.id;
    if (!webStoreId) {
      webStoreId = (
        await singleRecordQuery({
          conn,
          query: `select Id from WebStore where Name='${this.flags.name}'`,
        })
      ).Id;
    }

    this.ux.log(`Starting index for WebStore ID: ${webStoreId}`);

    const startIndexResults = await conn.request({
      method: 'POST',
      url: `${conn.baseUrl()}/commerce/management/webstores/${webStoreId}/search/indexes`,
      body: '{}',
    });

    this.ux.log(`Results: ${JSON.stringify(startIndexResults)}`);
    return startIndexResults;
  }
}
