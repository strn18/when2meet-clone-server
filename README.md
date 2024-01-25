# when2meet-clone-server
### Database Setting
- ID: `kwebuser` / PW: `kwebpw`인 유저 추가

- `when2meet`이라는 이름(또는 `.env.dev`에서 설정한 이름)으로 데이터베이스 추가
  ```mysql
  CREATE DATABASE when2meet;
  ```

- `kwebuser`에게 `when2meet` DB 권한 부여
  ```mysql
  GRANT ALL PRIVILEGES ON when2meet.* TO 'kwebuser'@'%';
  ```

### 실행
- 모듈 설치하기
  ```
  npm install
  ```
- 실행하기
  ```
  npm run dev
  ```
