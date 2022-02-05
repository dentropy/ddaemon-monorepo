import React, { useState, useEffect } from 'react';
import { Context } from '../../Provider';
import { GraphSortedBar } from '../graphs/GraphSortedBar';
import { QueryBuilder } from '../helper-functions/QueryBuilder';
import KeybaseProvider, { KeybaseContext } from './KeybaseProvider'
import { KeybaseReducer  } from './KeybaseReducer'

export const KeybaseSetGraphBar =  (props) => {
    // const [state, dispatch] = React.useContext(Context);
    const [state, dispatch] = React.useContext(KeybaseContext);
    
    const [graph, setGraph] = useState(<h1>Loading Graph</h1>)
    console.log("SETTING GRAPH")
    useEffect(() => {
      async function doAsync() {
        console.log("useEffect")

        // ####QUERY BUILDER GOES HERE
        
        
        // console.log(body_query)
        // console.log("console.log(myData)")
        // console.log(myData)
        // console.log('"hits" in myData')
        // console.log("hits" in myData)
        // console.log("KeybaseSetGraphBar")
        // console.log(CheckElasticResponse(myData))
        let base_query = {
          "basic_aggs":props.per,
          "most":props.most,
          "team_selected":state.graph_metadata.team_selected,
          "team_list":state.graph_metadata.team_list
        }
        if (props.per == "USER") {
          base_query.user_selected = state.graph_metadata.user_selected
          base_query.basic_aggs = "msg.channel.topic_name"
        }
        if (props.per == "TOPIC") {
          base_query.topic_selected = state.graph_metadata.topic_selected
          base_query.basic_aggs = "msg.sender.username"
        }
        let formatted_data = await QueryBuilder(base_query);
        console.log("formatted_data2")
        console.log(formatted_data)
        //dispatch({ type: "GRAPH_METADATA", payload: formatted_data})
        console.log("Render intermediate graph")
        if(formatted_data != false){
          // console.log("formatted_data")
          // console.log(formatted_data)
          // //dispatch({ type: "GRAPH_METADATA", payload: formatted_data})
          // console.log("Render intermediate graph")
          setGraph(
            <GraphSortedBar 
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
          setGraph(<h1>KeybaseSetGraphBar: Error fetching data</h1>)
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