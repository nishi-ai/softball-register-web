import getDBClient from "../../lib/mongodb";

export default async function getPlayersList(req, res) {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD;
    console.log("adminPassword", adminPassword);
    // get headers authorization
    const authheader = req.headers.authorization;
    console.log("req.headers.authorization", authheader);
    if (typeof authheader !== "undefined") {
      // distract only token password
      const tokenPass = authheader.split(" ")[1];
      console.log("tokenPass", tokenPass);
      // get token password from frontend
      if (tokenPass === adminPassword) {
        // then good to go to players
        console.log("authenticated");
        const client = await getDBClient;
        const db = client.db("softball").collection("players");
        const response = await db
          .find({}, { _id: 0, name: 1, email: 1 })
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
