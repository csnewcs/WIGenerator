import './ViewWords.css';

function ViewWords(props) {
    const finish = () => {
        if(props.wordList.length < 5) {
            alert("최소 5개 이상의 단어를 입력해주세요!")
            return;
        }
        props.setLevel(1)
    }
    return (
        <div id='ViewWords'>
            <div id='stopInput'>
                <button id='stopInputButton' className='button noBorder' onClick={finish}>입력 완료</button>
            </div>
            <div className=''>
                <p id='words' className='center newLine'>{props.wordList.join('\n')}</p>
            </div>
            <div id='blank' ref={props.wordsRef}></div>
        </div>
    )
}
export default ViewWords;