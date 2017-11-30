import React from 'react';
import { shallow } from 'enzyme';

import ECharts from '../src/index';

describe('<ECharts />', () => {
  it('Should render', () => {
    const renderedComponent = shallow(
      <ECharts />
    );
    expect(renderedComponent.find('div')).toHaveLength(1);
  });
});
