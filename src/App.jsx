import React, { useEffect, useState, useRef } from 'react';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function ActivityViewer(props) {
  // Renders an activity
  const act = props.activity;
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.fillStyle = 'red';
    context.fillRect(0, 0, props.width, props.height);
  }, []);

  return <div className="activity-viewer">
    <canvas ref={canvasRef} width={props.width} height={props.height} />
  </div>;
}

function ActivityList(props) {
  // Renders the list of activities
  function handleClick(key) {
    props.setSelection(key);
    console.log("selected:", key);
  }

  // to use map, activities needs to be an array
  let activityArray = []
  Object.keys(props.activities).forEach((key) => (
    activityArray.push(props.activities[key])
  ))

  return (
    <ul>
      {activityArray.map((activity) => (
        <li
          key={activity.id}
          className={"list-group-item"}
          onClick={() => handleClick(activity.id)}
        >
          {(props.selection === activity.id) 
            ? <span><b>{activity.name} {activity.duration}</b></span> 
            : <span>{activity.name} {activity.duration}</span>
          }
        </li>
      ))}
    </ul>
  );
}

function ActivityManager() {
  // Input and define new activities
  const [inputName, setInputName] = useState("");
  const [inputDuration, setInputDuration] = useState("")
  const [activities, setActivities] = useState({});
  const [highestId, setHighestId] = useState(0);
  const [selection, setSelection] = useState(0);
  const inputRef = useRef();

  function handleChangeName(event) {
    setInputName(event.target.value);
  }

  function handleChangeDuration(event) {
    setInputDuration(event.target.value);
  }

  function handleSubmitActivity(event) {
    event.preventDefault();
    const newAct = {
      id: highestId,
      name: inputName,
      duration: inputDuration
    };
    setHighestId(highestId + 1);
    setActivities(activities => ({...activities, [highestId]: newAct})); 
    setInputName("");
    setInputDuration("");
  } 

  function handleDeleteActivity() {
    try {
      delete activities[selection];
      console.log("attempted deletion of", selection)
      setSelection(0);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmitActivity}>
        <div className="form-group">
          <label htmlFor="name-input">Activity name:</label>
          <input
            type="text"
            className="form-control"
            id="name-input"
            value={inputName}
            onChange={handleChangeName}
            ref={inputRef}
          />
          <label htmlFor="duration-input">Duration:</label>
          <input
            type="number"
            className="form-control"
            id="duration-input"
            value={inputDuration}
            onChange={handleChangeDuration}
            ref={inputRef}
          />
        </div>
        <div className="button-row">
          <button type="submit" name="add" className="btn btn-primary">
            Add
          </button>
          <button type="button" name="delete" className="btn" onClick={handleDeleteActivity}>
            Delete
          </button>
        </div>
      </form>

      <ActivityList 
        activities={activities} 
        selection={selection}
        setSelection={setSelection}
      />

      <ActivityViewer
        activity={activities.selection}
        width={500}
        height={200}
      />

    </div>
  );
}

function App() {

  return (
    <div className="container mt-5">
      <h1>Activities</h1>
      
      <ActivityManager />
      
    </div>
  );
}

export default App;