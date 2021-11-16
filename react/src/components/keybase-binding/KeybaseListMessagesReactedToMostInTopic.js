/*

* Get a list of all the channel's on the team
* Get a list of all channel's with a message from a user
* Compare the two lists
  * Put channel's someone has not posted in one new list
* Print the two lists



* Requirements
  * Graph name: KeybaseListMessagesReactedToMostInTopic
  * Graph ID:   KeybaseListMessagesReactedToMostInTopic
* Add component to App.js
* Add graph radio button to QuerySelect.js
* Add to switch statement in App.js
* Automatically select Topic and Team in the left sidebar
*/

import React, { useState, useEffect } from 'react';
import { Context } from '../../Provider';
import DataGrid from 'react-data-grid';
import { CheckElasticResponse } from '../helper-functions/CheckElasticResponse';
import KeybaseProvider, { KeybaseContext } from './KeybaseProvider'
import { KeybaseReducer  } from './KeybaseReducer'

export const KeybaseListMessagesReactedToMostInTopic =  (props) => {
    // const [state, dispatch] = React.useContext(Context);
    const [state, dispatch] = React.useContext(KeybaseContext);
    
    const [graph, setGraph] = useState(<h1>Loading</h1>); // TODO
    useEffect(() => {
      async function doAsync() {
        console.log("useEffect")
        let team_name = state.team_selected
        if (!state.graph_metadata.team_list.includes(state.team_selected) && state.team_selected != "*") {
          team_name = "complexweekend.oct2020"
        }
        console.log("team_name")
        console.log(team_name)
        let body_query = ({
          "index": "keybase-*",
          "query": {
            "query": {
              "bool": {
                "must": [
                  {
                    "match": {
                      "msg.channel.name": {
                        "query": state.graph_metadata.team_selected
                      }
                    }
                  },
                  {
                    "match": {
                      "msg.content.type": {
                        "query": "reaction"
                      }
                    }
                  },
                  {
                    "match": {
                      "msg.channel.topic_name": {
                        "query": state.graph_metadata.topic_selected
                      }
                    }
                  }
                ]
              }
            },
            "aggs": {
              "departments": {
                "terms": {
                  "field": "msg.content.reaction.m",
                  "size": 100,
                  "order": {
                    "_key": "asc"
                  }
                }
              }
            },
            "size": 0
        }
        })
        // TODO TEAM QUERY MANAGEMENT
        let myData = await (await fetch('/query', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(body_query)
        })).json()
        console.log("console.log(myData)")
        console.log(myData)
        let test_data = myData;
        // IDK why this has to exist but otherwise the code in the if statement executes before myData is declared
        // console.log("myData.aggregations.departments.buckets") // {list} .key
        // console.log(myData.aggregations.departments.buckets)
        if(CheckElasticResponse(myData) === true){
            // Get all the values
            let preprocess_list = []
            let values_list = []
            for (const [key, value] of Object.entries(test_data.aggregations.departments.buckets)) {
                //console.log(`${key}: ${Object.keys(value)} ${(value.key)} ${(value.doc_count)}`);
                preprocess_list.push(value)
                values_list.push(value.doc_count)
            }

            // Sort them
            values_list.sort()
            // console.log(values_list)

            // Go through the values and the list recursively removing 
            values_list = values_list.filter(function(elem, pos) {
            return values_list.indexOf(elem) == pos;
            })
            //console.log(values_list)

            // from the list each value and adding it to the other list
            let result_list = []
            for(var i = 0; i < values_list.length; i++){
            for(var j = 0; j < preprocess_list.length; j++){
                //console.log(preprocess_list[j])
                if(preprocess_list[j].doc_count == values_list[i]){
                result_list.push(preprocess_list[j])
                }
            }
            }
            result_list.splice(0, result_list.length - 10);
            result_list.reverse()

            // Get the keys
            let the_keys = []
            result_list.forEach((key) => {
                the_keys.push(key.key)
            })
            console.log("the_keys")
            console.log(the_keys)

// ######################################
            let body_query2 = ({
                "index": "keybase-*",
                "query": {
                  "query": {
                    "bool": {
                      "must": [
                        {
                          "match": {
                            "msg.channel.name": {
                              "query": state.graph_metadata.team_selected
                            }
                          }
                        },
                        {
                          "match": {
                            "msg.channel.topic_name": {
                              "query": state.graph_metadata.topic_selected
                            }
                          }
                        },
                        {"terms": 
                            {
                            "msg.id" : the_keys
                            }
                        } 
                      ]
                        }
                      
                    }
                  },
                  "size": 10
              })
              console.log("body_query2")
              console.log(body_query2)
              // TODO TEAM QUERY MANAGEMENT
              let myData = await (await fetch('/query', {
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body_query2)
              })).json()

// ######################################
            let rendered_data = [];
            let mah_data = [];
            const columns = [
              { key: 'id', name: 'ID' },
              { key: 'username', name: 'username'}
            ]
            let full_team_list = []
            let user_team_list = []
            state.graph_metadata.topic_list.forEach((thingy) => {
              full_team_list.push(thingy.label)
            })
            test_data.aggregations.departments.buckets.forEach((thingy) => {
              user_team_list.push(thingy.key)
            })
            // console.log("user_team_list")
            // console.log(user_team_list)
            // console.log("full_team_list")
            // console.log(full_team_list)
            for (var i = 0; i < full_team_list.length; i++){
              console.log("full_team_list")
              if (full_team_list.indexOf(user_team_list[i]) != -1) {
                mah_data.push({
                  id: mah_data.length,
                  username: full_team_list[i]
                })
                rendered_data.push(
                    <>
                        <p>{full_team_list[i]}</p>
                    </>
                )
              }
            }
            setGraph(
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={mah_data}
                  columns={columns}
                />
              </div>
            )
        }  else  {
            console.log("KeybaseListTopicsUserHasNotPostedInRender else")
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