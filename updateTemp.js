import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableNameTemp,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'accountId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      templateId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET accountFromId = :accountFromId, accountToId = :accountToId, templateType = :templateType, startDate = :startDate, endDate = :endDate, numPeriods = :numPeriods, noEnd = :noEnd, periodType = :periodType, periodCnt = :periodCnt, description = :description, amount = :amount, inflation = :inflation, ccRelDate = :ccRelDate",
    ExpressionAttributeValues: {
      ":accountFromId": data.accountFromId ? data.accountFromId : null,
      ":accountToId": data.accountToId ? data.accountToId : null,
      ":templateType": data.templateType ? data.templateType : null,
      ":startDate": data.startDate ? data.startDate : null,
      ":endDate": data.endDate ? data.endDate : null,
      ":numPeriods": data.numPeriods ? data.numPeriods : null,
      ":noEnd": data.noEnd ? data.noEnd : null,
      ":periodType": data.periodType ? data.periodType : null,
      ":periodCnt": data.periodCnt ? data.periodCnt : null,
      ":description": data.description ? data.description : null,
      ":amount": data.amount ? data.amount : null,
      ":inflation": data.inflation ? data.inflation : null,
      ":ccRelDate": data.ccRelDate ? data.ccRelDate : null
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    callback(null, success({ status: true }));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}
