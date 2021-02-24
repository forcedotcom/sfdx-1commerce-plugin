import { core } from "@salesforce/command";
import { expect, test } from "@salesforce/command/lib/test";
import { ensureJsonMap, ensureString } from "@salesforce/ts-types";

const ID_RESP = {
  result: [
    {
      catalogId: "0ABC012",
      categoriesCreated: 0,
      dataId: "00CBA321",
      endTime: 1611937216089,
      entitlementId: "0ABC789",
      numberError: 0,
      numberSuccess: 2,
      numberToProcess: 2,
      pricebookId: "0ABC456",
      productsCreated: 0,
      productsUpdated: 2,
      sampleDataEnum: null,
      startTime: 1611937212942,
      startedBy: "00ABCSTME",
      status: "COMPLETED",
      webstoreId: "0ABC123",
    },
  ],
};

describe("1commerce:import:products", () => {
  test
    .withOrg({ username: "test@org.com" }, true)
    .stub(core.Connection.prototype, "post", async () => ID_RESP)
    .withConnectionRequest((request) => {
      const requestMap = ensureJsonMap(request);

      if (ensureString(requestMap.url).match(/Organization/)) {
        return Promise.resolve({
          records: [
            {
              Name: "Super Awesome Org",
              TrialExpirationDate: "2018-03-20T23:24:11.000+0000",
            },
          ],
        });
      }
      return Promise.resolve({ result: [] });
    })
    .stdout()
    .command([
      "1commerce:import:products",
      "--targetusername",
      "test@org.com",
      "--name",
      "TestStore",
    ])
    .it(
      "runs 1commerce:import:products --targetusername test@org.com --name TestStore",
      (ctx) => {
        expect(ctx.stdout).to.contain(
          '{"catalogId":"0ABC012","categoriesCreated":0,"dataId":"00CBA321","endTime":1611937216089,"entitlementId":"0ABC789","numberError":0,"numberSuccess":2,"numberToProcess":2,"pricebookId":"0ABC456","productsCreated":0,"productsUpdated":2,"sampleDataEnum":null,"startTime":1611937212942,"startedBy":"00ABCSTME","status":"COMPLETED","webstoreId":"0ABC123"}'
        );
      }
    );
});
