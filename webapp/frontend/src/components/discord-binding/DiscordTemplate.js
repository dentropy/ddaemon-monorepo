import React from 'react';
import { DiscordContext } from './DiscordProvider'

export const DiscordSidebarLeft = () => {
    const [state, dispatch] = React.useContext(DiscordContext);


    React.useEffect(() => {
        async function doAsync (){
        }
        doAsync()
    }, [])

    return (
      <div overflow="auto">
        <h1>Template</h1>
      </div>
    )
}