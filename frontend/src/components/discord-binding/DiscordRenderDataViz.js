/*

* 

*/

import React from 'react';
import { DiscordContext } from './DiscordProvider'
import { DiscordDataVizMessageFrequency } from './DiscordDataVizMessageFrequency'
import { DiscordDataVizMostPer } from './DiscordDataVizMostPer'

export const DiscordRenderDataViz = () => {
    const [state, dispatch] = React.useContext(DiscordContext);
    const [dataViz, setDataViz] = React.useState(<h1>Loading</h1>);

    React.useEffect(() => {
        async function doAsync (){
        }
        doAsync()
    }, [])

    React.useEffect(() => {
      renderGraph()
      dispatch({
        type: 'DISCORD_RENDER_VIZ',
        payload: false
      })
    }, [state.DISCORD_RENDER_VIZ])


    const renderGraph = () => {
      switch(state.discord_data_viz_controls) {
        case 'ACTIVITY_PER_TIME':
          return setDataViz(
            <>
              <DiscordDataVizMessageFrequency />
            </>
          );
        case 'MOST_PER':
          return setDataViz(
            <>
              <DiscordDataVizMostPer />
            </>
          );
        case 'GENERAL_SEARCH':
          return setDataViz(
            <>
              <h1>GENERAL_SEARCH</h1>
            </>
          );
        case 'LIST_CREATOR':
          return setDataViz(
            <>
              <h1>LIST_CREATOR</h1>
            </>
          );
        default:
          return setDataViz(
              <h1>renderGraph Error</h1>
          );
      }
    }

    return (
        <>
            {dataViz}
        </>
    )
}