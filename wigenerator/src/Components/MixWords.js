import { useState } from 'react'
import './MixWords.css'

let doneList = {}

export default function MixWords({words, addCombination, setLevel}) {
    let firstWord = window.document.getElementById('firstWord')
    let secondWord = window.document.getElementById('secondWord')

    let [index, setIndex] = useState(0)
    // console.log(words)
    let word1
    let word2
    let factorial = (n) => {
        var result = 1;
        for(var i=2; i<=n; i++) result *= i;
        return result;
    }
    const maxIndex = factorial(words.length) / (2*factorial(words.length - 2))
    const setWord = () => {
        word1 = words[Math.floor(Math.random() * words.length)]
        word2 = words[Math.floor(Math.random() * words.length)]
        if(doneList[word1] === undefined || doneList[word2] === undefined || word1===undefined || word2===undefined) {
            return
        }
        if(word1 === word2 || doneList[word1].includes(word2) || doneList[word2].includes(word1)) {
            if(index >= maxIndex) // (all)C(2) 
            {
                alert('모든 조합 끝')
                setLevel(2)
            }
            else {
                setWord()
            }
        }
    }
    const addDone = (first, second) => {
        if(doneList[first] === undefined) {
            doneList[first] = [second]
        }
        else {
            doneList[first].push(second)
        }
        if(doneList[second] === undefined) {
            doneList[second] = [first]
        }
        else {
            doneList[second].push(first)
        }
    }
    const mix = () => {
        setWord()
        firstWord = window.document.getElementById('firstWord')
        secondWord = window.document.getElementById('secondWord')
        firstWord.innerHTML = word1
        secondWord.innerHTML = word2
    }
    const apply = () => {
        console.log('word1: ' + word1 + ', word2: ' + word2)
        addCombination(word1, word2)
        addDone(word1, word2)
        setIndex(index++)
        mix()
    }
    const disapply = () => {
        addDone(word1, word2)
        setIndex(index++)
        mix()
    }

    if(index === 0) {
        setWord()
    }
    return (
        <div className="maxHeight maxWidth">
            <div className='flex'>
                <p id='firstWord'>{word1}</p>
                <p id='secondWord'>{word2}</p>
            </div>
            <div className='flex' style={{justifyContent: 'center'}}>
                <button className='blue round noBorder button-m text-center' onClick={apply}>O</button>
                <button className='red round noBorder button-m text-center' onClick={disapply}>X</button>
            </div>
        </div>
    )
}