import React, { useEffect } from "react";
import "./toast.css";

const Toast = (props) => {
  useEffect(() => {
    showProp();
  }, []);

  function showProp() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }
  return (
    <div>
      <div id="snackbar">{props.message}</div>
    </div>
  );
};

export default Toast;
