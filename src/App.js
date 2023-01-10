import React, { useEffect } from "react"
import { useStore, useDispatch } from "react-redux";
import { initialize } from "./reducers/tripReducer";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {dispatch(initialize())},[dispatch])

  const trips = useStore(state => state.trips)
  console.log('trips ->', trips);
  return (
    <div>
     <h1>City bile Application</h1>
     
    </div>
  );
}

export default App;
