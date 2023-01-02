import logo from './logo.svg';
import './App.css';
import WorldInput from './Components/WordInput';
import ViewWords from './Components/ViewWords';
import SideBar from './Components/SideBar';
import {React, useState} from "react";

function App() {
  const [wordList, setWordList] = useState([])
  const addWord = (text) => {
    if (wordList.includes(text)) {
      return;
    }
    let p = document.getElementById('words');
    p.innerHTML += '<br />' + text;
  }
  const addSingleWord = (word) => {
    addWord(word)
    setWordList(wordList.concat(word))
  }
  const addMultiWords = (words) => {
    for (let i = 0; i < words.length; i++) {
      addWord(words[i])
    }
    setWordList(wordList.concat(words))
  }
  return (
    <div className="App">
      <SideBar wordCount={wordList.length} addMultiWords={addMultiWords}/>
      <div id='main'>
        <WorldInput addWord={addSingleWord}/>
        <ViewWords />
      </div>
    </div>
  );
}

export default App;
