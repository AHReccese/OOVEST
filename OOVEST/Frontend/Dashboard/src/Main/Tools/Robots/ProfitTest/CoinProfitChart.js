import React, { useEffect, useState } from 'react'
import NVD3Chart from 'react-nvd3';
import backtest from '../../../../networkF/backtest';
import * as FaIcons from 'react-icons/fa';

function CoinChart(props) {

  const [chartArr, setChartArr] = useState([{ 
    values: [],
    key: 'Coin Price',
    color: '#1D2A37'
    }]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if(props.date == null || props.date[0] == null || props.date[1] == null || props.coin == null) {
        console.log("Null input for Profit Chart!!");
        return;
    }
    setIsReady(false);
    backtest(props.date, props.coin, (v) => {
        var ans = [];
        v.map((item, index) => {
            ans.push({
                'x': index - 54,
                'y': item
            });
        })

        setChartArr(
        [{
            values: ans,
            key: props.coin + ' Profit',
            color: '#1D2A37'
        }]);

        console.log(ans);
        //setChartArr(ans);
        //displayChart(ans);
        setIsReady(true);
    });
    return;
  }, [props]);

  return (
    <div>
        {isReady?
            React.createElement(NVD3Chart, {
                xAxis: {
                    tickFormat: function(d){ return d; },
                    axisLabel: 'Days'
                },
                yAxis: {
                    axisLabel: 'Balance (Start = 100)',
                    tickFormat: function(d) {return parseFloat(d).toFixed(2); }
                },
                type:'lineChart',
                datum: chartArr,
                x: 'x',
                y: 'y',
                height: 300,
                width: 0.6 * window.innerWidth,
                nteractivityEnabled: false,
                useInteractiveGuideline: false,
                tooltip:{
                    enabled: false,
                  },
            
                renderEnd: function(){
                    console.log('renderEnd');
                    console.log(window.innerWidth);
                }
            })
        :
            <FaIcons.FaCog icon="spinner" className="spinner" size={70}/>
        }
    </div>
  )
}

export default CoinChart;