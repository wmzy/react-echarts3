# react-echarts3 
> ECharts v3 wrapper for react.

## Install

```
$ npm install --save react-echarts3
```

## Usage

### ES6 Imports

```javascript
import React from 'react';
// 引入组件
import ECharts from 'react-echarts3';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Examples extends React.PureComponent {
  render() {
    const option = {
      title: {
          text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
          data:['销量']
      },
      xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
      }]
    };
    return (<ECharts width={400} height={200} option={option} />);
  }
}

```


### Examples

> See [example/app](https://github.com/wmzy/react-echarts3/tree/master/example/app)

