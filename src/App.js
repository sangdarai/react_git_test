import './App.css';
import HeaderView from './component/HeaderView';
import FooterView from './component/FooterView';
import Content from './component/Content';
import { BrowserRouter,Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
        <div className="App">
          <HeaderView />
            <Content />
          <FooterView />
        </div>
  );
}

export default App;
