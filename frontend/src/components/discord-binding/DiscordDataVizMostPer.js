import React from 'react';
import { DiscordContext } from './DiscordProvider'
import { DiscordDataVizMostPerSidebar } from './DiscordDataVizMostPerSidebar'

export const DiscordDataVizMostPer = () => {
    const [state, dispatch] = React.useContext(DiscordContext);


    React.useEffect(() => {
        async function doAsync (){
        }
        doAsync()
    }, [])

    return (
      <div overflow="auto">
        <h1>MOST PER</h1>
      </div>
    )
}