import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function newMeetup() {
  const router = useRouter();

  const addMeetupHandler = async function (enteredMeetupData) {
    // so sending the data to the api folder, and to the new-meetup folder
    const respone = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await respone.json();

    router.push("/");
  };

  return <NewMeetupForm onAddMeetup={addMeetupHandler}></NewMeetupForm>;
}
export default newMeetup;
