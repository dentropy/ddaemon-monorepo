import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import KeybaseProvider, { KeybaseContext } from './KeybaseProvider'
import { KeybaseReducer  } from './KeybaseReducer'
export default function KeybaseQuerySelect() {
    // const [state, dispatch] = React.useContext(Context);
    const [state, dispatch] = React.useContext(KeybaseContext);

    console.log("state.graph_controls")
    console.log(state.graph_controls)
    return (
        <>
            <FormControl component="fieldset">
            <FormLabel component="legend">Query Select</FormLabel>
            <RadioGroup
                aria-label="query select"
                defaultValue="Most Per ______"
                name="radio-buttons-group"
            >
                <FormControlLabel 
                  value="Most Per ______"
                  label="Most Per _____"  
                  control={<Radio />} 
                  onClick={() => { 
                    dispatch({ type: "GRAPH_CONTROLS", payload: "MOST_PER_GRAPH_BAR"})
                    }} 
                />
                <FormControlLabel 
                  value="General Search Query"
                  label="General Search Query"
                  control={<Radio />}  
                  onClick={() => { 
                    dispatch({ type: "GRAPH_CONTROLS", payload: "KeybaseControlsGeneralSearch"})
                    }}
                />
                {/*START List*/}
                <FormControlLabel 
                  value="List Messages Reacted To Most In Topic"
                  label="List Messages Reacted To Most In Topic"
                  control={<Radio />} 
                  onClick={() => { 
                    dispatch({ type: "GRAPH_CONTROLS", payload: "KeybaseListMessagesReactedToMostInTopic"})
                  }}
                />



                <FormControlLabel 
                  value="List Messages Reacted To Most In Topic"
                  label="List Messages Reacted To Most In Topic"
                  control={<Radio />} 
                  onClick={() => { 
                    dispatch({ type: "GRAPH_CONTROLS", payload: "KeybaseListMessagesReactedToMostInTopic"})
                  }}
                />
                <FormControlLabel 
                  value="Topic's user has not posted in"
                  label="List topics user has not posted in"
                  control={<Radio />} 
                  onClick={() => {
                    dispatch({ type: "GRAPH_CONTROLS", payload: "TOPICS_NOT_POSTED_IN"})
                    }}
                />
                <FormControlLabel 
                  value="Who hasn't posted"
                  label="List topics user has posted in"
                  control={<Radio />} 
                  onClick={() => {
                    dispatch({ type: "GRAPH_CONTROLS", payload: "WHO_HASNT_POSTED"})
                    }}
                />
                <FormControlLabel 
                  value="KeybaseListUserThatHasPostedInTopic"
                  label="List users that has posted in topic"
                  control={<Radio />} 
                  onClick={() => { 
                    dispatch({ type: "GRAPH_CONTROLS", payload: "KeybaseListUserThatHasPostedInTopic"})
                    }}
                />
                <FormControlLabel 
                  value="ListUserThatHasNotPostedInTopic"
                  label="List users that has not posted in topic"
                  control={<Radio />} 
                  onClick={() => { 
                    dispatch({ type: "GRAPH_CONTROLS", payload: "ListUserThatHasNotPostedInTopic"})
                    }}
                />
                {/*END List*/}
                <FormControlLabel 
                  value="Replies [TODO]"
                  label="Replies [TODO]"  
                  control={<Radio />} 
                  onClick={() => { 
                    dispatch({ type: "GRAPH_CONTROLS", payload: "REPLIES"})
                    }}
                />
            </RadioGroup>
            </FormControl>
        </>
    );
}