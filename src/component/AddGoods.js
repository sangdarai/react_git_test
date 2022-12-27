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
    // 👇️ get number between min (inclusive) and max (inclusive)
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
            headers: {"Contest-Type": "multipart/form-data"},    //파일전송시 필요
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
                        <option value={"창작"}>창작</option>
                        <option value={"희소성"}>희소성</option>
                        <option value={"특이한물건"}>특이한물건</option>
                        <option value={"명품"}>명품</option>
                    </select>
                    <input placeholder=" 제 목" onChange={GoodsTitleHandler}></input>
                    <button className="btnGoodsSave" type="submit">저  장</button>
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
                    // hooks 에서 addImageBlobHook 를 주물러 주면 된다.
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
