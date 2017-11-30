import React, { Component } from 'react';
import PropTypes from 'prop-types';
import echarts from 'echarts/lib/echarts';

function noop() {}

export default class ECahrts extends Component {

  static propTypes = {
    className: PropTypes.string,
    getInstance: PropTypes.func,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    initOption: PropTypes.object,
    lazyUpdate: PropTypes.bool,
    loading: PropTypes.bool,
    notMerge: PropTypes.bool,
    option: PropTypes.object,
    style: PropTypes.object,
    theme: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  static defaultProps = {
    getInstance: noop,
    option: {},
    notMerge: false,
    lazyUpdate: false,
  };

  componentDidMount() {
    const { option, notMerge, lazyUpdate, theme, initOption, getInstance } = this.props;

    this.instance = echarts.init(this.dom, theme, initOption);
    this.instance.setOption(option, notMerge, lazyUpdate);
    getInstance(this.instance);
  }

  componentWillReceiveProps({ option, notMerge, lazyUpdate, loading, ...events }) {
    if (option !== this.props.option) this.instance.setOption(option, notMerge, lazyUpdate);
    if (loading) this.instance.showLoading();
    this.instance.hideLoading();

    // bind or unbind events
    const props = this.props;
    Object.keys(props).filter(isEventName).forEach((e) => {
      if (props[e] !== events[e] && typeof props[e] === 'function')
        this.instance.off(toEChartsEventName(e), props[e]);
    });
    Object.keys(events).filter(isEventName).forEach((e) => {
      if (events[e] !== props[e] && typeof events[e] === 'function')
        this.instance.on(toEChartsEventName(e), events[e]);
    });
  }

  shouldComponentUpdate({ className, style, width, height }) {
    return className !== this.props.className || style !== this.props.style ||
      width !== this.props.width || height !== this.props.height;
  }

  componentDidUpdate() {
    this.instance.resize();
  }

  componentWillUnmount() {
    this.instance.dispose();
  }

  render() {
    const { className, style, width, height } = this.props;
    return <div ref={(dom) => (this.dom = dom)} className={className} style={{ ...style, width, height }} />;
  }
}

function toEChartsEventName(eventName) {
  return eventName.slice(2).toLowerCase();
}

function isEventName(k) {
  k.startsWith('on') && k.charAt(2) <= 'Z';
}
