import type { NextApiRequest, NextApiResponse } from "next";
import getDBClient from "../../lib/mongodb";
import { Players } from "../../types/index";

export default async function deletePlayer(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const emailsArray = req.body;
  try {
    const client = await getDBClient;
    const db = client.db("softball").collection<Players>("players");
    const result = await db.deleteMany({
      email: { $in: emailsArray },
    });
    console.log("Deleted " + result.deletedCount + " players");
    res.status(200).json({ message: "ok" });
  } catch (err) {
    res.status(500).json({
      error: "db-players-could-not-delete",
      message: err.message,
    });
  }
}
