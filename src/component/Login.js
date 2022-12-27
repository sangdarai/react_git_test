import "./Login.css";
import { Link, useNavigate} from "react-router-dom";
import React, {useState} from 'react';
import API from "../API";

export default function Login(){

    const navigate = useNavigate();

    const [loginId, setLoginId] = useState("");
    const [loginPwd, setLoginPwd] = useState("");

    const [loginCheck, setLoginCheck] = useState(false);

    const inputIdHandler = (e) => {
        setLoginId(e.currentTarget.value);
    }

    const inputPasswordHandler = (e) => {
        setLoginPwd(e.currentTarget.value);
    }
    
    const submitLogin = async(e) => {
        e.preventDefault();
        const loginInfo = {
            loginId : loginId,
            loginPwd : loginPwd
        }
        const response = await API.post('/api/login', loginInfo)
        console.log(response.data)
        if(response.data === false) {
            window.alert("아이디와 패스워드가 불일치합니다")
        } else {
            sessionStorage.setItem('nick', response.data.nickname);
            navigate(`/`); //Main Page 이동
        }
    }

    return(
        <div className="loginbody">
            <center>
            <Link to='/'><h1>로그인</h1></Link>
                <hr></hr>
                <form onSubmit={submitLogin}>
                    <div className="Login"><h6>아이디(이메일)</h6><input onChange={inputIdHandler}></input></div>
                    <div className="Login"><h6>비밀번호확인</h6><input type={"password"} onChange={inputPasswordHandler}></input></div>
                    <hr></hr>
                    <button>로그인</button>
                </form>
            </center>
        </div>
    )
}

