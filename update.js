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
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":name": data.name ? data.name : null,
      ":description": data.description ? data.description : null,
      ":openingDate": data.openingDate ? data.openingDate : null,
      ":closingDate": data.closingDate ? data.closingDate : null,
      ":amount": data.amount ? data.amount : null,
      ":crRate": data.crRate ? data.crRate : null,
      ":dbRate": data.dbRate ? data.dbRate : null,
      ":interest": data.interest ? data.interest : null
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
