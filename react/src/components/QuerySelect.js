import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Context } from '../Provider';
import BarGraphControls from './BarGraphControls';
export default function QuerySelect() {
    const [state, dispatch] = React.useContext(Context);
    console.log("state.graph_controls")
    console.log(state.graph_controls)
    return (
        <>
            <FormControl component="fieldset">
            <FormLabel component="legend">Query Select</FormLabel>
            <RadioGroup
                aria-label="query select"
                defaultValue="Most Per"
                name="radio-buttons-group"
            >
                <FormControlLabel value="Most Per" control={<Radio />} label="Most Per" onClick={() => { 
                    dispatch({ type: "GRAPH_CONTROLS", payload: "MOST_PER"})
                    }} />
                <FormControlLabel value="Who hasn't posted" control={<Radio />} label="List topics user has posted in" onClick={() => {
                    dispatch({ type: "GRAPH_CONTROLS", payload: "WHO_HASNT_POSTED"})
                    }}/>
                <FormControlLabel value="Topic's user has not posted in" control={<Radio />} label="List topics user has not posted in" onClick={() => {
                    dispatch({ type: "GRAPH_CONTROLS", payload: "TOPICS_NOT_POSTED_IN"})
                    }}/>
                <FormControlLabel value="Replies [TODO]" control={<Radio />} label="Replies [TODO]" onClick={() => { 
                    dispatch({ type: "GRAPH_CONTROLS", payload: "REPLIES"})
                    }}/>
            </RadioGroup>
            </FormControl>
        </>
    );
}