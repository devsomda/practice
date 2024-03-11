import React, { useEffect } from "react";
import packageJson from "../../package.json";

export default function VersionAlert() {
  const version = window.localStorage.getItem("version");

  useEffect(() => {
    if (!version) {
      window.localStorage.setItem("version", packageJson.version);
    }
    if (version !== packageJson.version) {
      alert("version Changed!");
    }

    console.log("local ver", version, "current", packageJson.version);
  }, []);

  const actionTrigger = () => {
    window.location.reload();
  };

  return (
    <div>
      <p>LocalStorage Verion: {version}</p>
      <p>Package Version: {packageJson.version}</p>
      <button type="button" onClick={actionTrigger}>
        refresh action trigger
      </button>
    </div>
  );
}
