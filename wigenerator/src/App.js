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
      return false;
    }
    let p = document.getElementById('words');
    p.innerHTML += '<br />' + text;
    return true
  }
  const addSingleWord = (word) => {
    if(addWord(word)) {
      setWordList(wordList.concat(word))
    }
  }
  const addMultiWords = (words) => {
    for (let i = 0; i < words.length; i++) {
      if(!addWord(words[i])) {
        words.splice(i, 1)
      }
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
