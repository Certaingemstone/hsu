import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ActivityViewer(props) {


}

function ActivityList(props) {

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
  const [inputName, setInputName] = useState("");
  const [inputDuration, setInputDuration] = useState("")
  const [activities, setActivities] = useState({});
  const [highestId, setHighestId] = useState(0);
  const [selection, setSelection] = useState(0);
  const inputRef = useRef()

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
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
      <ActivityList 
        activities={activities} 
        selection={selection}
        setSelection={setSelection}
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