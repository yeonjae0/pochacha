# 프로젝트 소개
### 🐱‍🏍 프로젝트 개요
친했던 친구들을 나이가 들면서 점점 만나지 못한다는 생각을 다들 한 번 쯤은 해보셨을 것입니다. 각자의 일 때문에 여럿이서 시간을 맞추기도 어렵고, 만나서 함께 술 한 잔 걸치자니 취업준비생, 사회초년생들의 재정으로는 비싼 물가의 안주가 때때로 부담으로 느껴졌을 수도 있었을 것 같습니다.

저희 또한 이런 불편함을 느껴왔고, 이를 해소하기 위해 그냥 보드게임이 아닌, **술자리**에서 즐길 수 있는 보드게임을 **온라인**으로 개발하기로 하였습니다.

**모두의 포차차**는 온라인 보드게임으로, 장소의 제약 없이 친구들과 함께 화상을 통해 술자리를 온라인으로 즐길 수 있는 서비스입니다. 이 게임은 보드게임의 각 칸에 도달하여 미션을 하며, 술자리에서 즐길 수 있는 미니게임을 제공하여 재미를 더해줍니다. 

### 🍻 프로젝트 컨셉
**모두의 포차차**는 술게임에 걸맞게 밤거리 포장마차의 새어나오는 빛을 모티브로 컨셉을 제작하였습니다.  
보드게임을 즐기다가 등장하는 귀여운 여러 미니게임 또한 각자 미니게임의 이름에 걸맞는 디자인을 갖추고 있어 눈이 즐거운 술게임을 즐기실 수 있습니다.

# 주요 기능
### 🔗 URL을 통한 초대 기능
> URL을 통해 간편하게 친구들을 초대하고 접속할 수 있습니다.
* 게임을 처음 생성하면 방장으로서 게임 방에 입장할 수 있습니다.

<img src="https://github.com/babyyu0/UploadImage/assets/58788576/5135b7c3-8514-4806-ab19-681156b9ea4b" width=600>

* '초대하기' 버튼을 클릭하면 해당 방으로 들어갈 수 있는 URL이 복사 됩니다.

<img src="https://github.com/babyyu0/UploadImage/assets/58788576/750c0638-bb1a-4d85-b73c-f801410344d4" width=600>

* 복사된 URL을 친구들에게 전송하고, 이 URL을 통해 친구들이 게임에 접속합니다.  

<img src="https://github.com/babyyu0/UploadImage/assets/58788576/f6703910-ad98-43ef-867a-8e2f5d2ae009" width=600>

* URL을 통해 접속한 친구들은 비방장으로서 게임에 참여하고, 비방장 인원 전부가 '준비' 버튼을 클릭해야 게임이 시작 됩니다.

<img src="https://github.com/babyyu0/UploadImage/assets/58788576/3ef11564-029d-47c1-93d7-42282aa7b392" width=600>


### 🎲 다양한 칸을 보유한 보드게임 기능
> 친구들과 다양하고 재미있는 칸에 주사위를 굴려 도달할 수 있습니다.
* 주사위를 굴리면 말이 움직이고, 모든 칸에는 이벤트가 있습니다.
* 일반 칸에 도달하면 다양한 미션을 수행할 수 있습니다.
* 벌칙 칸에 도달하면,
    * 얼굴에 웃긴 페이스필터가 10분 간 씌워집니다.
    * 플레이어의 목소리가 변조 됩니다.
* 벌칙이 마음에 들지 않는다면, 벌칙 제거 칸에 도달해 보세요!

### 🕹️ 여러가지 미니게임 기능
> 미니게임 칸에 도달하면 랜덤한 미니게임을 즐길 수 있습니다.
#### 두더지 게임
* 시간 안에 최대한 많은 두더지를 잡습니다.
* 목표 수량에 도달하지 못 하면 원샷!
#### 라이어 게임
* 라이어 한 명은 주제 단어를 받지 못합니다.
* 라이어를 제외한 나머지 플레이어는 주제 단어를 받습니다.
* 음성대화로 주제 단어에 대한 모호한 설명을 합니다.
* 라이어가 누구일지 유추하여 투표합니다.
* 맞춘다면 라이어가 아닌 플레이어들, 맞추지 못한다면 라이어의 승리!
#### 훈민정음
* 세종대왕님께서 두 글자의 초성을 제시합니다.
* 각 플레이어들은 자신의 턴에 초성과 일치하는 단어를 입력합니다.
* 제한 시간 내에 단어를 외치지 못하면 원샷!

# 시나리오

### 1. 방 생성

- 초기 입장 화면입니다.
- Start 버튼을 클릭하여 대기실로 이동합니다.

<img src="https://github.com/heejinssss/OHO-img/blob/master/0입장.png?raw=true" width =600>

### 2. 방 입장 및 초대 코드 복사

- 방장은 하단의 초대 코드 복사 기능을 통해 다른 유저들을 초대할 수 있습니다.
- 유저들이 ‘준비’를 모두 누르기 전까지 ‘시작 불가’ 상태가 유지됩니다.

<img src="https://raw.githubusercontent.com/heejinssss/OHO-img/master/1대기실_시작불가.png" width=600>

<img src="https://github.com/heejinssss/OHO-img/blob/master/1대기실_준비.png?raw=true" width=600>

