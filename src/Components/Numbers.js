import React from "react";

import _ from 'lodash'

const Numbers = (props) => {
    const numberClassName = (number) => {
        if (props.usedNumbers.indexOf(number) >= 0) {
            return "used"
        }
        if (props.selectedNumbers.indexOf(number) >= 0) {
            return "selected"
        }
    };
    return (
        <div className="card text-center">
            <div>
                {
                    Numbers.list.map(
                        (number, i) =>
                            <span onClick={() => props.selectNumber(number)}
                                  className={numberClassName(number)} key={i}>{number}
          	</span>)
                }
            </div>
        </div>
    )
};

Numbers.list = _.range(1, 10);

export default Numbers;
