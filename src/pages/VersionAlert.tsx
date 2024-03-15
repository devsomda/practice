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
        }
      })
      .promise();
  };

  useEffect(() => {
    if (s3version && packageVersion !== s3version) {
      alert(`version Changed!, package: ${packageVersion}, s3: ${s3version}`);
    }
  }, [s3version]);

  useEffect(() => {
    // 탭이 활성화되었을 때 visibilitychange 이벤트를 감지하여 getS3Version 함수를 호출합니다.
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        getS3Version();
        console.log("실행");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  });

  // useEffect(() => {
  //   getS3Version();
  // }, [state]);

  return (
    <div>
      <p>
        버전 업데이트 시, 웹 사이트 새로고침을 하지 않아도 버전 업데이트 알림이
        뜨는지 확인합니다.
      </p>
      <h2>LocalStorage</h2>
      <p>Package.json의 버전 정보를 localstorage에 저장합니다.</p>
      <p>LocalStorage Verion: {localVersion}</p>
      <p>Package Version: {packageVersion}</p>
      <button
        type="button"
        onClick={refreshTrigger}
        style={{ marginRight: "10px" }}
      >
        refresh action trigger
      </button>
      <button type="button" onClick={stateChangeHandler}>
        state change event
      </button>
      <p>State: {state}</p>
      <hr />
      <h2>S3</h2>
      <p>
        기존 이용 중인 package.json 버전과, 업데이트 정보를 담은 S3의 버전이
        일치하는지 확인합니다.
      </p>
      <p>S3 버전정보 받는 방법 1. state가 바뀔 때 S3에 정보를 요청합니다.</p>
      <p>S3 버전정보 받는 방법 2. 아래 버튼으로 S3에 정보를 요청합니다.</p>
      <button type="button" onClick={getS3Version}>
        get S3 version!
      </button>
      <p>S3 Version: {s3version}</p>
      <p>Package Version: {packageVersion}</p>
    </div>
  );
}
