const AWS = require('aws-sdk');
const fs = require('fs');

// 환경 변수에서 AWS 액세스 키 및 시크릿 액세스 키 가져오기
const accessKeyId = process.env.REACT_APP_S3_ACCEES_KEY;
const secretAccessKey = process.env.REACT_APP_S3_SECRET_ACCEES_KEY;

// AWS 설정
const region = 'ap-northeast-2'; // 리전 설정
// AWS.config.update({ accessKeyId, secretAccessKey, region }); // AWS 구성 업데이트
AWS.config.update({ region }); // AWS 구성 업데이트
const s3 = new AWS.S3();

// 버전 정보를 담은 텍스트 파일 생성
const version = require('./package.json').version;
fs.writeFileSync('version.txt', version);

// S3에 파일 업로드
const uploadParams = {
    Bucket: 'version-file-bucket',
    Key: 'version.txt',
    Body: fs.createReadStream('version.txt')
};

s3.upload(uploadParams, (err, data) => {
    if (err) {
        console.error("Error", err);
    } else {
        console.log("File uploaded successfully", data.Location);
    }
});
