import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableNameAcc,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      accountId: uuid.v1(),
      description: data.description,
      accName: data.accName,
      openingDate: data.openingDate,
      closingDate: data.closingDate,
      amount: data.amount,
      crRate: data.crRate,
      dbRate: data.dbRate,
      interest: data.interest,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}
