import './SideBar.css'
import {React, Component} from "react";
import dict from './dictionary.csv'

export default class SideBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const getFile = async() => {
            const response = await fetch(dict);
            const data = await response.text();
            const rows = data.split('\n').slice(1);
            return rows
        }
        const getWordsFromDictionary = () => {
            getFile().then((data) => {
                let selectedWords = []
                for (let i = 0; i < 100; i++) {
                    let randomIndex = Math.floor(Math.random() * data.length)
                    let selected = data[randomIndex]
                    selectedWords.push(selected.replace('-', ''))
                }
                this.props.addMultiWords(selectedWords)
            })
        }
        return (
            <div className="sideBar">
                <div id='getWordsFromOnline' onClick={getWordsFromDictionary}><p>사전에서 단어 가져오기</p></div>
                <p id='wordCount'>입력된 단어: {this.props.wordCount}개</p>
            </div>
        );
    }
}