  # 경일 아카데미 학생들의 교류 및 친목을 위한 커뮤니티 사이트
  
<div align=center>
  <h1>
    🔨 Tech Stack
  </h1>
  <img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=black">
  
</div>

#### Project nickname : 경일 커뮤니티
#### Project execution period : 2022.03.21 ~ 22.04.11

## Description

경일 커뮤니티는 경일 아카데미 학생들을 위한 사이트이다. 경일 아카데미는 여러 가지 교육 과정, 몇 십 개의 기수가 존재하지만 학생들 간의 소통은 전무하다. 학원생들 간의 코드 자문부터, 멘토-멘티 활동, 취업 정보 공유, 나아가 게임 듀오나 친목까지 학원 내에서의 원활한 소통이 이뤄지길 바라는 마음으로 제작하였다.

실행 영상 : https://youtu.be/N8TyboB06Jg

<img width="90%" src="https://user-images.githubusercontent.com/99451642/194723053-4b2d3b7b-b151-4a87-8cde-a799b7d1e3b7.gif"/>

## Step 1

```
cd back
npm install
```
```
cd front
npm install
```

Or

```
cd back
npm i
```
```
cd front
npm i
```

## Step 2 

```
cd back
```

```
.env
```

```
vi .env
```

```
DB_HOST = 127.0.0.1
DB_USER = 'your_mysql_id'
DB_PASSWORD = 'your_mysql_id'
DB_DATABASE = 'your_database_name'

```

Or

back 디렉토리 안에 .env 파일을 생성해 준 뒤

```
DB_HOST = 127.0.0.1
DB_USER = 'your_mysql_id'
DB_PASSWORD = 'your_mysql_id'
DB_DATABASE = 'your_database_name'

```
를 입력 후 저장해준다.


**DB스키마 파일 위치: back/cd/etc/DB.sql

## Step 3

- 사진이 저장 되는 디렉토리 생성하기

```
cd back
```

```
mkdir public
```

```
cd public
```

```
mkdir uploads
```

## Step 4

```
cd front
```

```
npm run start
```

다른 터미널 Open

```
cd front
```

```
npm run start
```
