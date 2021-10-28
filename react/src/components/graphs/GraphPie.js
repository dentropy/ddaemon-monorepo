import React, { useState, useEffect } from 'react';
import { VegaLite } from 'react-vega'
import { JSCharting } from 'jscharting-react';
// [Pie Chart | Vega-Lite](https://vega.github.io/vega-lite/examples/arc_pie.html)
export const GraphPie =  (props) => {
    console.log("console.log(props) --- GraphPie")
    console.log(props)
    let point_list = []
    let other_sum = 0;
    for(var i = 0; i < props.meta_data.table.length; i++) {
      if (i >= 10){
        other_sum += props.meta_data.table[i].doc_count
        point_list[10] = {
          "name":"other",
          "y":other_sum
        }
      }
      else {
        point_list.push({
          "name":props.meta_data.table[i].key,
          "y":props.meta_data.table[i].doc_count
      })
      }
      
    } 
    props.meta_data.table.forEach((item) => {
      
    })
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
        title_label_text: props.title + " " + props.subtitle, 
        yAxis: { label_text: 'GDP', formatString: 'n' }, 
        // defaultPoint: { 
        //     label: { 
        //       text: '%name<br/><b>%percentOfTotal%</b>', 
        //       placement: 'outside', 
        //       style_fontSize: 14 
        //     }, 
        //     marker: { 
        //       visible: true, 
        //       size: 30, 
        //       fill: ['white', 0.9], 
        //       outline_width: 0 
        //     } 
        //   }, 
        series: [ 
          { 
            name: 'text messages', 
            points: point_list,
            // [ 
            //   { name: 'United States', y: 5452500 }, 
            //   { name: 'Canada', y: 786052 }, 
            //   { name: 'United Kingdom', y: 477338 }, 
            //   { name: 'Mexico', y: 155313 } 
            // ] 
          } 
        ] 
    };
    const divStyle = {
        maxWidth: props.graph_width,//'1000px',
        height: props.graph_height,
        margin: '0px auto'
    };
    


    return (
        <div>
           <div style={divStyle}><JSCharting options={config} /></div>
        </div>
    )
}