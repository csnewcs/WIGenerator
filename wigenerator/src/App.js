// import logo from './logo.svg';
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
    if (word1 === undefined || word2 === undefined) {
      alert('undifined 발생')
      return
    }

    const copy1 = [...(mixList[word1] ?? [])]
    const copy2 = [...(mixList[word2] ?? [])]
  
    copy1.push(word2)
    copy2.push(word1)
  
    setMixList({
      ...mixList,
      [word1]: copy1,
      [word2]: copy2
    })
  }
  if (level === 0) {
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
  else if (level === 1) {
    let count = 0
    Object.values(mixList).forEach((value) => {
      count += value.length
    })
    console.log(mixList)
    return (
      <div className="App">
        <SideBar wordCount={wordList.length} combinationCount={count / 2} addMultiWords={addMultiWords} level={level}/>
        <div id='main'>
          <MixWords words={wordList} addCombination={addCombination} setLevel={setLevel}/>
        </div>
      </div>
    );
  }
  else {
    return (<div> </div>)
  }
}

export default App;
