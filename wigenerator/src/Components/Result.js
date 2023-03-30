import './Result.css'
import { useState, React, useEffect } from 'react'
import {Base64} from 'js-base64'

let diagram
export default function Result({mixList, setImageLink, url}) {
    const [image, setImage] = useState()
    useEffect(() => {
        diagram = makeDiagram(mixList)
        getRenderImage(diagram, url)
        .then((result) => {
            console.log(result)
            const imageUrl = makeImageUrl(result)

            setImageLink(imageUrl)
            setImage(<img alt='결과 그래프' src={imageUrl}></img>)
        })
        .catch((err) => {
            console.log(err)
            setImage('error')
        })
    })
    if(!image) {
        return loading()
    }
    else {
        if (image === 'error') {
            let text = <p></p>
            let copy = () => {
                console.log(diagram) //undefiend?
                window.navigator.clipboard.writeText(diagram)
                .then(() => {
                    alert('복사가 완료되었어요.')
                })
                .catch(() => {
                    alert('복사에 실패했어요. 아래 텍스트를 복사해 주세요.')
                    text = <p className='newline'>{diagram}</p>
                })
            }
            return (
                <div>
                    <div>
                        <p>현재 기능을 준비 중이에요. <a className="blueText click" href='https://play.d2lang.com/?layout=elk' target='blank'>여기</a>에 들어가 텍스트를 넣어주세요.</p>
                        <button onClick={copy}>복사하기</button>
                    </div>
                    {text}
                </div>
            )
        }
        
        return (
            <div className='overflow'>
                <a href={image} download='test.svg'>test file</a>
                {image}
            </div>
        )
    }
}
async function getRenderImage(code, address) {
    const ㅕ기 = address.includes('localhost') ? ('http://' + address + '/') : ('https://' + address + '/')
    console.log(url)
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',ocalhost:8080
        },
        body: 'code=' + code
    })
    const text = await result.text()
    return text
}
function loading() {
    return <div>로딩중</div>
}

function decodeBase64ToSvg(base64) {
    return Base64.decode(base64)
}

export function makeImageUrl(image) {
    const svg = decodeBase64ToSvg(image)
    const blob = new Blob([svg], {type: 'image/svg+xml'})
    const url = URL.createObjectURL(blob)
    return url
}

function makeDiagram(mixList) {
    //make diagram with d2
    let diagram = ''
    for(let mix in mixList) {
        for(let word of mixList[mix]) {
            diagram.includes(word + '<->' + mix) || (diagram += mix + '<->' + word + '\n')
        }
    }
    return diagram
}
