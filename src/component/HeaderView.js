import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HeaderView.css"

export default function HeaderView(){

    // const navigate = useNavigate();

    const getId = sessionStorage.getItem('nick');

    const [getMovePage1, setMovePage1] = useState("");
    const [getMovePage2, setMovePage2] = useState("");
    const [getHeaderIdName1, setHeaderIdName1] = useState("");
    const [getHeaderIdName2, setHeaderIdName2] = useState("");
    const [getInsertGoods, setInsertGoods] = useState("");



    useEffect(() => {
        
        if(getId == null){
            setMovePage1("/SignUp")
            setMovePage2("/Login")
            setHeaderIdName1("회원가입")
            setHeaderIdName2("로그인")
            setInsertGoods("hidden")
            
        } else {
            setMovePage1("/login")
            setMovePage2("/")
            setHeaderIdName1(getId)
            setHeaderIdName2("로그아웃")
            setInsertGoods("visible")

        }
    }, [])

    const reset = () => {
        sessionStorage.removeItem('nick')
        window.location.reload();
    }

    const btnClick = () => {
        if(getId == null){
            return
        } else {
            return reset()
        }
    }

    return (
            <header id ="header">
                <div className="wrapper">
                       <div className="title"><Link className="textlink" to='/'>Project</Link></div>
                    <div className="menu">
                        <button>소개</button>
                        <button>Project</button>
                        <button>문의사항</button>
                        <button>챗봇테스트</button>
                        <button id="InsertGoods" style={{visibility:getInsertGoods}}><Link to={"/AddGoods"}>물건등록</Link> </button>
                    </div>
                    <div className="log">
                        <button><Link className="textlink" to={getMovePage1}>{getHeaderIdName1}</Link></button>
                        <button onClick={btnClick}><Link className="textlink" to={getMovePage2}>{getHeaderIdName2}</Link></button>
                        
                    </div>
                </div>                
            </header>
    )
}
