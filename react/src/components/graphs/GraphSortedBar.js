import React, { useState, useEffect } from 'react';
import { VegaLite } from 'react-vega'
export const GraphSortedBar =  (props) => {
    const spec = {
      width: props.graph_width,
      height: props.graph_height,
      mark: 'bar',
      encoding: {
          // key, doc_count
          x: { "title": props.x_title,   field: 'key', type: 'ordinal', "sort":"y"},
          y: { "title": props.y_title,   field: 'doc_count', type: 'quantitative'},
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
      }
    }


    return (
        <div>
            <VegaLite spec={spec} data={props.meta_data} view='svg'/>
        </div>
    )
}