# 1. 빌드 및 배포 정리
|배포 환경|개발 OS|WAS|Web Server|JVM|Docker|Docker Compose|Web Server|
|:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|
|AWS EC2 ubuntu instance|windows|Tomcat|Nginx|jdk17|20.10.21|18.16.1|1.28.2|

|Node.js|React|MariaDB|Gradle|npm|Next.js|Redis|npx|
|:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|
|18.16.1|18.2.0|10.11.4|8.1.1|9.5.1|13.4.10|3|9.5.1|

|Intellij|VSCode|Openvidu|
|:-------------:|:-------------:|:-------------:|
|2023.01.03|1.81.0|2.28.0|

---
## How To Run Ohogame At Server

### BE - DB

1. `S09P12A602` 폴더와 같은 위치에 `db` 폴더를 만들고 `db` 폴더로 진입한다.
    
    ```jsx
    mkdir db
    cd db
    ```
    
2. `db` 폴더 하위에 `data` 와 `initdb.d` 폴더를 만든다.
    
    ```jsx
    mkdir data
    mkdir initdb.d
    ```
    
3. `initdb.d` 폴더 안에 `data.sql` 파일을 위치시킨다.
    
    ```jsx
    cp -r /home/ubuntu/S09P12A602/backend/oho/src/main/resource/data.sql initdb.d/
    ```
    
4. `S09P12A602` 폴더로 진입한다.
    
    ```jsx
    cd /home/ubuntu/S09P12A602
    ```
    
5. BE 및 DB 컨테이너를 생성한다. 만약 기존에 생성된 BE 및 DB 컨테이너가 존재한다면 두 번째 명령어를 실행하고 첫 번째 명령어를 실행한다.
    
    ```jsx
    docker-compose up -d
    docker-compose down
    ```
    

### FE - OpenVidu - Nginx

1. `openvidu` 폴더로 진입한다.
    
    ```jsx
    cd openvidu
    ```
    
2. openvidu 관련 컨테이너들을 생성한다. 기존에 생성되었던 openvidu 관련 컨테이너들이 존재한다면 두 번째 명령어를 실행한다.
    
    ```jsx
    ./openvidu start
    ./openvidu restart
    ```
    
3. 필요한 컨테이너들이 생성되었는지 확인한다.
    
    ```jsx
    docker ps -a
    ```
    
4. `[ohogame.shop](http://ohogame.shop)` 을 브라우저 url에 입력하고 Enter를 누르면 Ohogame을 시작할 수 있다.

## How To Build Ohogame At Local
### Frontend

1. `frontend` 폴더에서 Next.js와 프로젝트 빌드 시 필요한 모든 모듈들을 프로젝트에 설치한다.
    
    ```jsx
    npm install next
    npm install .
    ```
    
2. 프로젝트를 빌드한다. 로컬에서 서버를 돌릴 시 첫 번째 명령어를, 서버를 구동하는데 필요한 빌드 폴더를 생성할 시 두 번째 명령어를 실행한다.
    
    ```jsx
    npm run dev
    npm run build
    ```
    

### Backend

1. `backend/oho` 폴더로 이동하고 아래의 명령어를 실행하면 기존에 빌드된 jar 파일이 삭제되고 프로젝트가 새로 빌드된다.
    
    ```jsx
    ./gradlew clean build
    ```
    

### Openvidu

1. docker를 통해 오픈비두 서버를 실행한다.
    
    ```jsx
    docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.28.0
    ```

# 2. 외부 서비스 정리
## 외부 API 및 서비스 목록

### 가비아

커스텀 도메인을 발급받는데 활용함

발급받은 도메인: ohogame.shop

### 한국어 기초사전

초성게임에서 입력한 단어가 국어사전에 존재하는 단어인지 확인하기 위해 사용함

### Openvidu

화상 채팅 서비스를 직접 구현하지 않고 편하게 도입하기 위해 사용함


# 3. DB 덤프 파일
```
S09P12A602/backend/oho/src/main/resources/data.sql
```

# 4. 시연 시나리오
## 방 생성
1. 방을 열고 싶은 사용자가 ohogame.shop에 접속해 입장합니다. 자연히 방장이 됩니다.
<img src="https://github.com/babyyu0/UploadImage/assets/58788576/5135b7c3-8514-4806-ab19-681156b9ea4b" width=600>


## 대기실
2. 방장이 함께 할 사용자에게 url을 복사해 공유합니다.
<img src="https://github.com/babyyu0/UploadImage/assets/58788576/750c0638-bb1a-4d85-b73c-f801410344d4" width=600>


## 사용자 입장
3. 공유 받은 url을 통해 이미 생성된 방에 입장합니다.
<img src="https://github.com/babyyu0/UploadImage/assets/58788576/f6703910-ad98-43ef-867a-8e2f5d2ae009" width=600>


## 대기실 채팅과 게임 준비
4. 화상과 채팅을 사용할 수 있습니다. 단, 욕설 입력과 5회 이상의 도배 입력은 필터링되니 주의해주세요.
입장한 사용자들이 모두 준비 버튼을 클릭해, 게임 대기 상태를 표시합니다.
<img src="https://github.com/babyyu0/UploadImage/assets/58788576/3ef11564-029d-47c1-93d7-42282aa7b392" width=600>

## 게임 시작
5. 방장이 게임을 시작합니다. 미니 게임 모드로 시작하면, 몇 개의 미니 게임도 즐길 수 있습니다.
[이미지]

## 보드 게임
6. 순서대로 돌아가며 주사위를 굴려 보드 게임을 즐깁니다.
[이미지]

## 미니 게임
7. 중간중간 등장하는 미니 게임을 즐겨보세요.
[이미지]
