import { ObjectId } from "mongodb";

export interface Events {
  _id?: ObjectId | undefined;
  date: string;
  result: object;
}

export interface Players {
  _id?: ObjectId | undefined;
  name: string;
  email: string;
}

export interface ProjectedDocumentForEvent {
  date: string;
  result: object;
}

export interface ProjectedDocumentForPlayer {
  name: string;
  email: string;
}

type Player = {
  name: string;
  email: string;
  created_at: Date;
};

export type PlayerData = {
  player?: Player;
  message: string;
  playerID: ObjectId;
};
