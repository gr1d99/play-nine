import React from "react";
import {shallow} from "enzyme";
import Button from "./../../Components/Button"

let button;
let selectedNumbers;
const checkAnswer = jest.fn();

describe('<Button/>', () => {
    afterEach(() => {
        checkAnswer.mockReset()
    });

    describe('check answer button', () => {
        it('should render check answer button', () => {
            selectedNumbers = [];
            button = shallow(<Button selectedNumbers={selectedNumbers}/>);
            expect(button.html()).toContain("=");
            expect(button.find('button').first().hasClass('btn btn-primary')).toBeTruthy();
        });

        it('should disable check answer button when selected numbers is empty', () => {
            selectedNumbers = [];
            const button = shallow(<Button selectedNumbers={selectedNumbers}/>);
            expect(button.find('button').first().props()).toHaveProperty("disabled")
        });

        it('should not disable check answer button when selected numbers is not empty', () => {
            selectedNumbers = [9];
            button = shallow(<Button selectedNumbers={selectedNumbers}/>);
            expect(button.find('button').first().prop('disabled')).toBeFalsy()
        });

        it('should call check answer method', () => {
            selectedNumbers = [9];
            button = shallow(<Button selectedNumbers={selectedNumbers}
                                     checkAnswer={checkAnswer}/>);
            button.find('button').first().simulate('click');
            expect(checkAnswer).toHaveBeenCalled();
            expect(checkAnswer).toHaveBeenCalledTimes(1)
        });
    });
});
