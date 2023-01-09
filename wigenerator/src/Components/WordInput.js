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
    return(
        <div className="wordInput noBorder">
            <input type={'text'} autoFocus placeholder="떠오르는 단어를 막 입력해보세요! (입력은 엔터)" id="textInput" className="noBorder gray height center" onKeyDown={detectEnter}></input>
        </div>
    )
}
export default WorldInput