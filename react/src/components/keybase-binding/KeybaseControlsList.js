import React, {useContext, useEffect } from 'react';
import KeybaseProvider, { KeybaseContext } from './KeybaseProvider'
export const KeybaseControlsList =  () => {
    const [state, dispatch] = useContext(KeybaseContext);

    useEffect(() => {
      async function doAsync(){
        console.log("KeybaseControlsList useEffect")
      }
      doAsync()
    }, [])
    return (
      <>
        <p>KeybaseControlsList</p>
      </>
    )
}
