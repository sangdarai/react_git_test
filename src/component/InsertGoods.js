// import HeaderView from "./HeaderView";
// import FooterView from "./FooterView";
// import "./InsertGoods.css";
// import React, { useState } from "react";
// import API from "../API";
// import { Editor } from '@toast-ui/react-editor';
// import '@toast-ui/editor/dist/toastui-editor.css';

// export default function Goods(){

//     const editorRef = React.createRef(null);
//     const getId = sessionStorage.getItem('nick');

//     const [getGoodsTitle, setGoodsTitle] = useState("");
//     const [getGoodsSelect, setGoodsSelect] = useState("");

//     const GoodsTitleHandler = (e) =>{
//         setGoodsTitle(e.currentTarget.value)
//     }

//     const GoodsSelectHandler = (e) =>{
//         setGoodsSelect(e.currentTarget.value)
//     }

//         function randomNumberInRange(min, max) {
//         // 👇️ get number between min (inclusive) and max (inclusive)
//         return Math.floor(Math.random() * (max - min + 1)) + min;
//       }

//     const handleClick = (e) => {
//         e.preventDefault();
//         const editorIns = editorRef.current.getInstance(); 
//         // const contentMark = editorIns.getMarkdown(); 
//         const contentHtml = editorIns.getHTML(); 

//         console.log(contentHtml)

//         const GoodsData = {
//             goodscode : randomNumberInRange(1,10000000)+getId,
//             goodsid : "getIdd",
//             goodsTitle : "getGoodsTitle",
//             goodsSelect : getGoodsSelect,
//             GoodsContents : contentHtml,
//             GoodsState : true,
        
//         }
//         API.post('/api/addgoodssdata', GoodsData)///
//         console.log(GoodsData)
//     }


//     return( 
//         <div className="Goods">
//             <HeaderView></HeaderView>
//             <form onSubmit={handleClick}>
//                 <div className="GoodsEditortitle">
//                     <select onChange={GoodsSelectHandler}>
//                         <option value={"창작"}>창작</option>
//                         <option value={"희소성"}>희소성</option>
//                         <option value={"특이한물건"}>특이한물건</option>
//                         <option value={"명품"}>명품</option>
//                     </select>
//                     <input placeholder=" 제 목" onChange={GoodsTitleHandler}></input>
//                     <button className="btnGoodsSave" type="submit">저  장</button>
//                 </div>
//                 <div id = "GoodsEditorconstent">
//                 <Editor ref={editorRef}
//                     initialValue="hello react editor world!"
//                     previewStyle="vertical"
//                     height="1300px"
//                     initialEditType="WYSIWYG"
//                     useCommandShortcut={true}
//                     />
                    
//                 </div> 
//             </form>
//             <FooterView></FooterView>
//         </div>
//     )
// }