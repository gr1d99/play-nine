import React from "react";
import {shallow} from "enzyme";
import Answer from "./../../Components/Answer"

describe('<Answer />', () => {
    let selectedNumbers;
    let wrapper;
    const unSelectNumber = jest.fn();

    beforeEach(() => {
      unSelectNumber.mockReset()
    });

    it('should render correct number of answers when selectedNumbers is provided', () => {
        selectedNumbers = [1, 2];
        wrapper = shallow(<Answer selectedNumbers={selectedNumbers}/>);
        expect(wrapper.find('span').length).toEqual(2)
    });

    it('should render correct selected numbers values', () => {
        selectedNumbers = [1, 2, 3];
        wrapper = shallow(<Answer selectedNumbers={selectedNumbers}/>);
        selectedNumbers.map((selectedNumber) => (
            expect(wrapper.html()).toContain(selectedNumber.toString())
        ))
    });

    it('should call unSelectNumber function when selected answer is clicked', () => {
        selectedNumbers = [1, 2, 3];
        wrapper = shallow(<Answer selectedNumbers={selectedNumbers}
                                  unSelectNumber={unSelectNumber}/>);
        wrapper.find('span').first().simulate('click');
        expect(unSelectNumber.mock.calls[0][0]).toEqual(1)
    });

    it('should not render any answer when selectedNumbers in empty', () => {
        selectedNumbers = [];
        wrapper = shallow(<Answer selectedNumbers={selectedNumbers}/>);
        expect(wrapper.find('span').length).toBe(0)
    });
});
