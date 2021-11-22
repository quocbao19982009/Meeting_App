import classes from "./MeetupDetail.module.css";

function MeetupDetail(props) {
  return (
    <div className={classes.detail}>
      <img src={props.img} alt={props.title}></img>
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
      <button>Delete Meetup</button>
    </div>
  );
}
export default MeetupDetail;
