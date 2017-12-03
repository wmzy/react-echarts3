import React from 'react';
import echarts from 'echarts/lib/echarts';
import { mount } from 'enzyme';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';

import ECharts from '../src/index';

let instance;
let stub;

describe('<ECharts />', () => {
  beforeEach(() => {
    instance = {
      setOption: sinon.spy(),
      showLoading: sinon.spy(),
      hideLoading: sinon.spy(),
      on: sinon.spy(),
      off: sinon.spy(),
      resize: sinon.spy(),
      dispose: sinon.spy(),
    };
    stub = sinon.stub(echarts, 'init').returns(instance);
    global.domcument = new JSDOM().window.domcument;
  });

  afterEach(() => {
    stub.restore();
  });

  it('Should lifecycle methods be called', () => {
    const pro = ECharts.prototype;
    const sandbox = sinon.sandbox.create();
    sandbox.spy(pro, 'render');
    sandbox.spy(pro, 'componentDidMount');
    sandbox.spy(pro, 'componentWillUnmount');
    const wrapper = mount(
      <ECharts />
    );
    expect(pro.render.calledOnce).toEqual(true);
    expect(pro.componentWillUnmount.notCalled).toEqual(true);
    expect(pro.componentDidMount.calledOnce).toEqual(true);

    expect(pro.render.calledImmediatelyBefore(pro.componentDidMount)).toEqual(true);

    wrapper.unmount();
    expect(pro.componentWillUnmount.calledOnce).toEqual(true);
    sandbox.restore();
  });

  it('Should init echarts instance', () => {
    const getInstance = sinon.spy();
    mount(
      <ECharts getInstance={getInstance} />
    ).unmount();
    expect(stub.calledOnce).toEqual(true);
    expect(instance.setOption.notCalled).toEqual(true);
    expect(instance.showLoading.notCalled).toEqual(true);
    expect(getInstance.calledOnce).toEqual(true);
    expect(getInstance.calledWith(instance)).toEqual(true);
  });

  it('Should echarts reset option', () => {
    const wrapper = mount(
      <ECharts option={{}} />
    );
    expect(instance.setOption.calledOnce).toEqual(true);
    wrapper.setProps({ option: {} });
    expect(instance.setOption.calledTwice).toEqual(true);
    wrapper.unmount();
  });

  it('Should hide/show loading', () => {
    const wrapper = mount(
      <ECharts loading />
    );
    expect(instance.showLoading.calledOnce).toEqual(true);
    wrapper.setProps({ loading: false });
    expect(instance.hideLoading.calledOnce).toEqual(true);
    wrapper.unmount();
  });

  it('Should show/hide loading', () => {
    const wrapper = mount(
      <ECharts />
    );
    expect(instance.showLoading.notCalled).toEqual(true);
    wrapper.setProps({ loading: true });
    expect(instance.showLoading.calledOnce).toEqual(true);
    wrapper.unmount();
  });

  it('Should resize', () => {
    const wrapper = mount(
      <ECharts width={1} height={1} />
    );
    wrapper.setProps({ width: 1, height: 1 });
    expect(instance.resize.notCalled).toEqual(true);
    wrapper.setProps({ width: 2, height: 2 });
    expect(instance.resize.calledOnce).toEqual(true);
    wrapper.unmount();
  });

  it('Should on/of event', () => {
    function foo() {}
    function bar() {}
    const wrapper = mount(
      <ECharts
        width={1} height={1}
        onClick={foo}
        onMouseOut={bar}
        onDataZoom={() => {}}
        onRestore={null}
      />
    );
    expect(instance.on.callCount).toEqual(3);
    expect(instance.on.calledThrice).toEqual(true);
    expect(instance.on.getCalls().map((c) => c.args[0]))
      .toEqual(expect.arrayContaining(['click', 'mouseout', 'datazoom']));

    wrapper.setProps({ onClick: foo, onMouseOut: foo, onDataZoom: undefined });

    expect(instance.on.callCount).toEqual(4);
    expect(instance.on.getCall(3).args[0]).toEqual('mouseout');

    expect(instance.off.calledTwice).toEqual(true);
    expect(instance.off.getCalls().map((c) => c.args[0]))
      .toEqual(expect.arrayContaining(['mouseout', 'datazoom']));

    wrapper.unmount();
  });
});
