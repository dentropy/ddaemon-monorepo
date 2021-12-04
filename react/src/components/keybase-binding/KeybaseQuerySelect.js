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

    console.log("state.data_viz_controls")
    console.log(state.data_viz_controls)
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
                <FormControlLabel 
                  value="List Creator"
                  label="List Creator"
                  control={<Radio />}  
                  onClick={() => { 
                    dispatch({ type: "GRAPH_CONTROLS", payload: "KeybaseControlsList"})
                    }}
                />
            </RadioGroup>
            </FormControl>
        </>
    );
}