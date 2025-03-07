import { useEffect } from "react";

function Timmer({ dispatch, secondsremaining }) {
  const mins = Math.floor(secondsremaining / 60);
  const secs = secondsremaining % 60;
  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
        //   console.log("tick");
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
}

export default Timmer;
