/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { expect, test } from '@salesforce/command/lib/test';
import { ensureJsonMap, ensureString } from '@salesforce/ts-types';

const ID_RESP = {
  result: [
    {
      catalogId: '0ABC012',
      categoriesCreated: 0,
      dataId: '00CBA321',
      endTime: 1611937216089,
      entitlementId: '0ABC789',
      numberError: 0,
      numberSuccess: 2,
      numberToProcess: 2,
      pricebookId: '0ABC456',
      productsCreated: 0,
      productsUpdated: 2,
      sampleDataEnum: null,
      startTime: 1611937212942,
      startedBy: '00ABCSTME',
      status: 'COMPLETED',
      webstoreId: '0ABC123',
    },
  ],
};

describe.skip('1commerce:import:products', () => {
  test
    .withOrg({ username: 'test@org.com' }, true)
    .withConnectionRequest((request) => {
      const requestMap = ensureJsonMap(request);
      const url = ensureString(requestMap.url);

      if (url.match(/Organization/)) {
        return Promise.resolve({
          records: [
            {
              Name: 'Super Awesome Org',
              TrialExpirationDate: '2018-03-20T23:24:11.000+0000',
            },
          ],
        });
      }
      if (url.match(/import/)) {
        return Promise.resolve(ID_RESP);
      }
      if (url.match(/query/)) {
        return Promise.resolve({ totalSize: 1, result: [{ Id: '00XXXXXXX' }] });
      }
      return Promise.resolve({ result: [] });
    })
    .stdout()
    .stderr()
    .command([
      '1commerce:import:products',
      '--targetusername',
      'test@org.com',
      '--name',
      'TestStore',
      '-d',
      '00XXXXXXXX',
    ])
    .it('runs 1commerce:import:products --targetusername test@org.com --name TestStore', (ctx) => {
      expect(ctx.stdout, ctx.stderr).to.contain(
        '{"catalogId":"0ABC012","categoriesCreated":0,"dataId":"00CBA321","endTime":1611937216089,"entitlementId":"0ABC789","numberError":0,"numberSuccess":2,"numberToProcess":2,"pricebookId":"0ABC456","productsCreated":0,"productsUpdated":2,"sampleDataEnum":null,"startTime":1611937212942,"startedBy":"00ABCSTME","status":"COMPLETED","webstoreId":"0ABC123"}'
      );
    });
});
