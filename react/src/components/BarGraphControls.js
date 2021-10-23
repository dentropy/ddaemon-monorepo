import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Context } from '../Provider';
import { Box } from '@mui/system';
export default function BarGraphControls() {
  const [state, dispatch] = React.useContext(Context);
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
      let graph_controls = [];
      graph_controls.push()
      myData.aggregations.departments.buckets.forEach((thingy) => {
        graph_controls.push(
          <>
            <FormControlLabel value={thingy.key} control={<Radio />} label={thingy.key} 
              onClick={() => { dispatch({ type: "MOST", payload: thingy.key})}} />
          </>
        )
      })
      setGraphControls(graph_controls)
    }
    doAsync()
  }, [])
  return(
    <Box>
        <FormControl component="fieldset">
        <FormLabel component="legend">Most _____</FormLabel>
        <RadioGroup
          aria-label="most_blank"
          defaultValue="messages"
          name="radio-buttons-group"
        >
          {graphControls}
        </RadioGroup>
        <FormLabel component="legend">per _____</FormLabel>
        <RadioGroup
          aria-label="per <Blank>"
          defaultValue="user"
          name="radio-buttons-group"
        >
            <FormControlLabel value="user" control={<Radio />} label="User" 
              onClick={() => { dispatch({ type: "PER", payload: "msg.sender.username"})}} />
            <FormControlLabel value="topic" control={<Radio />} label="Topic" 
              onClick={() => { dispatch({ type: "PER", payload: "msg.channel.topic_name"})}} />
          </RadioGroup>
        </FormControl>
    </Box>
  )
}