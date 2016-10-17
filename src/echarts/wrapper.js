import React, {Component, PropTypes} from 'react';

export default function (echarts) {
  return class ECahrts extends Component {
    static propTypes = {
      theme: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      initOption: PropTypes.object,
      option: PropTypes.object,
      notMerge: PropTypes.bool,
      lazyUpdate: PropTypes.bool,
      loading: PropTypes.bool,
      className: PropTypes.string,
      style: PropTypes.object
    };

    static defaultProps = {
      option: {},
      notMerge: false,
      lazyUpdate: false
    };

    componentDidMount() {
      const {option, notMerge, lazyUpdate, theme, initOption} = this.props;

      this.instance = echarts.init(this.dom, theme, initOption);
      this.instance.setOption(option, notMerge, lazyUpdate);
    }

    componentWillReceiveProps({option, notMerge, lazyUpdate, loading, ...events}) {
      if (option !== this.props.option) this.instance.setOption(option, notMerge, lazyUpdate);
      if (loading) this.instance.showLoading();
      this.instance.hideLoading();

      // bind or unbind events
      const props = this.props;
      Object.keys(props).forEach(e => {
        if (props[e] !== events[e] && typeof props[e] === 'function')
          this.instance.off(toEChartsEventName(e), props[e]);
      });
      Object.keys(events).forEach(e => {
        if (events[e] !== props[e] && typeof events[e] === 'function')
          this.instance.on(toEChartsEventName(e), events[e]);
      });
    }

    shouldComponentUpdate({className, style}) {
      return className !== this.props.className || style !== this.props.style;
    }

    componentWillUnmount() {
      this.instance.dispose();
    }

    render() {
      const {className, style} = this.props;
      return <div ref={dom => (this.dom = dom)} className={className} style={style} />;
    }
  }
}

function toEChartsEventName(eventName) {
  return eventName.startsWith('on') ? eventName.slice(2).toLowerCase() : eventName.toLowerCase();
}
