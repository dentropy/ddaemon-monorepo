/*
* Requirements
  * Specify binding
  * Match list of strings from fiend
    * Select from multiple teams
    * Select from multiple users
    * Select form multiple channel's
  * General tech search in specific field
  * Specify aggregation field
{
    "binding":"keybase",
    "Match": {
        "field":["item1", "item2"]
    }
    "agg":"fieldname"
}

This does not need to exist... yet but I am leaving the idea here
*/
import { CheckElasticResponse } from './CheckElasticResponse';
export function QueryBuilder(query_settings) {
    async function doAsync(){
        let team_name = query_settings.graph_metadata.team_selected
        if (!query_settings.graph_metadata.team_list.includes(query_settings.graph_metadata.team_selected) && query_settings.graph_metadata.team_selected != "*") {
        team_name = "complexweekend.oct2020"
        }
        // console.log("team_name")
        // console.log(team_name)
        // TODO set oct2020 value for the forum
        // "msg.channel.topic_name.keyword" // "msg.content.type" // msg.sender.username
        let body_query = ({
            "index": "keybase-*",
            "query": {
                "query": {
                "bool": {
                    "must": [
                    {
                        "exists": {
                        "field": query_settings.per
                        },
                    },
                    { 
                        "match": {
                        'msg.content.type' : {"query": query_settings.most}
                        }  
                    },
                    { 
                        "match": {
                        "msg.channel.name": {"query": query_settings.graph_metadata.team_selected}
                        }
                    }
                    ]
                }
                },
                "aggs": {
                "keys": {
                    "terms": {
                    "field": query_settings.per,
                    "size": 100
                    }
                }
                }
            }
        })
        // console.log("query_settings")
        // console.log(query_settings)
        // console.log(body_query)
        if (query_settings.graph_metadata.team_selected == "*") {
            console.log(body_query.query.query.bool.must.pop())
        }
        let myData = await (await fetch('/query', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body_query)
        })).json()
        // console.log("formatted_data1")
        // console.log(myData)
        // console.log(CheckElasticResponse(myData))
        //console.log(formatted_data)
        console.log(CheckElasticResponse(myData))
        if(CheckElasticResponse(myData)) {
            let formatted_data = {'table':[]}
            // console.log("myData.aggregations.keys.buckets")
            // console.log(myData.aggregations.keys.buckets)
            myData.aggregations.keys.buckets.forEach((thingy) => {
              formatted_data.table.push(thingy)
            })
            return formatted_data
        }
        else {
            return false
        }
    }
    return doAsync()
}