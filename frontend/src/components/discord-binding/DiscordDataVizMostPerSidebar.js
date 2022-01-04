import React from 'react';
import { DiscordContext } from './DiscordProvider'

export const DiscordDataVizMostPerSidebar = () => {
    const [state, dispatch] = React.useContext(DiscordContext);


    React.useEffect(() => {
        async function doAsync (){
        }
        doAsync()
    }, [])

    return (
      <div overflow="auto">
        <h1>MOST PER SIDEBAR</h1>
      </div>
    )
}