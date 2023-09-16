const express = require('express');
const redis = require('redis');

const PORT = 8080;

// APP
const app = express();

const client = redis.createClient({
  // 호스트 환경 =>도메인, 도커 컴포즈 사용 시 => docker-compose.yml 파일에 명시한 컨테이너명
  host: 'redis-server',
  // 레디스 포트 디폴트 = 6379
  port: 6379,
});

client.set('number', 0);

app.get('/', (req, res) => {
  client.get('number', (err, number) => {
    client.set('number', parseInt(number) + 1);
    res.send(`숫자가 1씩 올라갑니다. 숫자 : ${number}`);
  });
});

app.listen(PORT);

console.log('Server is Running');
