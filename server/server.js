const express = require('express');
const app = express();
app.listen(4000);
const conn = require('./config/db');

const cors= require('cors');
app.use(cors());

const { json } = require('express');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const multer = require('multer');
const fs = require('fs');
const path = require('path');

//test
app.get('/api/tdata', function (req, res){
    const sql = "select * from customers;"
    conn.query(sql, function (err, result, fields){
    res.send(result);
    });
});


//회원가입, 중복
///////////////////////////////////////////////

//회원가입
const crypto = require('crypto'); // 패스워드 암호화
const { default: InsertGoods } = require('../src/component/InsertGoods');
// const { upload } = require('@testing-library/user-event/dist/upload');

app.post('/api/customer', function (req, res){
    
    const id = req.body.id;
    // const pwd = crypto.createHash('sha256').update(req.body.pwd).digest('hex') ;  // 패스워드 암호화
    const pwd = req.body.pwd;  // 패스워드 암호화
    const name = req.body.name;
    const phone = req.body.phone;
    const nickname = req.body.nickname;

    const sql = "INSERT INTO customers (id_email, password, name, phone_num, nickname) VALUES (?,?,?,?,?);";
    conn.query(sql, [id, pwd, name, phone, nickname], function (err, result) {
        res.send('Sucess')
      if (err) throw err;
      console.log("insert success");
    })
  });


//ID 중복체크
app.post('/api/checkid', function (req, res){
  
  const id = req.body.checkid;
  console.log(req.body.checkid);
  const sql = "select id_email from customers where id_email = (?)";
  conn.query(sql, [id], function (err, rows, result) {
    console.log(rows[0]);
    if (rows[0] === undefined) {
      console.log('CheckId true');
      res.send(true); //중복 없음 사용가능
    } else {
      console.log('CheckId false');
      res.send(false); // 중복 있음 사용안됨
    }
  })
});


  //폰번호 중복체크
  app.post('/api/checkPhone', function (req, res){

    const phone = req.body.phone;
    console.log(req.body.phone);
    const sql = "select phone_num from customers where phone_num = (?)";
    conn.query(sql, [phone], function (err, rows, result) {
      console.log(rows[0]);
      if (rows[0] === undefined) {
        console.log('CheckId true');
        res.send(true); //중복 없음 사용가능
      } else {
        console.log('CheckId false');
        res.send(false); // 중복 있음 사용안됨
      }
    })
  });


    //닉네임중복체크
  app.post('/api/checkNickName', function (req, res){
  
    const nickname = req.body.checknickname;
    console.log(req.body.checknickname);
    const sql = "select nickname from customers where nickname = (?)";
    conn.query(sql, [nickname], function (err, rows, result) {
      console.log(rows[0]);
      if (rows[0] === undefined) {
        console.log('CheckId true');
        res.send(true); //중복 없음 사용가능
      } else {
        console.log('CheckId false');
        res.send(false); // 중복 있음 사용안됨
      }
    })
  });

  
  //로그인
  // app.post('/api/login', function (req, res){

  //   const loginId = req.body.loginId;
  //   const loginPwd = req.body.loginPwd;

  //   console.log(loginId, loginPwd);
  //   const sql = "select id_email, password from customers where id_email = (?) and password = (?)";
  //   conn.query(sql, [loginId, loginPwd], function (err, rows, result) {
  //     console.log(rows[0]);
  //     if (rows[0] === undefined) {
  //       console.log('CheckId true');
  //       res.send(false); //ID, 비밀번호 불일치
  //     } else {
  //       console.log('CheckId true');
  //       res.send(true); // ID, 비밀번홈 일치
  //     }

  //   })
  // });

  app.post('/api/login', function (req, res){

    const loginId = req.body.loginId;
    const loginPwd = req.body.loginPwd;

    console.log(loginId, loginPwd);
    const sql = "select nickname from customers where id_email = (?) and password = (?)";
    conn.query(sql, [loginId, loginPwd], function (err, rows, result) {
      console.log(rows[0]);
      if (rows[0] === undefined) {
        console.log('CheckId true');
        res.send(false); //ID, 비밀번호 불일치
      } else {
        console.log('CheckId true');
        res.send(rows[0]); // ID, 비밀번홈 일치
      }

    })
  });


///////////////////////////////////////////////////

// Toast UI
// InsertGoods
app.post('/api/addgoodssdata', function (req, res){
    
  const goodscode = req.body.goodscode;
  const goodsid = req.body.goodsid;
  const goodsTitle = req.body.goodsTitle;
  const goodsSelect = req.body.goodsSelect;
  const GoodsContents = req.body.GoodsContents;
  const GoodsState = req.body.GoodsState;

  console.log(goodscode+", "+goodsid+", "+goodsTitle+", "+goodsSelect+", "+GoodsContents+", "+GoodsState);

  const sql = "INSERT INTO Goods (Goods_Code, Goods_add_ID, Goods_Division, Goods_Title, Goods_Content, Goods_State) VALUES (?,?,?,?,?,?);";
  conn.query(sql, [goodscode, goodsid, goodsTitle, goodsSelect, GoodsContents, GoodsState], function (err, result) {
      res.send('Sucess')
    if (err) throw err;
    console.log("insert success");
  })
});

///////////////////////////////////////////////////////


try {
  fs.accessSync('public/images');
} catch(error) {
  console.log('images 폴더가 없습니다. 새로 생성합니다.');
  fs.mkdirSync('public/images');
};


const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "public/images");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname) // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext) // 파일 이름 추출(이름)
      done(null, basename + "_" + new Date().getTime() + ext) // 이름_1518123131.png
    },
  }),
  // limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

app.post('/api/goodsimg', upload.single('file'), function(req, res){
  console.log(req.file)
  res.json(req.file.path);

})