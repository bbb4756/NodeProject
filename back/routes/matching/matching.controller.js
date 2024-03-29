const pool = require("../../db.js").pool;
const { default: axios } = require("axios");
const cheerio = require("cheerio");
const { login } = require("../user/user.controller.js");
exports.duoRegister = async (req, res) => {
    const { lol_nickname } = req.body;
    const { userid } = req.user;

    console.log(userid, lol_nickname);
    const sql = `insert into lol_user(userid, lol_nickname) values (?,?)`;
    const prepare = [userid, lol_nickname];

    try {
        const [result] = await pool.execute(sql, prepare);

        const response = {
            result: "success",
        };
        console.log(response);
        res.json(response);
    } catch (e) {
        const response = {
            result: e.errno,
        };
        console.log(response);
        res.json(response);
    }
};
exports.duoSearch = async (req, res) => {
    const myuserid = req.user.userid;
    console.log(myuserid);
    const sql = `select * from lol_user`;
    try {
        const [result] = await pool.execute(sql);
        console.log(result);

        const my_infolist = result.filter((e) => {
            return e.userid == myuserid;
        }); //내 계정만 뽑아내기

        const other_infolist = result.filter((e) => {
            return e.userid !== myuserid;
        }); //내가 아닌 다른 사람들 계정만 뽑아내기
        console.log(my_infolist, other_infolist);

        const getHTML = async (keyword) => {
            try {
                return await axios.get("https://www.op.gg/summoners/kr/" + encodeURI(keyword.replaceAll(" ", "")));
            } catch (e) {
                console.log(e);
            }
        };
        let my_rate_list = [];
        let other_rate_list = [];
        const parsing = async (keyword, list) => {
            const html = await getHTML(keyword);
            const $ = cheerio.load(html.data);
            const $rateElement = $("#content-container>div:nth-child(1)>div:nth-child(2)");
            const rate = $($rateElement[0]).find(".tier").text();
            console.log("rate", rate);

            const winning_rate = $($rateElement[0]).find(".ratio").text();
            console.log("winning", winning_rate);
            console.log(rate, winning_rate);
            list.push({
                usernickname: keyword,
                rate,
                winning_rate,
            });
            // console.log(list)
        };

        // const res1 = await parsing(my_infolist[0].lol_nickname, my_rate_list)
        for (e of my_infolist) {
            const info = await parsing(e.lol_nickname, my_rate_list);
        }

        for (e of other_infolist) {
            const info = await parsing(e.lol_nickname, other_rate_list);
        }

        console.log("내 정보", my_rate_list);
        console.log("타인의 정보", other_rate_list);

        // 티어 구현 로직.. 함수화

        const logic = (arr) => {
            arr.forEach((e) => {
                if (e.rate == "") {
                    e.level = 0; //언랭
                } else if (e.rate.includes("iron")) {
                    e.level = 1;
                } else if (e.rate.includes("bronze")) {
                    e.level = 2;
                } else if (e.rate.includes("silver")) {
                    e.level = 3;
                } else if (e.rate.includes("gold")) {
                    e.level = 4;
                } else if (e.rate == "platinum 4" || e.rate == "platinum 3") {
                    e.level = 5;
                } else if (e.rate == "platinum 2") {
                    e.level = 6;
                } else if (e.rate == "platinum 1") {
                    e.level = 7;
                } else if (e.rate == "diamond 4") {
                    e.level = 8;
                } else if (e.rate == "diamond 3") {
                    e.level = 9;
                } else if (e.rate == "diamond 2") {
                    e.level = 10;
                } else if (e.rate == "diamond 1") {
                    e.level = 11;
                } else {
                    e.level = 12; //마스터이상
                }
            });
        };
        logic(my_rate_list);
        logic(other_rate_list);
        console.log("내 티어", my_rate_list);
        console.log("다른 애들 티어", other_rate_list);
        let match = [];
        //만약 내 레벨이 1,2이다. level 1,2,3인거 추출
        for (let i = 0; i < my_rate_list.length; i++) {
            if (my_rate_list[i].level == 1 || my_rate_list[i].level == 2) {
                other_rate_list.forEach((v) => {
                    if (v.level == 1 || v.level == 2 || v.level == 3) {
                        match.push(v);
                    }
                });
            } else if (my_rate_list[i].level == 3) {
                other_rate_list.forEach((v) => {
                    if (v.level == 1 || v.level == 2 || v.level == 3 || v.level == 4) {
                        match.push(v);
                    }
                });
            } else if (my_rate_list[i].level == 3) {
                other_rate_list.forEach((v) => {
                    if (v.level == 1 || v.level == 2 || v.level == 3 || v.level == 4) {
                        match.push(v);
                    }
                });
            } else if (my_rate_list[i].level == 4) {
                other_rate_list.forEach((v) => {
                    if (v.level == 3 || v.level == 4 || v.level == 5 || v.level == 6 || v.level == 7) {
                        match.push(v);
                    }
                });
            } else if (my_rate_list[i].level == 5) {
                other_rate_list.forEach((v) => {
                    if (v.level == 4 || v.level == 5 || v.level == 6 || v.level == 7) {
                        match.push(v);
                    }
                });
            } else if (my_rate_list[i].level == 6) {
                other_rate_list.forEach((v) => {
                    if (v.level == 4 || v.level == 5 || v.level == 6 || v.level == 7 || v.level == 8) {
                        match.push(v);
                    }
                });
            } else if (my_rate_list[i].level == 7) {
                other_rate_list.forEach((v) => {
                    if (v.level == 4 || v.level == 5 || v.level == 6 || v.level == 7 || v.level == 8 || v.level == 9) {
                        match.push(v);
                    }
                });
            } else if (my_rate_list[i].level == 8) {
                other_rate_list.forEach((v) => {
                    if (v.level == 6 || v.level == 7 || v.level == 8 || v.level == 9 || v.level == 10) {
                        match.push(v);
                    }
                });
            } else if (my_rate_list[i].level == 9) {
                other_rate_list.forEach((v) => {
                    if (v.level == 7 || v.level == 8 || v.level == 9 || v.level == 10 || v.level == 11) {
                        match.push(v);
                    }
                });
            } else if (my_rate_list[i].level == 10) {
                other_rate_list.forEach((v) => {
                    if (v.level == 8 || v.level == 9 || v.level == 10 || v.level == 11) {
                        match.push(v);
                    }
                });
            } else if (my_rate_list[i].level == 11) {
                other_rate_list.forEach((v) => {
                    if (v.level == 9 || v.level == 10 || v.level == 11) {
                        match.push(v);
                    }
                });
            }
        }

        console.log("나랑 뜰 애들", match);
        const match_overlap_delete = [...new Set(match)];

        const response = {
            my_info: my_rate_list,
            match_info: match_overlap_delete,
        };
        res.json(response);
    } catch (e) {
        const response = {
            result: "failure",
        };
        res.json(response);
    }
};

exports.meeting = (req, res) => {
    res.send("친구찾기");
};

exports.mento = (req, res) => {
    res.send("멘토/멘티찾기");
};
