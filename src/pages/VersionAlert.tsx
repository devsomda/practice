import React, { useEffect, useState } from "react";
import packageJson from "../../package.json";
import AWS from "aws-sdk";

export default function VersionAlert() {
  // Approach 1
  const [state, setState] = useState("");
  const localVersion = window.localStorage.getItem("version");
  const packageVersion = packageJson.version;

  useEffect(() => {
    if (!localVersion || localVersion !== packageJson.version) {
      window.localStorage.setItem("version", packageJson.version);
    }
    if (localVersion !== packageJson.version) {
      alert("version Changed!");
    }
  }, []);

  const refreshTrigger = () => {
    window.location.reload();
  };

  const stateChangeHandler = () => {
    const date = new Date();
    setState(`State Changed at ${date}`);
  };

  // Approach2
  const [s3version, setS3Version] = useState("");

  const accessKeyId = process.env.REACT_APP_S3_ACCEES_KEY;
  const secretAccessKey = process.env.REACT_APP_S3_SECRET_ACCEES_KEY;

  const getS3Version = async () => {
    // AWS 설정
    AWS.config.update({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: "ap-northeast-2",
    });

    const s3 = new AWS.S3();

    // S3에서 파일 읽어오기
    const params = {
      Bucket: "version-file-bucket",
      Key: "version.txt",
    };

    await s3
      .getObject(params, (err, data) => {
        if (err) {
          console.error("Error", err);
        } else {
          console.log(data);
          const versionText = data?.Body?.toString("utf-8");
          setS3Version(versionText ? versionText : "");

          if (packageVersion !== versionText) {
            alert(
              `version Changed!, package: ${packageVersion}, s3: ${versionText}`
            );
          }
        }
      })
      .promise();
  };

  useEffect(() => {
    getS3Version();
  }, [state]);

  return (
    <div>
      <h2>LocalStorage</h2>
      <p>LocalStorage Verion: {localVersion}</p>
      <p>Package Version: {packageVersion}</p>
      <button type="button" onClick={refreshTrigger}>
        refresh action trigger
      </button>
      <button type="button" onClick={stateChangeHandler}>
        state change event
      </button>
      <p>State: {state}</p>
      <hr />
      <h2>S3</h2>
      <button type="button" onClick={getS3Version}>
        get S3 version!
      </button>
      <p>S3 Version: {s3version}</p>
      <p>Package Version: {packageVersion}</p>
    </div>
  );
}
