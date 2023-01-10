import logo from './logo.svg';
import './App.css';
import WorldInput from './Components/WordInput';
import ViewWords from './Components/ViewWords';
import SideBar from './Components/SideBar';
import MixWords from './Components/MixWords';
import {React, useState} from "react";

function App() {
  const [wordList, setWordList] = useState([])
  const [level, setLevel] = useState(0)
  const [mixList, setMixList] = useState({})
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
  const addCombination = (word1, word2) => {
    if (mixList[word1] === undefined) {
      mixList[word1] = []
    }
  }
  if (level == 0) {
    return (
      <div className="App">
        <SideBar wordCount={wordList.length} addMultiWords={addMultiWords} level={level}/>
        <div id='main'>
          <WorldInput addWord={addSingleWord} />
          <ViewWords words={wordList} setLevel={setLevel} />
        </div>
      </div>
    );
  }
  else if (level == 1) {
    return (
      <div className="App">
        <SideBar wordCount={wordList.length} combinationCount={wordList.length} addMultiWords={addMultiWords} level={level}/>
        <div id='main'>
          <MixWords words={wordList} addCombination={addWord}/>
        </div>
      </div>
    );
  }
  else {
    return (<div> </div>)
  }
}

export default App;
