import "./SignUp.css"
import { Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import API from "../API";

export default function SignUp(){

    const navigate = useNavigate(); //Main Page 이동

    //초기값 세팅 - 아아디(이메일), 패스워드, 패스워드확인, 이름, 전화번호, 닉네임
    const [Id, setId] = useState('');
    const [Pwd, setPwd] = useState('');
    const [Cpwd, setCheckPwd] = useState('');
    const [Name, setName] = useState('');
    const [Phone, setPhone] = useState('');
    const [Nickname, setNickname] = useState('');

    const [checkNicknameResult, setcheckNicknameResult] = useState(false);

    //오류메세지 상태 저장
    const [idMessage, setIdMessage] = useState('');
    const [pwdMessage, setPwdMessage] = useState('');
    const [cpwdMessage, setCheckPwdMessage] = useState('');
    const [nameMessage, setNameMessage] = useState('');
    const [phoneMessage, setPhoneMessage] = useState('');
    const [nicknameMessage, setNicknameMessage] = useState('');

    const [btnCheckMessage, setbtnCheckMessage] = useState('');

    //유효성 검사
    const [isId, setIsId] = useState(false);
    const [isPwd, setIsPwd] = useState(false);
    const [isCpwd, setIsCheckPwd] = useState(false);
    const [isName, setIsName] = useState(false);
    const [isPhone, setIsPhone] = useState(false);
    const [isNickname, setIsNickname] = useState(false);

    //아이디
    const onIdHandler = (e) => {
        setId(e.currentTarget.value);
        const idRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
        if(!idRegExp.test(Id)){
            setIdMessage("이메일의 형식이 올바르지 않습니다!");
        } else {
            setIdMessage("ID 중복체크를 부탁드립니다");
        }
    }

    //아이디 중복체크 버튼
    const idCheckBtnHandler = async(e) => {
        e.preventDefault();
        const checkId = {
            checkid : Id,
        }
        const response = await API.post('/api/checkid', checkId);     
        if(response.data === true) {
            setIdMessage("사용가능한 ID 입니다");
            setIsId(true);
        } else { 
            setIdMessage("ID 중복입니다");
            setIsId(false);
        }
    }

    //패스워드
    const onPwdHandler = (e) => {
        setPwd(e.currentTarget.value);
        const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-_])(?=.*[0-9]).{8,25}$/;
        if (!passwordRegExp.test(e.currentTarget.value)) {
            setPwdMessage( "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
            setIsPwd(false);
          } else {
            setPwdMessage("안전한 비밀번호 입니다.");
            setIsPwd(true);
        }
    };
    
    //패스워드 체크
    const oncheckPwdHandler = (e) => {
        const currentPasswordConfirm = e.currentTarget.value;
        setCheckPwd(e.currentTarget.value);
        if (Pwd !== currentPasswordConfirm) {
            setCheckPwdMessage("비밀번호가 다릅니다!");
            setIsCheckPwd(false);
          } else {
            setCheckPwdMessage("비밀번호를 확인했습니다.");
            setIsCheckPwd(true);
          }
    };

    //이름
    const onNameHandler = (e) => {
        setName(e.currentTarget.value);

        if (Name == null) {
            setNameMessage("이름을 입력해주세요");
            setIsName(false);
          } else {
            setNameMessage("이름을 확인했습니다");
            setIsName(true);
          }
    }

    //휴대폰 번호
    const onPhoneHandler = (e) => {
        setPhone(e.currentTarget.value);
        const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/;
        if (!phoneRegExp.test(e.currentTarget.value)) {
            setPhoneMessage("올바른 형식이 아닙니다!");
        } else {
            setPhoneMessage("휴대폰번호 중복체크를 부탁드립니다");
        }
    }

    //휴대폰 중복체크 버튼
    const phoneBtnHandler = async(e) => {
        e.preventDefault();
        const phone = {
            phone : Phone,
        }
        const response = await API.post('/api/checkPhone', phone)
        if(response.data === true) {
            setPhoneMessage("사용가능한 번호 입니다");
            setIsPhone(true);
        } else  { 
            setPhoneMessage("이미 가입된 번호입니다");
            setIsPhone(false);
        }
    }

    //닉네임
    const onNicknameHandler = (e) => {
        const currentName = e.currentTarget.value;
        setNickname(e.currentTarget.value);
        if (currentName.length < 2 || currentName.length > 10) {
            setNicknameMessage("닉네임은 2글자 이상 5글자 이하로 입력해주세요!");
        } else {
            setNicknameMessage("닉네임 중복체크를 부탁드립니다");
        }
    }

    //닉네임 중복체크 버튼
    const nicknameCheckBtnHandler = async(e) => {
        e.preventDefault();
        const checknickname = {
            checknickname : Nickname,
        }
        const response = await API.post('/api/checkNickName', checknickname)
        if(response.data === true) {
            setNicknameMessage("사용가능한 닉네임 입니다");
            setIsNickname(true);
        } else  { 
            setNicknameMessage("닉네임 중복입니다");
            setIsNickname(false);
        }
    }
    
    //submit
    const onSubminHandler = (e) => {
        e.preventDefault();

        // isId, isPwd, isCpwd, isName, isPhone, isNickname
        if(isId === true){
            if(isPwd === true){
                if(isCpwd === true){
                    if(isName === true){
                        if(isPhone === true){
                            if(isNickname === true){
                                const user = {
                                    id : Id,
                                    pwd : Pwd,
                                    name : Name,
                                    phone : Phone,
                                    nickname : Nickname,
                                };
                                API.post('/api/customer', user)
                                .then(console.log(JSON.stringify(user)));
                                navigate(`/`); //Main Page 이동
                            } else { setbtnCheckMessage("닉네임정보를 확인해주세요"); }
                        } else {setbtnCheckMessage("휴대폰번호를 확인해주세요"); }
                    } else {setbtnCheckMessage("이름을 확인해주세요"); }
                } else {setbtnCheckMessage("비밀번호 확인을 확인해주세요"); }
            } else {setbtnCheckMessage("비밀번호를 확인해주세요"); }
        } else {setbtnCheckMessage("아이디(메일)를 확인해주세요"); }
    }

    return(
        <div className="signupbody">
            <center>
            <Link to='/'><h1>회원가입</h1></Link>
            <hr></hr>
            <form onSubmit={onSubminHandler}>
                <div className="signDegin">
                    <h6>아이디(이메일)</h6>
                    <input type={"email"} onChange={onIdHandler} ></input>
                    <button type="button" className="checkbtn" onClick={idCheckBtnHandler}>ID 중복체크</button>
                </div>
                    <p className="meessage">{idMessage}</p>
                <div className="signDegin">
                    <h6>비밀번호</h6>
                    <input type={"password"} onChange={onPwdHandler} ></input>
                </div>
                    <p className="meessage">{pwdMessage}</p>
                <div className="signDegin">
                    <h6>비밀번호확인</h6>
                    <input type={"password"} onChange={oncheckPwdHandler} ></input>
                </div>
                    <p className="meessage">{cpwdMessage}</p>

                <div className="signDegin">
                    <h6>이름</h6>
                    <input type={"text"} onChange={onNameHandler}></input>
                </div>
                    <p className="meessage">{nameMessage}</p>
                <div className="signDegin">
                    <h6>휴대폰번호</h6>
                    <input type={"text"} onChange={onPhoneHandler} ></input>
                    <button type="button" className="checkbtn" onClick={phoneBtnHandler}>휴대폰번호 중복체크</button>
                </div>
                    <p className="meessage">{phoneMessage}</p>
                <div className="signDegin">
                    <h6>닉네임</h6>
                    <input type={"text"} onChange={onNicknameHandler} ></input>
                    <button type="button" className="checkbtn" onClick={nicknameCheckBtnHandler}>닉네임 중복체크</button>
                    </div>
                    <p className="meessage">{nicknameMessage}</p>
                <hr></hr>
                <button type="submit" >회원가입</button>
            </form>
            <p className="meessage">{btnCheckMessage}</p>
            </center>
        </div>
    )
}