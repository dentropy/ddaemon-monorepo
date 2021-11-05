import React, { useState, useEffect } from 'react';
import { Context } from '../../Provider';
import { GraphPie } from '../graphs/GraphPie';
import { QueryBuilder } from '../helper-functions/QueryBuilder';
export const KeybaseSetGraphPie =  (props) => {
    const [state, dispatch] = React.useContext(Context);
    const [graph, setGraph] = useState(<h1>Loading Graph</h1>)
    console.log("SETTING GRAPH")
    useEffect(() => {
      async function doAsync() {
        let formatted_data = await QueryBuilder({
          "per":props.per,
          "most":props.most,
          "graph_metadata":
            {  "team_selected":state.graph_metadata.team_selected,
               "team_list":state.graph_metadata.team_list,
               "user_selected":state.graph_metadata.user_selected
            }
        });
        if(formatted_data != false) {
          setGraph(
            <GraphPie 
              graph_width={props.graph_width} 
              graph_height={props.graph_height}
              most={props.most}
              per={props.per}
              team_selected={props.team_selected}
              meta_data={formatted_data}
              x_title="keybase username"
              y_title="Number of messages"
              title={ `Number of ${props.most}'s' per user`}
              subtitle={ `Across entire ${props.team_selected} team`}
              x_field="key"
              y_field="doc_count"
            />
          )
        } else {
          setGraph(<h1>Error fetching data</h1>)
        }
      }
      doAsync()
    }, [props]);

    return (
        <div>
          {graph}
        </div>
    )
}