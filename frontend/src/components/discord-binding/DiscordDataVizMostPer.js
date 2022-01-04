import React from 'react';
import { DiscordContext } from './DiscordProvider'
import { DiscordDataVizMostPerSidebar } from './DiscordDataVizMostPerSidebar'
import { discord_backend_api } from './DiscordBackend'
import { Box } from '@mui/system';

export const DiscordDataVizMostPer = () => {
    const [state, dispatch] = React.useContext(DiscordContext);

    React.useEffect(() => {
        async function doAsync (){
        }
        doAsync()
    }, [])

    return (
      <>
      <Box gridColumn="span 8">
      <h1>Placeholder for Graph</h1>
      </Box>
      <Box gridColumn="span 2" height={window.innerHeight - 115} overflow="auto">
        <DiscordDataVizMostPerSidebar />
      </Box>
    </>
    )
}