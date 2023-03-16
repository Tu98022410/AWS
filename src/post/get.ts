import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayEvent } from "aws-lambda";
const db = new DynamoDB({
  region: "ap-southeast-1",
});

export const hello = async (event: APIGatewayEvent) => {
  const id = event.pathParameters?.id;

  try {
    // const { Item } = await db.getItem({
    //   TableName: "Posts",
    //   Key: marshall({ id }),
    // });
    const { Items }: any = await db.scan({
      TableName: "Posts",
    });

    if (!Items) {
      throw new Error("Not found");
    }

    return {
      statusCode: 200,
      body: unmarshall(Items),
    };
  } catch (error) {
    console.log("ERROR: ", error);
  }
};
