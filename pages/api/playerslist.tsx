import type { NextApiRequest, NextApiResponse } from "next";
import getDBClient from "../../lib/mongodb";
import { Player, ProjectedDocumentForPlayer } from "../../types";

export default async function getPlayersList(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD;
    // get headers authorization
    const authheader = req.headers.authorization;
    if (typeof authheader !== "undefined") {
      // distract only token password
      const tokenPass = authheader.split(" ")[1];
      // get token password from frontend
      if (tokenPass === adminPassword) {
        // then good to go to players
        const client = await getDBClient();
        const db = client.db("softball").collection<Player>("players");
        const response = await db
          .find<ProjectedDocumentForPlayer>(
            {
              unsubscribed: {
                // NULL or false
                $not: {
                  $eq: true,
                },
              },
            },
            { projection: { _id: 0, name: 1, email: 1 } }
          )
          .toArray();
        res.status(200).json(response);
        // return here to make this if & if done and anything else goes to error 403
        return;
      }
    }
    res.status(403).send(
      JSON.stringify({
        error: "You are not authenticated! Enter a valid password",
      })
    );
  } catch (err) {
    res.status(500).json({
      error: "db-players-could-not-find",
      message: err,
    });
  }
}
