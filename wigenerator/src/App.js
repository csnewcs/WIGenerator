import logo from './logo.svg';
import './App.css';
import WorldInput from './Components/WordInput';
import ViewWords from './Components/ViewWords';
import SideBar from './Components/SideBar';
import {React, useState} from "react";

function App() {
  const [wordCount, setWordCount] = useState(0);
  const plusWordCount = () => {
    setWordCount(wordCount + 1);
  }
  return (
    <div className="App">
      <SideBar wordCount={wordCount}/>
      <div id='main'>
        <WorldInput plusWordCount={plusWordCount}/>
        <ViewWords />
      </div>
    </div>
  );
}

export default App;
