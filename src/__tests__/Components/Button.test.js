import React from "react";
import {shallow} from "enzyme";
import Button from "./../../Components/Button";

const setup = propsOverride => {
    const checkAnswer = jest.fn();
    const acceptAnswer = jest.fn();
    const redraw = jest.fn();

    const props = Object.assign({
        checkAnswer,
        selectedNumbers: [],
        answerIsCorrect: null,
        acceptAnswer,
        redraw
    }, propsOverride);

    const wrapper = shallow(<Button {...props}/>);

    return {
        props,
        wrapper,
        checkAnswer,
        acceptAnswer,
        redraw
    }
};

describe('<Button/>', () => {
    afterEach(() => {
        const {checkAnswer, acceptAnswer} = setup();
        checkAnswer.mockReset();
        acceptAnswer.mockReset()
    });

    describe('check answer button', () => {
        it('should render check answer button', () => {
            const {wrapper} = setup();
            expect(wrapper.html()).toContain("=");
            expect(wrapper.find('button').first().hasClass('btn btn-primary')).toBeTruthy();
        });

        it('should disable check answer button when selected numbers is empty', () => {
            const {wrapper} = setup();
            expect(wrapper.find('button').first().props()).toHaveProperty("disabled")
        });

        it('should not disable check answer button when selected numbers is not empty', () => {
            const {wrapper} = setup({selectedNumbers: [9]});
            expect(wrapper.find('button').first().prop('disabled')).toBeFalsy()
        });

        it('should call check answer function', () => {
            const {checkAnswer, wrapper} = setup({selectedNumbers: [9]});
            wrapper.find('button').first().simulate('click');
            expect(checkAnswer).toHaveBeenCalled();
            expect(checkAnswer).toHaveBeenCalledTimes(1)
        });
    });

    describe('accept answer button', () => {
        it('should have success class', () => {
            const {wrapper} = setup(
                {answerIsCorrect: true,
                    selectedNumbers: [1]}
                );
            expect(wrapper.find('button').first().hasClass('btn btn-success')).toBeTruthy()
        });

        it('should have check icon when answer is correct', () => {
            const {wrapper} = setup(
                {answerIsCorrect: true,
                    selectedNumbers: [1]}
            );
            expect(wrapper.find('button').first().children().prop('className')).toBe('fa fa-check')
        });

        it('should call accept answer function',() => {
            const {acceptAnswer, wrapper} = setup(
                {answerIsCorrect: true,
                    selectedNumbers: [1]}
            );
            wrapper.find('button').first().simulate('click');
            expect(acceptAnswer).toHaveBeenCalled();
            expect(acceptAnswer).toHaveBeenCalledTimes(1)
        });
    });

    describe('answer is incorrect button', () => {
        it('should have warning class', () => {
            const {wrapper} = setup(
                {answerIsCorrect: false,
                    selectedNumbers: [1]}
            );
            expect(wrapper.find('button').first().hasClass('btn btn-warning')).toBeTruthy()
        });

        it('should have times icon', () => {
            const {wrapper} = setup(
                {answerIsCorrect: false,
                    selectedNumbers: [1]}
            );
            expect(wrapper.find('button').first().children().hasClass('fa fa-times')).toBeTruthy()
        });
    });

    describe('redraw button', () => {
        it('should have info class', () => {
            const {wrapper} = setup();
            expect(wrapper.find('button').last().hasClass('btn btn-info')).toBeTruthy()
        });

        it('should have sync icon', () => {
            const {wrapper} = setup();
            expect(wrapper.find('button').last().children().hasClass('fa fa-sync-alt')).toBeTruthy()
        });

        it('should call redraw function when clicked', () => {
            const {wrapper, redraw} = setup();
            wrapper.find('button').last().simulate('click');
            expect(redraw).toHaveBeenCalled();
            expect(redraw).toHaveBeenCalledTimes(1)
        });
    });
});
