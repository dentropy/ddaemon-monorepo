/*

* 

*/

import React from 'react';
import { DiscordContext } from './DiscordProvider'

export const DiscordRenderDataViz = () => {
    const [state, dispatch] = React.useContext(DiscordContext);


    React.useEffect(() => {
        async function doAsync (){
        }
        doAsync()
    }, [])

    return (
      <div overflow="auto">
        <h1>DiscordRenderDataViz</h1>
      </div>
    )
}