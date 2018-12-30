import React from "react";
import {shallow} from "enzyme";
import Numbers from "./../../Components/Numbers";

const setup = (overrideProps) => {
    const selectNumber = jest.fn();
    const numberClassName = jest.fn();
    const props = Object.assign({
        selectedNumbers: [],
        usedNumbers: [],
        numberClassName,
        selectNumber
    }, overrideProps);

    const wrapper = shallow(<Numbers {...props}/>);

    return {
        numberClassName,
        props,
        selectNumber,
        wrapper
    }
};

describe('<Numbers />', () => {
    it('should render 9 numbers', () => {
        const {wrapper} = setup();
        expect(wrapper.find('span')).toHaveLength(9)
    });

    it('should have used class value when number is in used numbers list', () => {
        const {wrapper} = setup({usedNumbers: [1]});
        expect(wrapper.find('span').first().hasClass('used')).toBeTruthy();
        expect(wrapper.find('.used')).toHaveLength(1)
    });

    it('should have selected class value when number is in selected numbers list', () => {
        const {wrapper} = setup({selectedNumbers: [1]});
        expect(wrapper.find('span').first().hasClass('selected')).toBeTruthy();
        expect(wrapper.find('.selected')).toHaveLength(1)
    });

    it('should call select number function when clicked', () => {
        const {selectNumber, wrapper} = setup();
        const selectedNumber = parseInt(wrapper.find('span').first().text());
        wrapper.find('span').first().simulate('click');
        expect(selectNumber).toHaveBeenCalled();
        expect(selectNumber).toHaveBeenCalledTimes(1);
        expect(selectNumber).toHaveBeenCalledWith(selectedNumber)
    });

    it('should call numberClassName function', () => {
        const {numberClassName, wrapper} = setup({selectedNumbers: [1]});
    });
});
