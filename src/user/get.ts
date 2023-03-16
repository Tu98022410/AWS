import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayEvent } from "aws-lambda";

const db = new DynamoDB({
  region: "ap-southeast-1",
});

export const hello = async (event: APIGatewayEvent) => {
  const id = event.pathParameters?.id;


  try {
    const { Item } = await db.getItem({
      TableName: "Users",
      Key: marshall({ id }),
    });

    if (Item) {
      const user = unmarshall(Item);
      return user;
    }

    return null;
  } catch (error) {
    console.log("ERROR: ", error);
  }
};


