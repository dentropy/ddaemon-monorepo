import React, { useState, useEffect } from 'react';
import { VegaLite } from 'react-vega'
import { Context } from '../../Provider';
export const BarGraphRender =  (props) => {
    const [data, setData] = useState({
        table: [
          { a: 'A', b: 28, key:'loading', doc_count: 420 }
        ],
    });
    const [state, dispatch] = React.useContext(Context);
    console.log("state.metadata")
    console.log(props.meta_data)
    const [graph, setGraph] = useState(<h1>Loading</h1>); // TODO
    // console.log("mah_context")
    // console.log(props.mah_context)

    const spec = {
      width: props.graph_width,
      height: props.graph_height,
      mark: 'bar',
      encoding: {
          // key, doc_count
          x: { "title": "keybase username",   field: 'key', type: 'ordinal', "sort":"y"},
          y: { "title": "Number of messages", field: 'doc_count', type: 'quantitative'},
      },
      data: { name: 'table' }, // note: vega-lite data attribute is a plain object instead of an array
      "title": {
        "text": `Number of ${props.most}'s' per user`,
        "subtitle": "Across entire dentropydaemon team",
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
    

    const barData = {
      table: [
          { key: 'A', doc_count: 28 },
          { key: 'B', doc_count: 55 },
          { key: 'C', doc_count: 43 },
          { key: 'D', doc_count: 91 },
          { key: 'E', doc_count: 81 },
          { key: 'F', doc_count: 53 },
          { key: 'G', doc_count: 19 },
          { key: 'H', doc_count: 87 },
          { key: 'I', doc_count: 52 },
      ],
    }


    return (
        <div>
            <VegaLite spec={spec} data={props.meta_data} view='svg'/>
        </div>
    )
}