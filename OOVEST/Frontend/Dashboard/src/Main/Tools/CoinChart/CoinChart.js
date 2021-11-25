import React, { useEffect, useState } from 'react'
import NVD3Chart from 'react-nvd3';
import getSparkLine from '../../../networkF/getSparkLine';
import * as FaIcons from 'react-icons/fa';
import d3 from 'd3'

function CoinChart(props) {

  const [chartArr, setChartArr] = useState([{
    values: [{'x':"2021-01-20T00:00:00Z", 'y':2}, {'x':"2021-02-20T00:00:00Z", 'y':4}],
    key: 'Coin Profit',
    color: '#1D2A37'
  }]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
      if(props.date == null || props.date[0] == null || props.date[1] == null || props.coin == null) {
          console.log("Null input for Profit Chart!!");
          return;
      }
      setIsReady(false);
      getSparkLine(props.date, props.coin, (v) => {
          var ans = [];
          for(var index = 0; index < v.timestamps.length; index++) {
            var date = new Date(v.timestamps[index]);
            ans.push({
                'x': date,//.substring(0, v.timestamps[index].length - 1),
                'y': v.prices[index] / 10
            });
          }
          console.log(ans);
          setChartArr([{
            values: ans,
            key: props.coin + ' Price(10$)',
            color: '#1D2A37'
          }]);
          // displayChart(ans);
          setIsReady(true);
      }); 
      
    
      return;
  }, [props]);

  return (
    <div>
        {isReady?
            React.createElement(NVD3Chart, {
                xAxis: {
                  tickFormat: function(d) {
                    //var dx = chartArr[0].values[d] && chartArr[0].values[d][0] || 0;
                    return d3.time.format('%x')(new Date(d))
                  },
                  axisLabel: 'ُTime',
                  labelAngle: '-30'
                },
                yAxis: {
                    
                    tickFormat: function(d) {return parseFloat(d).toFixed(2); }
                },
                type:'lineChart',
                datum: chartArr,
                x: 'x',
                y: 'y',
                height: 600,
                width: 0.8 * window.innerWidth,
                margin : {
                  top: 50,
                  right: 100,
                  bottom: 60,
                  left: 100
                },
                renderEnd: function(){
                    console.log('renderEnd');
                }
            })
            :
            <FaIcons.FaCog icon="spinner" className="spinner" size={70}/>
        }
    </div>
  )
}

export default CoinChart;
