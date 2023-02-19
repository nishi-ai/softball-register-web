import clientPromise from "../../lib/mongodb";

export default async function deletePlayer(req, res) {
  console.log("Here DESTROY PLAYER(S)");
  console.log("req.body:", req.body);
  const emailsArray = req.body;
  try {
    const client = await clientPromise;
    const db = client.db("softball").collection("players");
    const result = await db.deleteMany({
      email: { $in: emailsArray },
    });
    console.log("Deleted " + result.deletedCount + " players");
    res.status(200).json({ message: "ok" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "db-players-could-not-delete",
      message: err,
    });
  }
}
