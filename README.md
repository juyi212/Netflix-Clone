# Netflix-Clone
> 넷플릭스 클론 코딩으로, React와 SpringBoot 프레임워크 등.. 사용하여 제작하였습니다. <br>
URL : http://3.39.105.32:3000/
<br>
제작 기간 : 5월~7월 
<br>
프론트 : 1명 ( 이주이 ) / 백엔드 : 2명 ( 조희은, 임호빈 ) 

###  :hammer: Tech Stack
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"> <img src="https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=Amazon AWS&logoColor=white" >
<img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white" > <img src="https://img.shields.io/badge/Jenkins-D24939?style=flat-square&logo=Jenkins&logoColor=white">
<img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=flat-square&logo=SpringBoot&logoColor=white" >

<img src="https://img.shields.io/badge/React-red?style=flat-square&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/-Typescript-navy?style=flat-square&logo=Typescript&logoColor=white">
<br>

### :open_hands: 페이지 소개 
시연 영상 :  https://youtu.be/-JR0Ban3bhg

<img width="550" alt="스크린샷 2022-07-16 오후 5 43 12" src="https://user-images.githubusercontent.com/57897408/179403274-8ebca0ac-4ad0-4b57-a95c-7193f89db73f.png">




### :thought_balloon: 세부 기획 

#### DB Table
- category
<img width="410" alt="스크린샷 2022-07-16 오후 5 43 12" src="https://user-images.githubusercontent.com/53864655/179347853-ab6c641f-8a4b-430f-affa-77459971d1af.png">
- movie
<img width="488" alt="스크린샷 2022-07-16 오후 5 44 09" src="https://user-images.githubusercontent.com/53864655/179347856-84c1d8fc-e675-4e0f-bcf9-204c03c83e4b.png">
- movie_category
<img width="610" alt="스크린샷 2022-07-16 오후 5 44 23" src="https://user-images.githubusercontent.com/53864655/179347861-f4192bf1-f056-43ff-a8b6-cd3bb403b5aa.png">
- user
<img width="500" alt="스크린샷 2022-07-16 오후 5 44 37" src="https://user-images.githubusercontent.com/53864655/179347865-9107e997-5184-4cab-b3f5-887a16ad9ac4.png">
- user_zzim
<img width="500" alt="스크린샷 2022-07-16 오후 5 44 46" src="https://user-images.githubusercontent.com/53864655/179347867-26ee5341-2fa8-49f8-876c-793291f0f12a.png">

### 팀원 소개 및 소감 
- **이주이** : 오랜만에 하는 사이드 프로젝트였습니다. Frontend 입장에서 Backend 분들과 함께 프로젝트를 진행하니 감회가 새로웠고, 혼자만 하면서 고민했던 부분들을 같이 해결해나가는 과정들이 성장에 많은 도움이 되었습니다. 앞으로도 다양한 기술들을 함께 도입해보고 고민하면서 성장하는 팀원들이 되었으면 좋겠어요 ! : ) 아자아자 아자자 화이팅 
- **조희은** : 첫 취업을 하고나서 진행한 첫 사이드 프로젝트였습니다. 혼자가 아니라 다른분들과 함께 프로젝트를 진행하며 도중에 멈추지 않고 개발 실력을 성장시킬 수 있는 원동력이 되어준 경험이었던것 같습니다. 앞으로도 계속해서 사이드 프로젝트를 진행하고 싶다는 목표의 계기가 되었습니다. 우리 모두 개발자 인생 백년해로 함께 해요 ^^ 못도망가요~^^ 
- **임호빈** : AWS와 Jenkins, Docker를 제대로 배포 및 사용을 해보지 못해 이번 사이트 프로젝트를 통해서 경험을 해보게 되었습니다. Dockerlize를 Front 와 Back을 구분하여 배포까지는 성공하였으나 Front를 결국 실행에 실패하여 조금 아쉬움이 남은 프로젝트 입니다. 이번 프로젝트를 통해 아직 배포에 대한 지식이 부족한 것 같아, Docker를 활용하는 방법에 대해 좀더 공부가 필요할 것 같습니다.

### What I learned (이주이)
- SWR 을 쓰긴했지만, 목적에 맞게 잘 사용하지는 못했다. 맛보기 정도였고 해당 기능을 더 잘사용하기 위해서는 다른 기능들이 부가적으로 있어야했다. 이부분이 많이 아쉽지만, 단순하게 데이터 패칭을 하고 실시간으로 데이터가 업데이트 되는 등.. 편리한 기능을 맛볼 수 있어서 좋았다.  
- 적절하게 컴포넌트들을 분리하여 Custom Hooks(useInput, userFetcher 등..)을 만들었고 재 사용성을 높일 수 있었음. 
- Debounce, Code Splitting 등.. 최적화할 수 있는 방법들을 고안함. 

### What I learned (조희은)
- Spring JPA를 사용한 두번째 경험이었는데 첫번째때는 일주일의 단기 프로젝트로 JPA에 대한 이해 없이 빠르게 진행하였습니다. 이번 기회를 통해 JPA에 대해서 좀 더 공부할 수 있었고, 아직 부족한 점이 많은것 같아 계속해서 공부할 예정입니다.

### What I learned (임호빈)
- AWS를 활용해 보면서 LINUX를 활용해 볼수 있었습니다. LINUX 를 통해서 Front를 Background에 실행하는 방식으로 활용을 했습니다.
- JENKINS와 DOCKER를 활용하여 FRONT와 BACK을 배포하고자 하였고, FRONT는 아쉽게 배포를 하지 못했지만, BACK은 정상적으로 배포할 수 있어, JENKINS와 DOCKER를 경험해 볼수 있었습니다.

