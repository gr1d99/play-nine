import React from "react";
import {mount} from "enzyme";
import Game from "./../../Components/Game";
import Numbers from "./../../Components/Numbers";
import Answers from "./../../Components/Answer";
import Button from "./../../Components/Button";
import Stars from "../../Components/Stars";

const setup = () => {
    const wrapper = mount(<Game/>);

    return {
        wrapper
    }
};

describe('<Game/>', () => {
    it('should add number to selected numbers when clicked', () => {
        const {wrapper} = setup();
        wrapper.find(Numbers).find('span').first().simulate('click');
        expect(wrapper.state('selectedNumbers')).toHaveLength(1)
    });

    it('should not add number to selected numbers if it already exists', () => {
        const {wrapper} = setup();
        wrapper.setState({selectedNumbers: [1]});
        wrapper.find(Numbers).find('span').first().simulate('click');
        expect(wrapper.state('selectedNumbers')).toHaveLength(1)
    });

    it('should remove number from selected numbers when number is clicked in answers', () => {
        const {wrapper} = setup();
        wrapper.find(Numbers).find('span').first().simulate('click');
        expect(wrapper.state('selectedNumbers')).toHaveLength(1);
        wrapper.find(Answers).find('span').first().simulate('click');
        expect(wrapper.state('selectedNumbers')).toHaveLength(0)
    });

    it('should set answer as correct when number of stars and selected numbers sum are equal', () => {
        const {wrapper} = setup();
        wrapper.setState({numberOfStars: 1});
        wrapper.find(Numbers).find('span').first().simulate('click');
        expect(wrapper.state('selectedNumbers')).toHaveLength(1);
        wrapper.find(Button).find('button').first().simulate('click');
        expect(wrapper.state('answerIsCorrect')).toBeTruthy()
    });

    it('should set number as used', () => {
        const {wrapper} = setup();
        wrapper.setState({
            numberOfStars: 1,
            selectedNumbers: [1],
            answerIsCorrect: true
        });
        wrapper.find(Button).find('button').first().simulate('click');
        expect(wrapper.state('usedNumbers')).toHaveLength(1)
    });

    it('should reset state when refresh button is clicked', () => {
        const {wrapper} = setup();
        wrapper.setState({
            numberOfStars: 1,
            selectedNumbers: [1],
            answerIsCorrect: true
        });
        wrapper.find(Button).find('button').last().simulate('click');
        expect(wrapper.state('selectedNumbers')).toEqual([]);
        expect(wrapper.state('answerIsCorrect')).toEqual(null)
    });
});
