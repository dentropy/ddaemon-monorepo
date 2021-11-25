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
        console.log("query_settings")
        console.log(query_settings)
        let per_setting = "text"
        if (query_settings.per != "USER"){
            per_setting = query_settings.per
        }
        let team_name = query_settings.team_selected
        // if (!query_settings.team_list.includes(query_settings.team_selected) && query_settings.team_selected != "*") {
        //     team_name = "dentropydaemon"
        // }
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
                        ]
                    }
                }
            }
        })
        if ("team_selected" in query_settings){
            body_query.query.query.bool.must.push({ 
                "match": {
                    "msg.channel.name": {"query": query_settings.team_selected}
                }
            })
        }
        if ("most" in query_settings){
            body_query.query.query.bool.must.push(                    { 
                "match": {
                    "msg.content.type" : {"query": query_settings.most}
                }
            })
        } 
        if ("user_selected" in query_settings){
            body_query.query.query.bool.must.push(                    { 
                "match": {
                    "msg.sender.username" : {"query": query_settings.user_selected}
                }
            })
        }
        if ("topic_selected" in query_settings){
            body_query.query.query.bool.must.push(                    { 
                "match": {
                    "msg.channel.topic_name" : {"query": query_settings.topic_selected}
                }
            })
        }
        if ("basic_aggs" in query_settings){
            body_query.query.aggs = {
                "keys": {
                    "terms": {
                        "field": query_settings.basic_aggs,
                        "size": 100
                    }
                }
            }
        }
        if ("advanced_aggs" in query_settings){
            console.log("advanced_aggs")
            body_query.query.aggs = query_settings.advanced_aggs
            console.log("body_query")
        }
        if (query_settings.team_selected == "*") {
            console.log(body_query.query.query.bool.must.pop())
        }
        let myData = await (await fetch('/query', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body_query)
        })).json()
        console.log("body_query")
        console.log(body_query)
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