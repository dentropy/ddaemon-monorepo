import React, { useState, useEffect } from 'react';
import { VegaLite } from 'react-vega'
import { JSCharting } from 'jscharting-react';
// [Pie Chart | Vega-Lite](https://vega.github.io/vega-lite/examples/arc_pie.html)
export const GraphPie =  (props) => {
    const config = {
        type: 'horizontal column',
        series: [
            {
                points: [
                    { x: 'A', y: 50 },
                    { x: 'B', y: 30 },
                    { x: 'C', y: 50 }
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