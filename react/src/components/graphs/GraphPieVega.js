import React, { useState, useEffect } from 'react';
import { VegaLite } from 'react-vega'
// [Pie Chart | Vega-Lite](https://vega.github.io/vega-lite/examples/arc_pie.html)
export const GraphPie =  (props) => {
    let nominal_list = []
    for(let i = 0; i < props.y_field; i++){
        nominal_list.push(i)
    }
    const spec = {
      //"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      width: props.graph_width,
      height: props.graph_height,
      mark: 'arc',
    //   encoding: {
    //       // key, doc_count
    //       x: { "title": props.x_title,   field: props.x_field, type: 'ordinal', "sort":"y"},
    //       y: { "title": props.y_title,   field: props.y_field, type: 'quantitative'},
    //   },
      "encoding": {
        "theta": {"field": props.y_field, "type": "quantitative", sort:"descending"},
        "color": {"field": props.x_field, "type": "nominal"}
      },
      data: { name: 'table' }, // note: vega-lite data attribute is a plain object instead of an array
      "title": {
        "text": props.title,
        "subtitle": props.subtitle,
        "encode": {
          "title": {
            "enter": {
              "fill": {"value": "purple"}
            }
          },
          "subtitle": {
            "interactive": true,
            "update": {
              "fontStyle": {"value": "italic"}
            },
            "hover": {
              "fontStyle": {"value": "normal"}
            }
          }
        }
      },
      "layer": [{
        "mark": {"type": "arc", "outerRadius": 300}
      }, {
        "mark": {"type": "text", "radius":320,fontSize:34},
        "encoding": {
          "text": {"field": props.x_field, "type": "nominal"}
        }
      }]
    }


    return (
        <div>
            <VegaLite spec={spec} data={props.meta_data} view='svg'/>
        </div>
    )
}