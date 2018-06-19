import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableNameTemp,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      templateId: uuid.v1(),
      accountFromId: data.accountFromId,
      accountToId: data.accountToId,
      templateType: data.templateType,
      startDate: data.startDate,
      endDate: data.endDate,
      numPeriods: data.numPeriods,
      noEnd: data.noEnd,
      periodType: data.periodType,
      periodCnt: data.periodCnt,
      description: data.description,
      amount: data.amount,
      inflation: data.inflation,
      ccRelDate: data.ccRelDate,
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
