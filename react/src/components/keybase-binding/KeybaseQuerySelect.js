import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Context } from '../../Provider';
export default function KeybaseQuerySelect() {
    const [state, dispatch] = React.useContext(Context);
    console.log("state.graph_controls")
    console.log(state.graph_controls)
    return (
        <>
            <FormControl component="fieldset">
            <FormLabel component="legend">Query Select</FormLabel>
            <RadioGroup
                aria-label="query select"
                defaultValue="Most Per bar graph"
                name="radio-buttons-group"
            >
                <FormControlLabel value="Most Per bar graph" control={<Radio />} label="Most Per bar graph" onClick={() => { 
                    dispatch({ type: "GRAPH_CONTROLS", payload: "MOST_PER_GRAPH_BAR"})
                    }} />
                <FormControlLabel value="Most Per pie chart" control={<Radio />} label="Most Per pie chart" onClick={() => { 
                    dispatch({ type: "GRAPH_CONTROLS", payload: "MOST_PER_GRAPH_PIE"})
                    }} />
                <FormControlLabel value="Who hasn't posted" control={<Radio />} label="List topics user has posted in" onClick={() => {
                    dispatch({ type: "GRAPH_CONTROLS", payload: "WHO_HASNT_POSTED"})
                    }}/>
                <FormControlLabel value="Topic's user has not posted in" control={<Radio />} label="List topics user has not posted in" onClick={() => {
                    dispatch({ type: "GRAPH_CONTROLS", payload: "TOPICS_NOT_POSTED_IN"})
                    }}/>
                <FormControlLabel value="KeybaseListUserThatHasPostedInTopic" control={<Radio />} label="List users that has posted in topic" onClick={() => { 
                    dispatch({ type: "GRAPH_CONTROLS", payload: "KeybaseListUserThatHasPostedInTopic"})
                    }}/>
                <FormControlLabel value="ListUserThatHasNotPostedInTopic" control={<Radio />} label="List users that has not posted in topic" onClick={() => { 
                    dispatch({ type: "GRAPH_CONTROLS", payload: "ListUserThatHasNotPostedInTopic"})
                    }}/>
                <FormControlLabel value="UserMessagesAcrossTeam" control={<Radio />} label="Graph number of text messages from user across team" onClick={() => { 
                    dispatch({ type: "GRAPH_CONTROLS", payload: "UserMessagesAcrossTeam"})
                    }}/> {/*I Can select any message type this is going to need to use the right sidebar*/}
                <FormControlLabel value="Replies [TODO]" control={<Radio />} label="Replies [TODO]" onClick={() => { 
                    dispatch({ type: "GRAPH_CONTROLS", payload: "REPLIES"})
                    }}/>
            </RadioGroup>
            </FormControl>
        </>
    );
}