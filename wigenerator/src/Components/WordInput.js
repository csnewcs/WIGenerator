import {React} from "react";
import './WordInput.css'
import SideBar from "./SideBar"

function WorldInput(props) {
    const addWord = () => {
        const text = document.getElementById("textInput").value;
        if (text === "") {
            return;
        }
        props.addWord(text)
        let input = document.getElementById("textInput")
        input.value = "";
        input.focus();
    }
    const detectEnter = (e) => {
        if (e.key === 'Enter') {
            addWord()
        }
    }
    const finish = () => {
        if(props.words.length < 5) {
            alert("최소 5개 이상의 단어를 입력해주세요!")
            return;
        }
        props.setIsInputing(false)
    }
    return(
        <div className="wordInput">
            <input type={'text'} autoFocus placeholder="떠오르는 단어를 막 입력해보세요! (입력은 엔터)" id="textInput" className="noBorder gray height" onKeyDown={detectEnter}></input>
            <button className="noBorder gray height" id="input" onClick={finish}>여기까지</button>
        </div>
    )
}
export default WorldInput