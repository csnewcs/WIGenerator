import logo from './logo.svg';
import './App.css';
import WorldInput from './Components/WordInput';
import ViewWords from './Components/ViewWords';
import SideBar from './Components/SideBar';
import {React, useState} from "react";

function App() {
  const [wordCount, setWordCount] = useState(0);
  const [wordList, setWordList] = useState([])
  const plusWordCount = () => {
    setWordCount(wordCount + 1);
  }
  const addWord = (text) => {
    if (wordList.includes(text)) {
      return;
    }
    let p = document.getElementById('words');
    p.innerHTML += '<br />' + text;
    setWordList(wordList.concat(text))
    plusWordCount()
  }
  return (
    <div className="App">
      <SideBar wordCount={wordCount}/>
      <div id='main'>
        <WorldInput addWord={addWord}/>
        <ViewWords />
      </div>
    </div>
  );
}

export default App;
