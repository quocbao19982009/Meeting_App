import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetailId(props) {
  const router = useRouter();

  return (
    <MeetupDetail
      img={props.meetupData.img}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    ></MeetupDetail>
  );
}

// if you have dynamic pages, you will ned also getStaticPaths() to ensure that every dynamic is pre-render

export async function getStaticPaths(context) {
  const client = await MongoClient.connect(
    "mongodb+srv://quocbao19982009:Qscesz123@cluster0.g9eyr.mongodb.net/meetup?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    // if you define all the page, say yes, if not then say no, the one you define here will be prerender
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  // fetch data for a single meetup
  const client = await MongoClient.connect(
    "mongodb+srv://quocbao19982009:Qscesz123@cluster0.g9eyr.mongodb.net/meetup?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetupSelected = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  // To access the ID or parms of the page use: context.params.[dynamic]

  client.close();

  return {
    props: {
      meetupData: {
        img: meetupSelected.image,
        title: meetupSelected.title,
        address: meetupSelected.address,
        description: meetupSelected.description,
        id: meetupId,
      },
    },
  };
}

export default MeetupDetailId;
