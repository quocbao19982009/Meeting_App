import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

function homePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="This would help when people google"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </>
  );
}

export async function getStaticProps() {
  // THis code is run on the sever, so it more sucure and before the component rendering
  // This Make it better with SEO
  // Fetch API:
  const client = await MongoClient.connect(
    "mongodb+srv://quocbao19982009:Qscesz123@cluster0.g9eyr.mongodb.net/meetup?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
        // ID return from meet ups need to be transfer to String
      })),
    },
    revalidate: 10000,
    // Use this if you need to reRender (ex: to fetch api again, for money price...)
  };
}
// Only work in the component files
// Faster while use Static Props

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // Run on a sever, run for every Imcoing Request

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }
// getSeverSideProps if you need req or res for auth or st like that

export default homePage;
// domain.com/
