import React from "react"

import Stars from "./Stars"
import Button from "./Button"
import Answer from "./Answer"
import Numbers from "./Numbers"

class Game extends React.Component {
    state = {
        selectedNumbers: [],
        numberOfStars: 1 + Math.floor(Math.random() * 9),
        answerIsCorrect: null,
        usedNumbers: []
    };

    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }));
    };

    unSelectNumber = (clickedNumber) => {
        this.setState(prevState => ({
                answerIsCorrect: null,
                selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
            })
        )
    };

    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
        }))
    };

    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(
                prevState.selectedNumbers
            ),
            selectedNumbers: [],
            answerIsCorrect: null,
            numberOfStars: 1 + Math.floor(Math.random() * 9)
        }))
    };

    redraw = () => {
        this.setState({
            selectedNumbers: [],
            answerIsCorrect: null,
            numberOfStars: 1 + Math.floor(Math.random() * 9)
        })
    };
    render() {
        const {
            numberOfStars,
            selectedNumbers,
            answerIsCorrect,
            usedNumbers,
        } = this.state;
        return (
            <div>
                Play Nine
                <hr/>
                <div className="row">
                    <Stars numberOfStars={numberOfStars}/>
                    <Button checkAnswer={this.checkAnswer}
                            selectedNumbers={selectedNumbers}
                            answerIsCorrect={answerIsCorrect}
                            acceptAnswer={this.acceptAnswer}
                            redraw={this.redraw}/>
                    <Answer selectedNumbers={selectedNumbers}
                            unSelectNumber={this.unSelectNumber}/>
                </div>
                <br/>
                <Numbers selectedNumbers={selectedNumbers}
                         selectNumber={this.selectNumber}
                         usedNumbers={usedNumbers}/>
            </div>
        )
    }
}

export default Game;
