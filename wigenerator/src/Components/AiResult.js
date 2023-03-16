import {makeImageUrl} from "./Result"
import { useState, useEffect } from "react"

export default function AiResult({url, words}) {
    const [result, setResult] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    console.log(words.join(' '))
    useEffect(() => {
        fetch(`https://${url}/find`, {method: 'POST', body: `words=${words.join(' ')}`, headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },})
        .then(res => res.text())
        .then(
            (result) => {
                setIsLoaded(true)
                setResult(makeImageUrl(result))
            }
        )
    }, [url, words])
    if(isLoaded) {
        return (
            <div className='overflow'>
                <img src={result}></img>
                <a href={result} download='test.svg'>test file</a>
            </div>
        )
    }
    else {
        return (
            <div>
                <p>로딩중...</p>
            </div>
        )
    }
}