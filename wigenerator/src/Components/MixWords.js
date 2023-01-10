import { useState } from 'react'
import './MixWords.css'

function shuffle (array)
{
    array.sort(() => Math.random() - 0.5);
    return array
}

let wordsList = [[],[]]
function MixWords({words, addCombination}) {
    let firstWord = window.document.getElementById('firstWord')
    let secondWord = window.document.getElementById('secondWord')

    let [index, setIndex] = useState(0)
    let [isInited, setIsInited] = useState(false)
    if(!isInited) {
        wordsList[0] = [...(shuffle(words))]
        wordsList[1] = [...(shuffle(words))]
        setIsInited(true)
    }
    let word1 = wordsList[0][index]
    let word2 = wordsList[1][index]

    const mix = () => {
        word1 = wordsList[0][index]
        word2 = wordsList[1][index]
        firstWord = window.document.getElementById('firstWord')
        secondWord = window.document.getElementById('secondWord')
        firstWord.innerHTML = word1
        secondWord.innerHTML = word2
    }
    const apply = () => {
        addCombination(word1, word2)
        setIndex(index++)
        mix()
    }
    const disapply = () => {
        setIndex(index++)
        mix()
    }
    return (
        <div className="max">
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
export default MixWords;