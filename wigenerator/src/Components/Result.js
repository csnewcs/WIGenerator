import './Result.css'

export default function Result({mixList}) {
    const diagram = makeDiagram(mixList)
    let isServerOn = false
    let text = <p></p>
    let copy = () => {
        navigator.clipboard.writeText(diagram)
            .then(() => {
                alert('복사가 완료되었어요.')
            })
            .catch(() => {
                alert('복사에 실패했어요. 아래 텍스트를 복사해 주세요.')
                text = <p className='newline'>{diagram}</p>
                console.log(text)
            })
    }
    let result = isServerOn ? <div></div> : <div><p>현재 기능을 준비 중이에요. <a className="blueText click" href='https://play.d2lang.com/?layout=elk' target='blank'>여기</a>에 들어가 텍스트를 넣어주세요.</p><button onClick={copy}>복사하기</button></div>
    return (
        <div>
            {result}
            {text}
        </div>
    )
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
