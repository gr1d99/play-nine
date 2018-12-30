import React from "react";
import {shallow} from "enzyme";
import Stars from "./../../Components/Stars";

const setup = (overrideProps) => {
  const props = Object.assign({
      numberOfStars: 6,
  }, overrideProps);

  const wrapper = shallow(<Stars {...props}/>);

  return {
      props,
      wrapper
  }
};

describe('<Stars/>', () => {
    it('should render correct number of stars', () => {
       const {wrapper} = setup();
       expect(wrapper.find('i')).toHaveLength(6)
    });

    it('should render <i> tags with star icons', () => {
        const {wrapper} = setup();
        wrapper.find('i').forEach((element) => {
            expect(element.hasClass('fa fa-star')).toBeTruthy()
        })
    });

    it('should not render stars when number of stars is zero', () => {
        const {wrapper} = setup({numberOfStars: 0});
        expect(wrapper.find('i')).toHaveLength(0)
    });
});
