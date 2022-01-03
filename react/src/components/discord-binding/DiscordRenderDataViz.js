/*

* 

*/

import React from 'react';
import { DiscordContext } from './DiscordProvider'
import { DiscordDataVizMessageFrequency } from './DiscordDataVizMessageFrequency'
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
        type: 'RENDER_VIZ',
        payload: false
      })
    }, [state.RENDER_VIZ])


    const renderGraph = () => {
      switch(state.discord_data_viz_controls) {
        case 'ACTIVITY_PER_TIME':
          return setDataViz(
            <>
            <p>ACTIVITY_PER_TIME</p>
            <DiscordDataVizMessageFrequency />
            </>
          );
        case 'MOST_PER_GRAPH_PIE':
          return setDataViz(
            <>
            <p>MOST_PER_GRAPH_PIE</p>
            </>
          );
        default:
          console.log("state.discord_data_viz_controls")
          console.log(state.discord_data_viz_controls)
          return setDataViz(
              <h1>renderGraph Error</h1>
          );
          //return 'foo';
      }
    }

    return (
      <div overflow="auto">
        {dataViz}
      </div>
    )
}