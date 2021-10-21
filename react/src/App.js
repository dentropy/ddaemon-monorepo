import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import { RenderBasicGraph } from './components/RenderBasicGraph';
import { SelectFromList } from './components/SelectFromList';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Sidebar } from './components/Sidebar';
import { GraphMetadataContext } from './components/GraphMetadataContext';
import { RenderIntermediateGraph } from './components/RenderIntermediateGraph';
import { ElasticQuerier } from './components/ElasticQuerier';
import { Context } from './Provider';

function App() {
  const [context, setContext] = useState();
  const [interestingGraph, setInterestingGraph] = useState(<h1>Loading</h1>);
  const [state, dispatch] = useContext(Context);
  useEffect(() => {
    let default_context = {
      "teams":{ label: 'getting teams' },
      "most":"text",
      "per" :"msg.sender.username"
    }
    setContext(default_context)
    setInterestingGraph(<RenderIntermediateGraph hello="world" per={state.per} most={state.most} />)
    console.log("context")
    console.log(context)
    async function doAsync(){
      let myData = await (await fetch('/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          "index": "keybase-*",
          "query": {
            "query": {
                "bool": {
                    "must": [
                        {
                            "exists": {
                                "field": "msg.channel.name"
                            }
                        }
                    ]
                }
            },
            "aggs": {
                "departments": {
                    "terms": {
                        "field": "msg.channel.name"
                    }
                }
            },
          "size": 0
        }
        })
      })).json()
      console.log("Getting teams")
      let formatted_data = {'teams':[]}
      console.log("MYDATA")
      console.log(myData.aggregations.departments.buckets)
      console.log(Object.keys(myData.aggregations))
      myData.aggregations.departments.buckets.forEach((thingy) => {
        let tmp_thingy = thingy;
        thingy.label = tmp_thingy.key;
        delete thingy.key;
        console.log(thingy)
        formatted_data.teams.push(tmp_thingy)
      })
      console.log(formatted_data)
    }
    doAsync()
  }, [])
  function renderNewGraph() {
    if (context == undefined){
      setInterestingGraph(<h1>Error wrong input data</h1>)
    }
    else {
      setInterestingGraph(<RenderIntermediateGraph hello="world" per={state.per} most={state.most} />)
    }
  }
  // "msg.channel.topic_name.keyword" // "msg.content.type" // msg.sender.username
  return (
    <div className="App">
      <GraphMetadataContext.Provider value={[context, setContext]}>
      <Box sx={{ width: 1 }}>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
              <Box gridColumn="span 2">
                <Sidebar />
              </Box>
              <Box gridColumn="span 10">
                <button onClick={() => {console.log(state)}}>print state</button>
                <button onClick={() => {renderNewGraph()}}>Render new graph</button>
                {interestingGraph}
              </Box>
          </Box>
      </Box>
      </GraphMetadataContext.Provider>
    </div>
  );
}

export default App;
