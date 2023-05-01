import type { NextApiRequest, NextApiResponse } from "next";
import getDBClient from "../../lib/mongodb";
import validateMiddleware from "../../lib/validate-middleware";
import { check, validationResult } from "express-validator";
import { sendAdminEmail, sendSignedUpEmail } from "../../utils/email-helper";
import { PlayerData, Player } from "../../types";

const validateBody = validateMiddleware(
  [
    check("name").isString().isLength({ min: 2 }).trim(),
    check("email").isEmail().trim(),
  ],
  validationResult
);

export default async function addPlayers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await validateBody(req, res);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      hasError: true,
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }
  const name: string = req.body.name;
  const email = (req.body.email as string).toLowerCase();
  const createdDate = new Date();
  // connect to the database and save the new incoming player
  // the collction will be created dynamically if it does not exist yet.
  try {
    const client = await getDBClient();
    const db = client.db("softball").collection<Player>("players");
    let result = await db.insertOne({
      name,
      email,
      created_at: createdDate,
    });

    await sendAdminEmail(name, email, createdDate.toDateString(), "register");
    await sendSignedUpEmail(email, name);

    res.status(200).json({
      player: { name: name, email: email, created_at: createdDate },
      message: "Player added",
      playerID: result.insertedId,
    } as PlayerData);

    // don't call next()
    // need to return something json because frontend expects to receive `json.
    // no need send(), res.json does this.
    // catching errors related to inserting the document into the database
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate email , catched error before saving into db
      // send 409 'Conflict'
      return res.status(409).json({
        success: false,
        code: 11000,
        message: "duplicated-record",
      });
    }
    // some other errors
    return res.status(500).json({ message: JSON.stringify(err.message) });
  }
}
