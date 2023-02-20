import Head from "next/head";
import Image from "next/image";
import DisplayBasicInfo from "../components/BasicInfo";
import DisplayEventInfo from "../components/Events/EventInfo";
import NewPlayerPage from "../components/NewPlayerPage";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

import data from "../BasicData.json";
const inter = Inter({ subsets: ["latin"] });

import getDBClient from "../lib/mongodb";

export async function getServerSideProps() {
  try {
    // `await getDBClient` will use the default database passed in the MONGODB_URI
    // get database
    const client = await getDBClient;
    const db = client.db("softball").collection("events");

    // Execute queries against database
    const response = await db.find({}, { _id: 0, name: 1, email: 1 }).toArray();
    const result = JSON.parse(JSON.stringify(response));
    return {
      props: { result },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { result: { error: "db-events-could-not-find" } },
    };
  }
}

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Cats and Dogs Softball Berlin</title>
        <meta
          name='Cats and Dogs Softball Berlin'
          content='A non-competitive fun softball game played once a month during Summer.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <DisplayBasicInfo data={data.main} />
      <DisplayEventInfo eventData={props.result} />
      <NewPlayerPage data={data.main} />
    </>
  );
}
