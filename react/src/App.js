import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import { Sidebar } from './components/Sidebar';
import { RenderIntermediateGraph } from './components/RenderIntermediateGraph';
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
    setInterestingGraph(<RenderIntermediateGraph graph_height="400" graph_width="900" hello="world" per={state.per} most={state.most} />)
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
      console.log(formatted_data.teams)
      dispatch({
        type: 'TEAMS_UPDATE',
        payload: formatted_data.teams,
      });
    }
    doAsync()
  }, [])
  function renderNewGraph() {
    if (context == undefined){
      setInterestingGraph(<h1>Error wrong input data</h1>)
    }
    else {
      setInterestingGraph(<RenderIntermediateGraph graph_height="400" graph_width="900" per={state.per} most={state.most} />)
    }
  }
  // "msg.channel.topic_name.keyword" // "msg.content.type" // msg.sender.username
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
