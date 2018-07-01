import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableNameAcc,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'accountId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      accountId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET accName = :accName, description = :description, openingDate = :openingDate, closingDate = :closingDate, amount = :amount, crRate = :crRate, dbRate = :dbRate, interest = :interest",
 
    ExpressionAttributeValues: {
      ":accName": data.accName ? data.accName : null,
      ":description": data.description ? data.description : null,
      ":openingDate": data.openingDate ? data.openingDate : null,
      ":closingDate": data.closingDate ? data.closingDate : null,
      ":amount": data.amount,
      ":crRate": data.crRate,
      ":dbRate": data.dbRate,
      ":interest": data.interest
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
