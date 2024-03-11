import React, { useEffect, useState } from "react";
import packageJson from "../../package.json";

export default function VersionAlert() {
  const [state, setState] = useState("");

  const version = window.localStorage.getItem("version");

  useEffect(() => {
    if (!version || version !== packageJson.version) {
      window.localStorage.setItem("version", packageJson.version);
    }
    if (version !== packageJson.version) {
      alert("version Changed!");
    }

    console.log("local ver", version, "current", packageJson.version);
  }, []);

  const refreshTrigger = () => {
    window.location.reload();
  };

  const stateChangeHandler = () => {
    const date = new Date();
    setState(`State Changed at ${date}`);
  };

  return (
    <div>
      <p>LocalStorage Verion: {version}</p>
      <p>Package Version: {packageJson.version}</p>
      <button type="button" onClick={refreshTrigger}>
        refresh action trigger
      </button>
      <button type="button" onClick={stateChangeHandler}>
        state change event
      </button>
      <p>State: {state}</p>
    </div>
  );
}
