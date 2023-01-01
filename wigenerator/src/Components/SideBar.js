import './SideBar.css'
import {React, Component} from "react";

export default class SideBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="sideBar">
                <div><p>인터넷에서 단어 가져오기</p></div>
                <p id='wordCount'>입력된 단어: {this.props.wordCount}개</p>
            </div>
        );
    }
}