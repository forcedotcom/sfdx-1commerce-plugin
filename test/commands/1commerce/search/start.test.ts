/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { core } from '@salesforce/command';
import { expect, test } from '@salesforce/command/lib/test';
import { ensureJsonMap, ensureString } from '@salesforce/ts-types';

const ID_RESP = {
  records: [
    {
      Id: '0ABC123',
    },
  ],
};

describe('1commerce:search:start', () => {
  test
    .withOrg({ username: 'test@org.com' }, true)
    .stub(core.Connection.prototype, 'query', async () => ID_RESP)
    .withConnectionRequest((request) => {
      const requestMap = ensureJsonMap(request);

      if (ensureString(requestMap.url).match(/Organization/)) {
        return Promise.resolve({
          records: [
            {
              Name: 'Super Awesome Org',
              TrialExpirationDate: '2018-03-20T23:24:11.000+0000',
            },
          ],
        });
      }
      return Promise.resolve({ records: [] });
    })
    .stdout()
    .command(['1commerce:search:start', '--targetusername', 'test@org.com', '--name', 'TestStore'])
    .it('runs 1commerce:search:start --targetusername test@org.com --name TestStore', (ctx) => {
      expect(ctx.stdout).to.contain('Starting index for WebStore ID: 0ABC123');
    });
});
