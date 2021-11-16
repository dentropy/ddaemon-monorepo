import React, {useContext, useRef } from 'react';
import TextField from '@mui/material/TextField';
import KeybaseProvider, { KeybaseContext } from './KeybaseProvider'
export const KeybaseControlsGeneralSearch =  () => {
    const [state, dispatch] = useContext(KeybaseContext);
    const inputEl = useRef();
    function set_search_string(input) {
      console.log(input)
      dispatch({
        type: "GENERAL_SEARCH_PHRASE",
        payload: input
      })
    }
    return (
      <>
        <TextField 
          id="KeybaseControlsGeneralSearchTextField" 
          ref={inputEl}
          onChange={event => set_search_string(event.target.value)}
          label="General Search"
          variant="outlined"
          sx={{ 
            width: window.innerWidth / 12 * 2 - 54,
            position: 'relative',
            margin: 0.2,
            backgroundColor: 'white',
            opacity: 0.8
          }}
        />
      </>
    )
}
