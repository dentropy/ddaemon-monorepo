import React, {useContext, useEffect } from 'react';
import KeybaseProvider, { KeybaseContext } from './KeybaseProvider'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { QueryBuilder } from '../helper-functions/QueryBuilder';
import { Grid } from "gridjs-react";

export const KeybaseControlsList =  () => {
    const [state, dispatch] = useContext(KeybaseContext);


    async function KeybaseListAllUsersWithTheTeamsTheyAreOn(){
      let base_query = {
        "advanced_aggs": {
            "topics": {
                "terms": {
                    "field": "msg.sender.username",
                    "size": 250
                },
                "aggs" : {
                  "teams": {
                      "terms": {
                          "field": "msg.channel.name"
                      }
                  }
                }
            }
        }
      }
      let formatted_data = await QueryBuilder(base_query);
      console.log(formatted_data)
      let list_rendered = {
        "data":[],
        "columns":["users", "teams", "number of teams"]
      }
      
      formatted_data.aggregations.topics.buckets.forEach((element) => {
        let data_obj = []
        data_obj.push(element.key)
        let teams = []
        element.teams.buckets.forEach((team_obj) => {
          //console.log(team_obj.key)
          teams.push(team_obj.key)
        })
        data_obj.push(teams.toString())
        data_obj.push(teams.length)
        list_rendered.data.push(data_obj)
      })
      console.log(list_rendered)
      
      dispatch({ 
        type: "LIST_RENDERED", 
        payload: list_rendered
      })
    }

    async function ListTopicsUserHasPostedIn(){
      let base_query = {
        "user_selected":state.graph_metadata.user_selected,
        "advanced_aggs": {
          "topics": {
            "terms": {
                "field": "msg.channel.topic_name",
                "size": 100
            },
            "aggs" : {
              "teams": {
                  "terms": {
                      "field": "msg.channel.name"
                  }
              }
            }
          }
        }
      }
      let formatted_data = await QueryBuilder(base_query);
      let list_rendered = {
        "data":[],
        "columns":["topics", "teams with topic"]
      }
      formatted_data.aggregations.topics.buckets.forEach((element) => {
        let data_obj = []
        data_obj.push(element.key)
        let teams = []
        element.teams.buckets.forEach((team_obj) => {
          //console.log(team_obj.key)
          teams.push(team_obj.key)
        })
        data_obj.push(teams.toString())
        list_rendered.data.push(data_obj)
      })
      console.log(list_rendered)
      dispatch({ 
        type: "LIST_RENDERED", 
        payload: list_rendered
      })
    }

    async function ListTopicsUserHasNOTPostedIn(){
      // Get a list of all topics in team
      let topic_query_result = await QueryBuilder({
        "advanced_aggs": {
          "topics": {
            "terms": {
                "field": "msg.channel.topic_name",
                "size": 100
            },
            "aggs" : {
              "teams": {
                  "terms": {
                      "field": "msg.channel.name"
                  }
              }
            }
          }
        }
      })
      // Get list of all topics user has posted in
      let user_query_result = await QueryBuilder({
        "user_selected":state.graph_metadata.user_selected,
        "advanced_aggs": {
          "topics": {
            "terms": {
                "field": "msg.channel.topic_name",
                "size": 100
            },
            "aggs" : {
              "teams": {
                  "terms": {
                      "field": "msg.channel.name"
                  }
              }
            }
          }
        }
      })
      let list_rendered = {
        "data":[],
        "columns":["Topics", "teams", "number of teams"]
      }
      // ListTopicsUserHasNOTPostedIn
      let object_something = {}
      topic_query_result.aggregations.topics.buckets.forEach((element) => {
        object_something[element.key] = element
      })
      let object_something2 = {}
      user_query_result.aggregations.topics.buckets.forEach((element) => {
        object_something2[element.key] = element
      })
      Object.keys(object_something).forEach((element) => {
        if(element in object_something2){
          if(object_something[element].teams.buckets.length != object_something2[element].teams.buckets.length){
            let team_list = []
            object_something[element].teams.buckets.forEach((team_obj) => {
              team_list.push(team_obj.key)
            })
            let team_list2 = []
            object_something2[element].teams.buckets.forEach((team_obj) => {
              team_list.push(team_obj.key)
            })
            let meta_team_list = []
            team_list.forEach((tmp_team) => {
              if(team_list2.indexOf(tmp_team) == -1){
                meta_team_list.push(tmp_team)
              }
            })
            list_rendered.data.push([
              element,
              meta_team_list.toString(),
              meta_team_list.length
            ])
          }
        }
        else {
          let team_list = []
          object_something[element].teams.buckets.forEach((team_obj) => {
            team_list.push(team_obj.key)
          })
          list_rendered.data.push([
            element,
            team_list.toString(),
            team_list.length
          ])
        }
      })
      dispatch({ 
        type: "LIST_RENDERED", 
        payload: list_rendered
      })
    }


    async function GenerateList(which_graph){
      console.log("GenerateList")
      console.log(which_graph)
      // I tried a switch statement but could not get it working
      if(which_graph == "KeybaseListAllUsersWithTheTeamsTheyAreOn") {
        KeybaseListAllUsersWithTheTeamsTheyAreOn()
      }
      if(which_graph == "ListTopicsUserHasPostedIn") {
        ListTopicsUserHasPostedIn()
      }
      if(which_graph == "ListTopicsUserHasNOTPostedIn") {
        ListTopicsUserHasNOTPostedIn()
      }
      if(which_graph == "ListTeamsUserHasPostedIn") {
        dispatch({ 
          type: "LIST_RENDERED", 
          payload: {
            "data":[
              ["ListTeamsUserHasPostedIn", 'test@example.com'],
              ['test2', 'test2@gmail.com']
            ],
            "columns": ['Name', 'Email']
          }
        })
      }
      if(which_graph == "KeybaseListTeamsAUserHasNOTPostedIn") {
        dispatch({ 
          type: "LIST_RENDERED", 
          payload: {
            "data":[
              ["KeybaseListTeamsAUserHasNOTPostedIn", 'test@example.com'],
              ['test2', 'test2@gmail.com']
            ],
            "columns": ['Name', 'Email']
          }
        })
      }
      if(which_graph == "KeybaseListUsersThatHavePostedInTeam") {
        dispatch({ 
          type: "LIST_RENDERED", 
          payload: {
            "data":[
              ["KeybaseListUsersThatHavePostedInTeam", 'test@example.com'],
              ['test2', 'test2@gmail.com']
            ],
            "columns": ['Name', 'Email']
          }
        })
      }
      if(which_graph == "KeybaseListUsersThatHaveNOTPostedInTeam") {
        dispatch({ 
          type: "LIST_RENDERED", 
          payload: {
            "data":[
              ["KeybaseListUsersThatHaveNOTPostedInTeam", 'test@example.com'],
              ['test2', 'test2@gmail.com']
            ],
            "columns": ['Name', 'Email']
          }
        })
      }
      if(which_graph == "ListMessagesReactedToMostInTopic") {
        dispatch({ 
          type: "LIST_RENDERED", 
          payload: {
            "data":[
              ["ListMessagesReactedToMostInTopic", 'test@example.com'],
              ['test2', 'test2@gmail.com']
            ],
            "columns": ['Name', 'Email']
          }
        })
      }
      if(which_graph == "KeybaseListUsersThatHavePostedInASpecificTopic") {
        dispatch({ 
          type: "LIST_RENDERED", 
          payload: {
            "data":[
              ["KeybaseListUsersThatHavePostedInASpecificTopic", 'test@example.com'],
              ['test2', 'test2@gmail.com']
            ],
            "columns": ['Name', 'Email']
          }
        })
      }
      if(which_graph == "KeybaseListUsersThatHaveNOTPostedInASpecificTopic") {
        dispatch({ 
          type: "LIST_RENDERED", 
          payload: {
            "data":[
              ["KeybaseListUsersThatHaveNOTPostedInASpecificTopic", 'test@example.com'],
              ['test2', 'test2@gmail.com']
            ],
            "columns": ['Name', 'Email']
          }
        })
      }
      if(which_graph == "KeybaseListLongestMessagesInSpecificTopic") {
        dispatch({ 
          type: "LIST_RENDERED", 
          payload: {
            "data":[
              ["KeybaseListLongestMessagesInSpecificTopic", 'test@example.com'],
              ['test2', 'test2@gmail.com']
            ],
            "columns": ['Name', 'Email']
          }
        })
      }
      if(which_graph == "KeybaseListLongestMessagesOnTeam") {
        dispatch({ 
          type: "LIST_RENDERED", 
          payload: {
            "data":[
              ["KeybaseListLongestMessagesOnTeam", 'test@example.com'],
              ['test2', 'test2@gmail.com']
            ],
            "columns": ['Name', 'Email']
          }
        })
      }
      if(which_graph == "KeybaseListUsersThatHaveNOTPostedInASpecificTopic") {
        dispatch({ 
          type: "LIST_RENDERED", 
          payload: {
            "data":[
              ["KeybaseListUsersThatHaveNOTPostedInASpecificTopic", 'test@example.com'],
              ['test2', 'test2@gmail.com']
            ],
            "columns": ['Name', 'Email']
          }
        })
      }
    }
    useEffect(() => {
      async function doAsync(){
        console.log("KeybaseControlsList useEffect")
      }
      doAsync()
    }, [])
    return (
      <>
            {/* <button onClick={() => GenerateList()}>Fetch List</button> */}
            <FormControl component="fieldset">
            <FormLabel component="legend">Query Select</FormLabel>
            <RadioGroup
                aria-label="query select"
                defaultValue="List topics user has posted in"
                name="radio-buttons-group"
            >
                <FormControlLabel 
                  value="List all users, with the teams they are on"
                  label="List all users, with the teams they are on"  
                  control={<Radio />} 
                  onClick={() => { 
                    GenerateList("KeybaseListAllUsersWithTheTeamsTheyAreOn")
                    dispatch({ type: "LIST_SELECT", payload: "KeybaseListAllUsersWithTheTeamsTheyAreOn"})
                    }} 
                />
                <FormControlLabel 
                  value="List topics user has posted in"
                  label="List topics user has posted in"  
                  control={<Radio />} 
                  onClick={() => { 
                    GenerateList("ListTopicsUserHasPostedIn")
                    dispatch({ type: "LIST_SELECT", payload: "ListTopicsUserHasPostedIn"})
                    }} 
                />
                <FormControlLabel 
                  value="List topics user has NOT posted in"
                  label="List topics user has NOT posted in"
                  control={<Radio />}  
                  onClick={() => { 
                    GenerateList("ListTopicsUserHasNOTPostedIn")
                    dispatch({ type: "LIST_SELECT", payload: "ListTopicsUserHasNOTPostedIn"})
                    }}
                />
                <FormControlLabel 
                  value="List teams user has posted in"
                  label="List teams user has posted in"
                  control={<Radio />}  
                  onClick={() => { 
                    GenerateList("ListTeamsUserHasPostedIn")
                    dispatch({ type: "LIST_SELECT", payload: "ListTeamsUserHasPostedIn"})
                    }}
                />
                <FormControlLabel 
                  value="List teams user has NOT posted in"
                  label="List teams user has NOT posted in"
                  control={<Radio />}  
                  onClick={() => { 
                    GenerateList("KeybaseListTeamsAUserHasNOTPostedIn")
                    dispatch({ type: "LIST_SELECT", payload: "KeybaseListTeamsAUserHasNOTPostedIn"})
                    }}
                />
                <FormControlLabel 
                  value="List users that have posted in team"
                  label="List users that have posted in team"
                  control={<Radio />}  
                  onClick={() => {
                    GenerateList("KeybaseListUsersThatHavePostedInTeam") 
                    dispatch({ type: "LIST_SELECT", payload: "KeybaseListUsersThatHavePostedInTeam"})
                    }}
                />
                <FormControlLabel 
                  value="List users that have NOT posted in team"
                  label="List users that have NOT posted in team"
                  control={<Radio />}  
                  onClick={() => { 
                    GenerateList("KeybaseListUsersThatHaveNOTPostedInTeam") 
                    dispatch({ type: "LIST_SELECT", payload: "KeybaseListUsersThatHaveNOTPostedInTeam"})
                    }}
                />
                <FormControlLabel 
                  value="List Messages Reacted To Most In Topic"
                  label="List Messages Reacted To Most In Topic"
                  control={<Radio />} 
                  onClick={() => { 
                    GenerateList("ListMessagesReactedToMostInTopic") 
                    dispatch({ type: "LIST_SELECT", payload: "ListMessagesReactedToMostInTopic"})
                  }}
                />
                <FormControlLabel 
                  value="List Users who have posted in specific topic"
                  label="List Users who have posted in specific topic"
                  control={<Radio />} 
                  onClick={() => {
                    GenerateList("KeybaseListUsersThatHavePostedInASpecificTopic") 
                    dispatch({ type: "LIST_SELECT", payload: "KeybaseListUsersThatHavePostedInASpecificTopic"})
                    }}
                />
                <FormControlLabel 
                  value="List Users who have NOT posted in specific topic"
                  label="List Users who have NOT posted in specific topic"
                  control={<Radio />} 
                  onClick={() => {
                    GenerateList("KeybaseListUsersThatHaveNOTPostedInASpecificTopic") 
                    dispatch({ type: "LIST_SELECT", payload: "KeybaseListUsersThatHaveNOTPostedInASpecificTopic"})
                    }}
                />
                <FormControlLabel 
                  value="List longest messages in specific topic"
                  label="List longest messages in specific topic"
                  control={<Radio />} 
                  onClick={() => {
                    GenerateList("KeybaseListLongestMessagesInSpecificTopic") 
                    dispatch({ type: "LIST_SELECT", payload: "KeybaseListLongestMessagesInSpecificTopic"})
                    }}
                />
                  <FormControlLabel 
                  value="List longest messages on team"
                  label="List longest messages on team"
                  control={<Radio />} 
                  onClick={() => {
                    GenerateList("KeybaseListLongestMessagesOnTeam") 
                    dispatch({ type: "LIST_SELECT", payload: "KeybaseListLongestMessagesOnTeam"})
                    }}
                />
                <FormControlLabel 
                  value="List Users who have NOT posted in specific topic"
                  label="List Users who have NOT posted in specific topic"
                  control={<Radio />} 
                  onClick={() => {
                    GenerateList("KeybaseListUsersThatHaveNOTPostedInASpecificTopic") 
                    dispatch({ type: "LIST_SELECT", payload: "KeybaseListUsersThatHaveNOTPostedInASpecificTopic"})
                    }}
                />
            </RadioGroup>
            </FormControl>
      </>
    )
}
