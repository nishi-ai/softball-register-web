import { ObjectId } from "mongodb";

export interface Result {
  cats: number;
  dogs: number;
}
export interface Events {
  _id?: ObjectId;
  date: string;
  result: Result;
}
export interface EventsResult {
  error: string;
}
export interface Player {
  _id?: ObjectId;
  name: string;
  email: string;
  unsubscribed?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
export interface ProjectedDocumentForEvent {
  date: string;
  result: Result;
}
export interface ProjectedDocumentForPlayer {
  name: string;
  email: string;
}

export type PlayerData = {
  player?: Player;
  message: string;
  playerID: ObjectId;
};

export interface PlayersList extends Player {
  id: number;
  selected: boolean;
}

export interface BasicDataMain {
  teamName: string;
  sportName: string;
  city: string;
  description: string;
  title: string;
  location: string;
  registeration: string;
}

export interface BasicDataStatus {
  success?: string;
  successDescription?: string;
  error?: string;
  errorDescription?: string;
}
