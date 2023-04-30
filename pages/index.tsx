import { GetServerSideProps } from "next";
import Head from "next/head";
import DisplayBasicInfo from "../components/BasicInfo";
import DisplayEventInfo from "../components/Events/EventInfo";
import NewPlayerPage from "../components/NewPlayerPage";

import data from "../BasicData.json";
import getDBClient from "../lib/mongodb";
import { Events, EventsResult, ProjectedDocumentForEvent } from "../types";

type EventsProps = {
  result?: Events[];
};

type EventsError = {
  resultError?: string;
};

export const getServerSideProps: GetServerSideProps<
  EventsProps | EventsError
> = async () => {
  try {
    // `await getDBClient` will use the default database passed in the MONGODB_URI
    // get database
    const client = await getDBClient();
    const db = client.db("softball").collection<Events>("events");

    // Execute queries against database
    const response = await db
      .find<ProjectedDocumentForEvent>(
        {},
        { projection: { _id: 1, date: 1, result: 1 } }
      )
      .sort({ date: -1 })
      .toArray();
    const result = JSON.parse(JSON.stringify(response));
    return {
      props: { result },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { resultError: "db-events-could-not-find" },
    };
  }
};

export default function Home(props: {
  result: Events[];
  resultError: EventsResult;
}) {
  return (
    <>
      <Head>
        <title>Cats and Dogs Softball Berlin</title>
        <meta
          name="Cats and Dogs Softball Berlin"
          content="A non-competitive fun softball game played once a month during Summer."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DisplayBasicInfo data={data.main} />
      <DisplayEventInfo
        eventData={props.result}
        errorState={props.resultError}
      />
      <NewPlayerPage data={data.main} />
      <a
        style={{ marginBottom: "100px", textDecoration: "underline" }}
        href="/unsubscribe"
      >
        Unsubscribe
      </a>
    </>
  );
}