### 3. 게임 시작 조건 (3인 팀원 준비 + 방장 시작)

- 3인의 팀원이 모두 준비를 누르면 방장 화면에서 ‘시작 불가’ 버튼이 ‘시작’ 버튼으로 활성화됩니다.

<img src="https://github.com/heejinssss/OHO-img/blob/master/2대기실_준비완료.png?raw=true" width=600>

<img src="https://github.com/heejinssss/OHO-img/blob/master/2대기실_시작.png?raw=true" width=600>

### 4. 게임 시작 (벌칙)

- 4인이 순서대로 주사위를 클릭하여 보드판에서 말을 이동시킵니다.
- 화면에 모달로 나타나는 벌칙을 수행합니다.

<img src="https://github.com/heejinssss/OHO-img/blob/master/4게임_벌칙1.png?raw=true" width=600>

<img src="https://github.com/heejinssss/OHO-img/blob/master/4게임_벌칙2.png?raw=true" width=600>

### 5. 게임 시작 (미니 게임)

- 미니 게임 셀에 말이 위치하게 되면 미니게임 컴포넌트가 실행됩니다.

<img src="https://github.com/heejinssss/OHO-img/blob/master/3게임_미니게임1.png?raw=true" width=600>

<img src="https://github.com/heejinssss/OHO-img/blob/master/3게임_미니게임2.png?raw=true" width=600>

<img src="https://github.com/heejinssss/OHO-img/blob/master/3게임_미니게임3.png?raw=true" width=600>

### 6. 게임을 즐겁게 즐기시면 됩니다.

# 기술 스택
### 👤 Front-end
<img  alt="React"  src ="https://img.shields.io/badge/React-61DAFB?&style=for-the-badge&logo=React&logoColor=black"/>
<img  alt="Node.js"  src ="https://img.shields.io/badge/Node.js-339933?&style=for-the-badge&logo=nodedotjs&logoColor=black"/>
<img  alt="Redux"  src ="https://img.shields.io/badge/Redux-764ABC?&style=for-the-badge&logo=Redux&logoColor=white"/>
<img  alt="Next.js"  src ="https://img.shields.io/badge/Next.js-000000?&style=for-the-badge&logo=nextdotjs&logoColor=white"/>
<img  alt="npm"  src ="https://img.shields.io/badge/npm-CB3837?&style=for-the-badge&logo=npm&logoColor=white"/>

### 💻 Back-end
<img  alt="Java" src="https://img.shields.io/badge/Java-EA2D2E?style=for-the-badge&logo=java">
<img  alt="SpringBoot" src ="https://img.shields.io/badge/SpringBoot-6DB33F.svg?&style=for-the-badge&logo=SpringBoot&logoColor=white"/>
<img  alt="IntelliJ IDEA" src ="https://img.shields.io/badge/IntelliJ IDEA-000000.svg?&style=for-the-badge&logo=intellijidea&logoColor=white"/>
<img  alt="MariaDB" src ="https://img.shields.io/badge/MariaDB-003545.svg?&style=for-the-badge&logo=MariaDB&logoColor=white"/>
<img  alt="Redis" src ="https://img.shields.io/badge/Redis-DC382D.svg?&style=for-the-badge&logo=Redis&logoColor=white"/>

### ⚙️ Infra
<img  alt="Docker" src ="https://img.shields.io/badge/Docker-2496ED.svg?&style=for-the-badge&logo=Docker&logoColor=white"/>
<img  alt="NGINX" src ="https://img.shields.io/badge/NGINX-009639.svg?&style=for-the-badge&logo=NGINX&logoColor=white"/>
<img  alt="Amazon EC2" src ="https://img.shields.io/badge/Amazon EC2-FF9900.svg?&style=for-the-badge&logo=amazonec2&logoColor=white"/>
<img  alt="GitLab CI/CD" src ="https://img.shields.io/badge/GitLab CI/CD-FC6D26.svg?&style=for-the-badge&logo=gitlab&logoColor=white"/>

# 팀원 소개
|![유영](https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/712020:06d99255-c30a-4130-8ec1-5a7243ddc80f/8237d16f-b689-4d3e-b8c4-28b42bd42af9/128)|![임혜지](https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/712020:c22a9139-eb79-42c8-9e76-8b9f8ac25f8a/0379d4b1-3d0d-43f5-8e70-20b0825a458b/128)|![김태훈](https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/712020:1c4d69ae-39f6-4d45-a811-b266b3df1c94/06013e9c-79ce-4207-b35e-5b0c394b45a6/128)|![연제정](https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/712020:4ff99902-745d-4ff3-9d04-d90294035542/d14939b1-3a1e-4a7e-a85b-4bcdaf11fe1c/128)|![배희진](https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/712020:211f43a8-7de6-4c3e-9a29-7b7406ac7770/8bf6f204-7003-45f7-bd5f-4ee2fba89ebc/128)|![김연재](https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/712020:289f6611-e32c-43d6-bf61-271e7bd4d6e2/adf7a466-883b-4a2c-9392-81402cf873cb/128)|
|:-:|:-:|:-:|:-:|:-:|:-:|
|**유영** (팀장)|**임혜지**|**김태훈**|**연제정**|**배희진**|**김연재**|
|BE|BE|BE / INFRA|FE|FE|FE|
