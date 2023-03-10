import HeaderView from "./HeaderView";
import FooterView from "./FooterView";
import "./AddGoods.css";
import React, { useCallback, useState } from "react";
import API from "../API";

import { useRef } from 'react';

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

export default function AddGoods(){

    const editorRef = useRef();
    const getId = sessionStorage.getItem('nick');

    const [getGoodsTitle, setGoodsTitle] = useState("");
    const [getGoodsSelect, setGoodsSelect] = useState("");

    const GoodsTitleHandler = (e) =>{
        setGoodsTitle(e.currentTarget.value)
    }

    const GoodsSelectHandler = (e) =>{
        setGoodsSelect(e.currentTarget.value)
    }

    function randomNumberInRange(min, max) {
    // ποΈ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const handleClick = (e) => {
        e.preventDefault();
        const editorIns = editorRef.current.getInstance(); 
        // const contentMark = editorIns.getMarkdown(); 
        const contentHtml = editorIns.getHTML(); 

        console.log(contentHtml)

        const GoodsData = {
            goodscode : "#"+randomNumberInRange(1,10000000)+getId,
            goodsid : getId,
            goodsTitle : getGoodsTitle,
            goodsSelect : getGoodsSelect,
            GoodsContents : contentHtml,
            GoodsState : true,
        
        }
        API.post('/api/addgoodssdata', GoodsData)///
        console.log(GoodsData)
    }

    const onUploadImage = async (blob : Blob, callback:any ) => {
        console.log(blob);
        
        const formData = new FormData();
        formData.append('file', blob);
        const res = API.post('/api/goodsimg', formData, 
        {
            headers: {"Contest-Type": "multipart/form-data"},    //νμΌμ μ‘μ νμ
            transformRequest : (data, headers) => {
                return data;
              }
        })

   
        // console.log(process.env.PUBLIC_URL +"/"+ res.data);
        // const imgURL = "/"+ res.data;
        // callback(process.env.PUBLIC_URL +imgURL);
        // return false
        
        // console.log(res.data)
        callback(blob)
    }




    const onChangeEditor = () => {
        if(editorRef.current) {
            console.log(editorRef.current.getInstance().getHTML());
        }
    }

    return( 
        <div className="Goods">
            <HeaderView></HeaderView>
            <form onSubmit={handleClick}>
                <div className="GoodsEditortitle">
                    <select onChange={GoodsSelectHandler}>
                        <option value={"μ°½μ"}>μ°½μ</option>
                        <option value={"ν¬μμ±"}>ν¬μμ±</option>
                        <option value={"νΉμ΄νλ¬Όκ±΄"}>νΉμ΄νλ¬Όκ±΄2</option>
                        <option value={"λͺν"}>λͺν</option>
                    </select>
                    <input placeholder=" μ  λͺ©" onChange={GoodsTitleHandler}></input>
                    <button className="btnGoodsSave" type="submit">μ   μ₯</button>
                </div>
                <div id = "GoodsEditorconstent">
                 <Editor
                    initialValue="hello react editor world!"
                    previewStyle="vertical"
                    height="1300px"
                    initialEditType="WYSIWYG"
                    useCommandShortcut={true}
                    ref = {editorRef}
                    language="ko-KR"
                    // hooks μμ addImageBlobHook λ₯Ό μ£Όλ¬Όλ¬ μ£Όλ©΄ λλ€.
                    hooks = {
                        { addImageBlobHook : onUploadImage }
                    }
                    

                    />
                    
                    <img src={process.env.PUBLIC_URL + "/images/lamen_1671746603847.PNG"}></img>
                    
                </div> 
            </form>
            <FooterView></FooterView>
        </div>
    )
}                                                               
