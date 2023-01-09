import './ViewWords.css';

function ViewWords(props) {
    const finish = () => {
        if(props.words.length < 5) {
            alert("최소 5개 이상의 단어를 입력해주세요!")
            return;
        }
        props.setIsInputing(false)
    }
    return (
        <div id='ViewWords'>
            <div id='stopInput'>
                <button id='stopInputButton' className='button noBorder'>입력 완료</button>
            </div>
            <div className=''>
                <p id='words' className='center'></p>
            </div>
        </div>
    )
}
export default ViewWords;