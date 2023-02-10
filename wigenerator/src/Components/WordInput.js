import {React, createRef} from "react";
import './WordInput.css'

function WorldInput(props) {
    const inputRef = createRef()
    const addWord = () => {
        const input = inputRef.current
        const text = input.value;
        if (text === "") {
            return;
        }
        props.addWord(text)
        input.value = "";
        input.focus();
    }
    const detectEnter = (e) => {
        if (e.key === 'Enter') {
            addWord()
        }
    }
    return (
        <div className="wordInput noBorder">
            <input type={'text'} ref={inputRef} autoFocus placeholder="떠오르는 단어를 막 입력해보세요! (엔터로 입력)" id="textInput" className="noBorder gray height center" onKeyDown={detectEnter}></input>
        </div>
    )
}
export default WorldInput