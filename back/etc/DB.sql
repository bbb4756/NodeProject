create database team4;
use team4;

CREATE TABLE user (
    idx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userid VARCHAR(30) NOT NULL,
    userpw VARCHAR(50) NOT NULL,
    userimg VARCHAR(200) NOT NULL,
    username VARCHAR(30) NOT NULL,
    nickname VARCHAR(30) NOT NULL,
    address VARCHAR(80) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    phone VARCHAR(30) NULL,
    mobile VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    userintro TEXT NULL,
    level INT NOT NULL DEFAULT 1,
    available VARCHAR(3) NOT NULL DEFAULT 'on',
    UNIQUE (userid),
    UNIQUE (nickname),
    UNIQUE (email)
);

CREATE TABLE cate1 (
    idx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(30) NOT NULL,
    title VARCHAR(40) NOT NULL,
    content TEXT NULL,
    nickname VARCHAR(30) NOT NULL,
    userid VARCHAR(30) NOT NULL,
    date VARCHAR(30) NOT NULL,
    hit INT NOT NULL DEFAULT 0,
    likes INT NOT NULL DEFAULT 0,
    hidden VARCHAR(3) NOT NULL DEFAULT 'off'
);

update cate1 set userid = replace(userid,' ', '');

create table cate1_like(
    m_idx int,
    userid varchar(30)
);

create table hashtag(
    hidx int primary key auto_increment,
    hashtag_name varchar(30) not null
);

create table cate1_bridge(
    midx int not null,
    hidx int not null
);

CREATE TABLE comment (
    idx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    mcategory VARCHAR(30),
    midx INT NOT NULL,
    content TEXT NOT NULL,
    userid VARCHAR(30) NOT NULL,
    nickname VARCHAR(200) NOT NULL,
    date VARCHAR(30) NOT NULL,
    updateFlag varchar(5) default 'true',
    FOREIGN key (`userid`) REFERENCES `user` (`userid`)
);

create table notice(
    idx INT AUTO_INCREMENT PRIMARY KEY,
    writer VARCHAR(30) DEFAULT 'admin',
    title VARCHAR(40) NOT NULL,
    content TEXT NOT NULL,
    date VARCHAR(30) NOT NULL,
    FOREIGN key (`writer`) REFERENCES `user` (`userid`)

);

CREATE TABLE QnA (
    idx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(40) NOT NULL,
    content TEXT NOT NULL,
    userid VARCHAR(30) NOT NULL,
    date VARCHAR(30) NOT NULL,
    category VARCHAR(20) DEFAULT 'qna',
    hit INT NOT NULL DEFAULT 0,
    FOREIGN key (`userid`) REFERENCES `user` (`userid`)
);

create table image(
    category VARCHAR(30) NOT NULL,
    midx INT NOT NULL,
    img1 VARCHAR(100) default 'N/A',
    img2 VARCHAR(100) default 'N/A',
    img3 VARCHAR(100) default 'N/A',
    img4 VARCHAR(100) default 'N/A',
    img5 VARCHAR(100) default 'N/A'

);


create table lol_user(
	userid VARCHAR(30) NOT NULL,
    lol_nickname varchar(30) NOT NULL,
    UNIQUE(lol_nickname),
    FOREIGN key (`userid`) REFERENCES `user` (`userid`)
);

INSERT INTO user(
                    userid,
                    userpw,
                    userimg,
                    username,
                    nickname,
                    address,
                    gender,
                    phone,
                    mobile,
                    email,
                    userintro
                ) values(
                    '1111','1111', 'asdf.jpg', 'lee', 'lee', 'seoul','남자',00000000,00000000, 'loqwe@gmail.com',' hello'
                )