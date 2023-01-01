import {React} from "react";
import './WordInput.css'

function WorldInput() {
    return(
        <div className="wordInput">
            <input type={'text'} autoFocus placeholder="떠오르는 단어를 막 입력해보세요!" id="textInput" className="noBorder gray height"></input>
            <button className="noBorder gray height" id="input">입력</button>
        </div>
    )
}
export default WorldInput
