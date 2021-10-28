import React, { useState, useEffect } from 'react';
import { VegaLite } from 'react-vega'
import { JSCharting } from 'jscharting-react';
// [Pie Chart | Vega-Lite](https://vega.github.io/vega-lite/examples/arc_pie.html)
export const GraphPie =  (props) => {
    const config = {
        debug: true, 
        title_position: 'center', 
        legend: { 
          template: 
            '%value {%percentOfTotal:n1}% %icon %name', 
          position: 'inside left bottom'
        }, 
        type: 'pie', 
        defaultSeries: { 
          type: 'pie', 
          pointSelection: true
        }, 
        defaultPoint_label_text: '<b>%name</b>', 
        title_label_text: 'Countries GDP', 
        yAxis: { label_text: 'GDP', formatString: 'n' }, 
        series: [ 
          { 
            name: 'Countries', 
            points: [ 
              { name: 'United States', y: 5452500 }, 
              { name: 'Canada', y: 786052 }, 
              { name: 'United Kingdom', y: 477338 }, 
              { name: 'Mexico', y: 155313 } 
            ] 
          } 
        ] 
    };
    
    const divStyle = {
        maxWidth: '700px',
        height: '400px',
        margin: '0px auto'
    };
    


    return (
        <div>
           <div style={divStyle}><JSCharting options={config} /></div>
        </div>
    )
}