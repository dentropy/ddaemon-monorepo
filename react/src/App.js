import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { VegaLite } from 'react-vega'

import logo from './logo.svg';
import './App.css';
//import { ElasticConnect } from './components/ElasticConnect';
function App() {
  //ElasticConnect()
  const [data, setData] = useState(null);
  useEffect(() => {
    async function doAsync() {
      let myData = await (await fetch('/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          "index": "dentropydaemon-keybase",
          "query": {
            "query": {
              "bool": {
                "must": [{
                  "exists": {
                    "field": "msg.content.type"
                  }
                }]
              }
            },
            "aggs": {
              "keys": {
                "terms": {
                  "field": "msg.content.type"
                }
              }
            },
            "size": 0

          }
        })
      })).json()
      setData(myData);
      console.log(myData)
    }
    doAsync()
    // console.log("Response")
    // console.log((await response.json()));
  }, []);
  const spec = {
    width: 400,
    height: 200,
    mark: 'bar',
    encoding: {
      x: { field: 'a', type: 'ordinal' },
      y: { field: 'b', type: 'quantitative' },
    },
    data: { name: 'table' }, // note: vega-lite data attribute is a plain object instead of an array
  }
  
  const barData = {
    table: [
      { a: 'A', b: 28 },
      { a: 'B', b: 55 },
      { a: 'C', b: 43 },
      { a: 'D', b: 91 },
      { a: 'E', b: 81 },
      { a: 'F', b: 53 },
      { a: 'G', b: 19 },
      { a: 'H', b: 87 },
      { a: 'I', b: 52 },
    ],
  }

  return (
    <div className="App">
      <VegaLite spec={spec} data={barData} />,
    </div>
  );
}

export default App;
