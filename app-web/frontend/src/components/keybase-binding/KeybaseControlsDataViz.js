import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box } from '@mui/system';
import { CheckElasticResponse } from '../helper-functions/CheckElasticResponse';
import KeybaseProvider, { KeybaseContext } from './KeybaseProvider'
export default function KeybaseControlsDataViz() {
  const [state, dispatch] = React.useContext(KeybaseContext);
  const [graphControls, setGraphControls] = React.useState(<h1>Loading Graph Controls</h1>)


  React.useEffect(() => {
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
                                "field": "msg.content.type"
                            }
                        }
                    ]
                }
            },
            "aggs": {
                "departments": {
                    "terms": {
                        "field": "msg.content.type"
                    }
                }
            },
          "size": 0
          }
        })
      })).json()
      if(CheckElasticResponse(myData)){ 
          let data_viz_controls = [];
          data_viz_controls.push()
          myData.aggregations.departments.buckets.forEach((thingy) => {
            data_viz_controls.push(
              <>
                <FormControlLabel value={thingy.key} control={<Radio />} label={thingy.key} 
                  onClick={() => { dispatch({ type: "MOST", payload: thingy.key})}} />
              </>
            )
          })
          setGraphControls(data_viz_controls)
      } else {
        console.log("KeybaseControlsDataViz else")
      }
    }
    doAsync()
  }, [])
  return(
    <Box>
        <FormControl component="fieldset">
        <FormLabel component="legend">Graph type</FormLabel>
        <RadioGroup
          aria-label="Graph type"
          defaultValue="bar graph"
          name="radio-buttons-group"
        >
            <FormControlLabel value="bar graph" control={<Radio />} label="Bar Graph" 
              onClick={() => { dispatch({ type: "GRAPH_CONTROLS", payload: "MOST_PER_GRAPH_BAR"}) }} />
            <FormControlLabel value="pie chart" control={<Radio />} label="Pie Chart" 
              onClick={() => { dispatch({ type: "GRAPH_CONTROLS", payload: "MOST_PER_GRAPH_PIE"})  }} />
          </RadioGroup>
        <FormLabel component="legend">Most _____</FormLabel>
        <RadioGroup
          aria-label="most_blank"
          defaultValue="text"
          name="radio-buttons-group"
        >
          {graphControls}
        </RadioGroup>
        <FormLabel component="legend">per _____</FormLabel>
        <RadioGroup
          aria-label="per <Blank>"
          defaultValue="users"
          name="radio-buttons-group"
        >
            <FormControlLabel value="users" control={<Radio />} label="Users" 
              onClick={() => { dispatch({ type: "PER", payload: "msg.sender.username"})}} />
            <FormControlLabel value="topics" control={<Radio />} label="Topics" 
              onClick={() => { dispatch({ type: "PER", payload: "msg.channel.topic_name"})}} />
            <FormControlLabel value="user" control={<Radio />} label="Specific user" 
              onClick={() => { dispatch({ type: "PER", payload: "USER"})}} />
            <FormControlLabel value="topic" control={<Radio />} label="Specific Topic" 
              onClick={() => { dispatch({ type: "PER", payload: "TOPIC"})}} />
          </RadioGroup>
        </FormControl>
    </Box>
  )
}