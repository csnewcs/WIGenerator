// import logo from './logo.svg';
import './App.css';
import WorldInput from './Components/WordInput';
import ViewWords from './Components/ViewWords';
import SideBar from './Components/SideBar';
import MixWords from './Components/MixWords';
import Result from './Components/Result';
import {React, createRef, useState, useEffect} from "react";

function App() {
  const [wordList, setWordList] = useState([])
  const [level, setLevel] = useState(0)
  const [mixList, setMixList] = useState({})
  const wordsRef = createRef()
  const appRef = createRef()
  const addWord = (text) => {
    if (!wordList.includes(text)) {
      setWordList(wordList.concat(text))
    }
  }
  useEffect(() => {
      wordsRef.current?.scrollIntoView({behavior: "smooth", block: "end", inline: "end"})
  }, [wordList])
  const addMultiWords = (words) => {
    let adds = []
    for (let word of words) {
      if (!wordList.includes(word)) {
        adds.push(word)
      }
    }
    setWordList(wordList.concat(adds))
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
      <div className="App" ref={appRef}>
        <SideBar wordCount={wordList.length} addMultiWords={addMultiWords} level={level}/>
        <div id='main'>
          <WorldInput addWord={addWord} appRef={appRef} wordsRef={wordsRef} />
          <ViewWords wordList={wordList} setLevel={setLevel} wordsRef={wordsRef}/>
        </div>
      </div>
    );
  }
  else if (level === 1) {
    let count = 0
    Object.values(mixList).forEach((value) => {
      count += value.length
    })
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
    return (
      <div className="App">
        <SideBar wordCount={wordList.length} addMultiWords={addMultiWords} level={level}/>
        <div id='main'>
          <Result wordList={wordList} mixList={mixList}/>
        </div>
      </div>
    )
  }
}

export default App;
