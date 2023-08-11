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
![방장 게임방 입장](https://github.com/babyyu0/UploadImage/assets/58788576/2217cd32-a75c-4adc-b163-da782ddbea4a)
* '초대하기' 버튼을 클릭하면 해당 방으로 들어갈 수 있는 URL이 복사 됩니다.
![image](https://github.com/babyyu0/UploadImage/assets/58788576/c63a8120-2094-41cc-ae1d-69a6cfef61dc)
* 복사된 URL을 친구들에게 전송하고, 이 URL을 통해 친구들이 게임에 접속합니다.
* URL을 통해 접속한 친구들은 비방장으로서 게임에 참여하고, 비방장 인원 전부가 '준비' 버튼을 클릭해야 게임이 시작 됩니다.

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
* 세종대왕님께서 초성 2개를 제시합니다.
* 각 플레이어들은 자신의 턴에 초성과 일치하는 단어를 입력합니다.
* 제한 시간 내에 단어를 외치지 못하면 원샷!

# 기술 스택
### Front-end
<img  alt="React"  src ="https://img.shields.io/badge/React-61DAFB?&style=for-the-badge&logo=React&logoColor=black"/>
<img  alt="Node.js"  src ="https://img.shields.io/badge/Node.js-339933?&style=for-the-badge&logo=nodedotjs&logoColor=black"/>
<img  alt="Redux"  src ="https://img.shields.io/badge/Redux-764ABC?&style=for-the-badge&logo=Redux&logoColor=white"/>
<img  alt="Next.js"  src ="https://img.shields.io/badge/Next.js-000000?&style=for-the-badge&logo=nextdotjs&logoColor=white"/>
<img  alt="npm"  src ="https://img.shields.io/badge/npm-CB3837?&style=for-the-badge&logo=npm&logoColor=white"/>

### Back-end
<img  alt="Java" src="https://img.shields.io/badge/Java-EA2D2E?style=for-the-badge&logo=java">
<img  alt="SpringBoot" src ="https://img.shields.io/badge/SpringBoot-6DB33F.svg?&style=for-the-badge&logo=SpringBoot&logoColor=white"/>
<img  alt="IntelliJ IDEA" src ="https://img.shields.io/badge/IntelliJ IDEA-000000.svg?&style=for-the-badge&logo=intellijidea&logoColor=white"/>
<img  alt="MariaDB" src ="https://img.shields.io/badge/MariaDB-003545.svg?&style=for-the-badge&logo=MariaDB&logoColor=white"/>
<img  alt="Redis" src ="https://img.shields.io/badge/Redis-DC382D.svg?&style=for-the-badge&logo=Redis&logoColor=white"/>

### Infra
<img  alt="Docker" src ="https://img.shields.io/badge/Docker-2496ED.svg?&style=for-the-badge&logo=Docker&logoColor=white"/>
<img  alt="NGINX" src ="https://img.shields.io/badge/NGINX-009639.svg?&style=for-the-badge&logo=NGINX&logoColor=white"/>
<img  alt="Amazon EC2" src ="https://img.shields.io/badge/Amazon EC2-FF9900.svg?&style=for-the-badge&logo=amazonec2&logoColor=white"/>
<img  alt="GitLab CI/CD" src ="https://img.shields.io/badge/GitLab CI/CD-FC6D26.svg?&style=for-the-badge&logo=gitlab&logoColor=white"/>
