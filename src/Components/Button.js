import React from "react";

const Button = (props) => {
    let button;
    switch (props.answerIsCorrect) {
        case true:
            button = <button className="btn btn-success"
                             onClick={props.acceptAnswer}>
                <i className="fa fa-check"></i></button>;
            break;

        case false:
            button = <button class="btn btn-warning">
                <i className="fa fa-times"></i></button>;
            break;

        default:
            button = <button className="btn btn-primary"
                             disabled={!props.selectedNumbers.length > 0}
                             onClick={props.checkAnswer}>=</button>;
            break;
    }
    return (
        <div className="col-2">
            {button}
            <br/>
            <br/>
            <button className="btn btn-warning btn-sm text-center"
                    onClick={props.redraw}>
                <i className="fa fa-sync-alt"></i>
            </button>
        </div>
    )
};

export default Button;
