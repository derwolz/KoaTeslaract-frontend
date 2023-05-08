import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import getIP from "../../config/api";
import "./Selection.css"
const Selection = ({ startQuiz }) => {
    const [quizes, setQuizes] = useState([])
    const [selectedValue, setSelectedValue] = useState("FlashCard");
    const [IP, setIP] = useState(getIP())
    const SelectQuiz = (item) => {
        startQuiz(item, selectedValue);
    }
    const unselect = {

    };
    
    useEffect(() => {
        axios.get(IP + "/AllQuizes").then((res) => {
            console.log(res.data)
            setQuizes(res.data);

        }
        )

    }, [])
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }
    return (
        <div className={'mainCSS'}>
            <div className={'sideBySide'}>

                <div className={'QuizSelectionCSS'}>
                    {quizes.map((item) => {
                        return (
                                <button className={"QuizSelectButton"} onClick={() => { SelectQuiz(item) }}>{item}</button>
                        );
                    })}



                </div>
                <div className={"typeBox"}>
                    <div>
                        <input type={"radio"} onClick={handleChange} name="quizType" value="FlashCard" checked={selectedValue === "FlashCard"} /> Flash Card </div>
                    <div>
                        <input type={"radio"} onClick={handleChange} name="quizType" value="MultipleChoice" checked={selectedValue === "MultipleChoice"} /> Multiple Choice</div>

                </div>



            </div>
        </div>
    );

}
export default Selection;