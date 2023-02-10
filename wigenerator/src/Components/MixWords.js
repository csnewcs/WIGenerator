import { useEffect, useState } from 'react'
import './MixWords.css'

let doneList = {}

export default function MixWords({words, addCombination, setLevel}) {
    const [index, setIndex] = useState(1)
    const [word1, setWord1] = useState()
    const [word2, setWord2] = useState()
    
    const factorial = (n) => {
        var result = 1;
        for(var i=2; i<=n; i++) result *= i;
        return result;
    }
    const maxIndex = factorial(words.length) / (2*factorial(words.length - 2)) // (all)C(2) 
    const getWords = () => {
        let tempWord1 = words[Math.floor(Math.random() * words.length)]
        let tempWord2 = words[Math.floor(Math.random() * words.length)]
        if(tempWord1 === tempWord2 || doneList[tempWord1]?.includes(tempWord2)) {
            if(index >= maxIndex) 
            {
                alert('모든 조합 끝')
                setLevel(2)
            }
            else {
                return getWords()
            }
        }
        else {
            return [tempWord1, tempWord2]
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
        const words = getWords()
        if(words === undefined) return
        setWord1(words[0])
        setWord2(words[1])
    }
    const apply = () => {
        addCombination(word1, word2)
        addDone(word1, word2)
        setIndex(index+1)
        mix()
    }
    const disapply = () => {
        addDone(word1, word2)
        setIndex(index+1)
        mix()
    }
    useEffect(() => mix(), [])
    return (
        <div className="maxHeight maxWidth">
            <div className='flex'>
                <p id='firstWord' className='bigText'>{word1}</p>
                <p id='secondWord' className='bigText'>{word2}</p>
            </div>
            <div className='flex' style={{justifyContent: 'center'}}>
                <button className='blue round noBorder button-m text-center' onClick={apply}>O</button>
                <button className='red round noBorder button-m text-center' onClick={disapply}>X</button>
            </div>
            <div className='flex'>
                {(index < 10 && (index/maxIndex) < 0.1) || <button onClick={() => {setLevel(2)}}>중단</button>}
            </div>
        </div>
    )
}