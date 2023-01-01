import {React} from "react";
import './WordInput.css'
import SideBar from "./SideBar"

function WorldInput(props) {
    return(
        <div className="wordInput">
            <input type={'text'} autoFocus placeholder="떠오르는 단어를 막 입력해보세요!" id="textInput" className="noBorder gray height"></input>
            <button className="noBorder gray height" id="input" onClick={() => {
                const text = document.getElementById("textInput").value;
                if (text === "") {
                    return;
                }
                let p = document.createElement('p');
                p.innerHTML = text;
                p.className = 'center';
                document.getElementById("ViewWords").appendChild(p);
                document.getElementById("textInput").value = "";
                document.getElementById("textInput").focus();
                document.getElementById("textInput").select();
                props.plusWordCount();
            }}>입력</button>
        </div>
    )
}
export default WorldInput