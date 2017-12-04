import React from 'react';
import ECharts from 'react-echarts3/dist';
import 'react-echarts3/node_modules/echarts/lib/chart/bar';
import 'react-echarts3/node_modules/echarts/lib/component/tooltip';
import 'react-echarts3/node_modules/echarts/lib/component/title';

export default class Examples extends React.PureComponent {

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
    return (<div>
      <h2>
        <a href = "https://github.com/wmzy/react-echarts3/blob/master/example/app/src/ExamplePage.js" className = "right" >
          <code > &lt; Source &gt; </code>
        </a> Example
      </h2>

      <ECharts width={400} height={200} option={option} />
    </div>);
  }
}
