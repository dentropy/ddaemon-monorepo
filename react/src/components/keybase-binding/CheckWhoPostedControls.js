import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Context } from '../../Provider';
import { Box } from '@mui/system';
export default function CheckWhoPostedControls() {
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
                        },
                        {
                            "match": {
                                "msg.channel.name": {"query": state.team_selected}
                            }
                        }
                    ]
                }
            },
            "aggs": {
                "departments": {
                    "terms": {
                        "field": "msg.sender.username",
                        "size":100,
                        "order": { "_key": "asc" }
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
            <FormControlLabel key={thingy.key} value={thingy.key} control={<Radio />} label={thingy.key} 
              onClick={() => { dispatch({ type: "KEYBASE_USER_SELECT", payload: thingy.key})}} />
          </>
        )
      })
      setGraphControls(graph_controls)
    }
    doAsync()
  }, [state])
  return(
    <Box>
        <FormControl component="fieldset">
        <FormLabel component="legend">Users</FormLabel>
        <RadioGroup
          aria-label="most_blank"
          defaultValue="text"
          name="radio-buttons-group"
        >
          {graphControls}
        </RadioGroup>
        </FormControl>
    </Box>
  )
}