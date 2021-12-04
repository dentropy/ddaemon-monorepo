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

    async function ListTeamsUserHasPostedIn(){
      // Aubyn
      let base_query = {
        "user_selected":state.graph_metadata.user_selected,
        "basic_aggs": "msg.channel.name"
      }
      let formatted_data = await QueryBuilder(base_query);
      let list_rendered = {
        "data":[],
        "columns":["Teams", "Number of Messages"]
      }
      console.log("ListTeamsUserHasPostedIn")
      console.log(formatted_data)
      formatted_data.table.forEach((team) => {
        list_rendered.data.push([team.key, team.doc_count])
      })
      dispatch({ 
        type: "LIST_RENDERED", 
        payload: list_rendered
      })
    }

    async function ListTeamsUserHasNOTPostedIn(){
      let user_teams = {
        "user_selected":state.graph_metadata.user_selected,
        "basic_aggs": "msg.channel.name"
      }
      let user_teams_data = await QueryBuilder(user_teams);
      let all_teams = {
        "basic_aggs": "msg.channel.name"
      }
      let all_teams_data = await QueryBuilder(all_teams);
      let list_rendered = {
        "data":[],
        "columns":["Teams"]
      }
      // console.log("ListTeamsUserHasNOTPostedIn")
      // console.log(user_teams_data.table.length)
      // console.log(all_teams_data.table.length)
      if(all_teams_data.table.length == user_teams_data.table.length){
        list_rendered.data.push(["User is on all indexed teams"])
      }
      else {
        let all_teams_data_list = []
        for(var i = 0; i < all_teams_data.table.length; i++ ){
          all_teams_data_list.push(all_teams_data.table[i].key)
        }
        let user_teams_data_list = []
        for(var i = 0; i < user_teams_data.table.length; i++ ){
          user_teams_data_list.push(user_teams_data.table[i].key)
        }
        for(var i = 0; i < all_teams_data_list.length; i++ ){
          console.log(user_teams_data_list.indexOf(all_teams_data_list[i]))
          if(user_teams_data_list.indexOf(all_teams_data_list[i]) == -1){
            list_rendered.data.push([all_teams_data_list[i] ])
          }
       }
       console.log(all_teams_data_list)
       console.log(user_teams_data_list)
       console.log(list_rendered)
      }
      dispatch({ 
        type: "LIST_RENDERED", 
        payload: list_rendered
      })
    }


    async function KeybaseListUsersThatHavePostedInTeam(){
      let base_query = {
        "team_selected":state.graph_metadata.team_selected,
        "basic_aggs": "msg.sender.username"
      }
      let formatted_data = await QueryBuilder(base_query);
      let list_rendered = {
        "data":[],
        "columns":["Teams", "Number of Messages"]
      }
      console.log("KeybaseListUsersThatHavePostedInTeam")
      console.log(formatted_data)
      formatted_data.table.forEach((team) => {
        list_rendered.data.push([team.key, team.doc_count])
      })
      dispatch({ 
        type: "LIST_RENDERED", 
        payload: list_rendered
      })
    }

    async function KeybaseListUsersThatHaveNOTPostedInTeam(){
      // TODO The variable names here are stupid I know
        // The logic here is copied so there should be another
        // function somewhere to stop duplicated code
      let user_teams = {
        "team_selected":state.graph_metadata.team_selected,
        "basic_aggs": "msg.sender.username"
      }
      let user_teams_data = await QueryBuilder(user_teams);
      let all_teams = {
        "basic_aggs": "msg.sender.username"
      }
      let all_teams_data = await QueryBuilder(all_teams);
      let list_rendered = {
        "data":[],
        "columns":["Teams"]
      }
      // console.log("ListTeamsUserHasNOTPostedIn")
      // console.log(user_teams_data.table.length)
      // console.log(all_teams_data.table.length)
      if(all_teams_data.table.length == user_teams_data.table.length){
        list_rendered.data.push(["User is on all indexed teams"])
      }
      else {
        let all_teams_data_list = []
        for(var i = 0; i < all_teams_data.table.length; i++ ){
          all_teams_data_list.push(all_teams_data.table[i].key)
        }
        let user_teams_data_list = []
        for(var i = 0; i < user_teams_data.table.length; i++ ){
          user_teams_data_list.push(user_teams_data.table[i].key)
        }
        for(var i = 0; i < all_teams_data_list.length; i++ ){
          console.log(user_teams_data_list.indexOf(all_teams_data_list[i]))
          if(user_teams_data_list.indexOf(all_teams_data_list[i]) == -1){
            list_rendered.data.push([all_teams_data_list[i] ])
          }
       }
       console.log(all_teams_data_list)
       console.log(user_teams_data_list)
       console.log(list_rendered)
      }
      dispatch({ 
        type: "LIST_RENDERED", 
        payload: list_rendered
      })
    }

    async function KeybaseListUsersThatHavePostedInASpecificTopic(){
      let base_query = {
        "topic_selected":state.graph_metadata.topic_selected,
        "basic_aggs": "msg.sender.username"
      }
      let formatted_data = await QueryBuilder(base_query);
      let list_rendered = {
        "data":[],
        "columns":["Teams", "Number of Messages"]
      }
      console.log("KeybaseListUsersThatHavePostedInTeam")
      console.log(formatted_data)
      formatted_data.table.forEach((team) => {
        list_rendered.data.push([team.key, team.doc_count])
      })
      dispatch({ 
        type: "LIST_RENDERED", 
        payload: list_rendered
      })
    }


    async function KeybaseListUsersThatHaveNOTPostedInASpecificTopic(){
      // TODO The variable names here are stupid I know
        // The logic here is copied so there should be another
        // function somewhere to stop duplicated code
      let user_teams = {
        "topic_selected":state.graph_metadata.topic_selected,
        "basic_aggs": "msg.sender.username"
      }
      let user_teams_data = await QueryBuilder(user_teams);
      let all_teams = {
        "basic_aggs": "msg.sender.username"
      }
      let all_teams_data = await QueryBuilder(all_teams);
      let list_rendered = {
        "data":[],
        "columns":["Teams"]
      }
      // console.log("ListTeamsUserHasNOTPostedIn")
      // console.log(user_teams_data.table.length)
      // console.log(all_teams_data.table.length)
      if(all_teams_data.table.length == user_teams_data.table.length){
        list_rendered.data.push(["User is on all indexed teams"])
      }
      else {
        let all_teams_data_list = []
        for(var i = 0; i < all_teams_data.table.length; i++ ){
          all_teams_data_list.push(all_teams_data.table[i].key)
        }
        let user_teams_data_list = []
        for(var i = 0; i < user_teams_data.table.length; i++ ){
          user_teams_data_list.push(user_teams_data.table[i].key)
        }
        for(var i = 0; i < all_teams_data_list.length; i++ ){
          console.log(user_teams_data_list.indexOf(all_teams_data_list[i]))
          if(user_teams_data_list.indexOf(all_teams_data_list[i]) == -1){
            list_rendered.data.push([all_teams_data_list[i] ])
          }
       }
       console.log(all_teams_data_list)
       console.log(user_teams_data_list)
       console.log(list_rendered)
      }
      dispatch({ 
        type: "LIST_RENDERED", 
        payload: list_rendered
      })
    }

    async function KeybaseListLongestMessagesInSpecificTopicCharacters(){
      let base_query = {
        "topic_selected":state.graph_metadata.topic_selected,
        "team_selected":state.graph_metadata.team_selected,
        "sort": { 
          "msg.content.content_character_length" : {
            "order" : "desc"
          }
        }
      }
      let formatted_data = await QueryBuilder(base_query);
      let list_rendered = {
        "data":[],
        "columns":["Team Name", "Topic Name", "Sender", "Message Contents"]
      }
      console.log("KeybaseListLongestMessagesInSpecificTopicCharacters")
      console.log(formatted_data)
      console.log("Object.keys")
      console.log(Object.keys(formatted_data))
      for(var i = 0; i < formatted_data.hits.hits.length; i++){
        console.log("Object.keys")
        console.log(formatted_data.hits.hits[i])
        list_rendered.data.push([
          formatted_data.hits.hits[i]._source.msg.channel.name,
          formatted_data.hits.hits[i]._source.msg.channel.topic_name,
          formatted_data.hits.hits[i]._source.msg.sender.username,
          formatted_data.hits.hits[i]._source.msg.content.text.body
        ])
      }
      // formatted_data.table.forEach((team) => {
      //   list_rendered.data.push([team.key, team.doc_count])
      // })
      dispatch({ 
        type: "LIST_RENDERED", 
        payload: list_rendered
      })
    }
    async function KeybaseListLongestMessagesInSpecificTopicCharacters(){
      let base_query = {
        "topic_selected":state.graph_metadata.topic_selected,
        "team_selected":state.graph_metadata.team_selected,
        "sort": { 
          "msg.content.content_character_length" : {
            "order" : "desc"
          }
        }
      }
      let formatted_data = await QueryBuilder(base_query);
      let list_rendered = {
        "data":[],
        "columns":["Team Name", "Topic Name", "Sender", "Message Contents"]
      }
      console.log("KeybaseListLongestMessagesInSpecificTopicCharacters")
      console.log(formatted_data)
      console.log("Object.keys")
      console.log(Object.keys(formatted_data))
      for(var i = 0; i < formatted_data.hits.hits.length; i++){
        console.log("Object.keys")
        console.log(formatted_data.hits.hits[i])
        list_rendered.data.push([
          formatted_data.hits.hits[i]._source.msg.channel.name,
          formatted_data.hits.hits[i]._source.msg.channel.topic_name,
          formatted_data.hits.hits[i]._source.msg.sender.username,
          formatted_data.hits.hits[i]._source.msg.content.text.body
        ])
      }
      // formatted_data.table.forEach((team) => {
      //   list_rendered.data.push([team.key, team.doc_count])
      // })
      dispatch({ 
        type: "LIST_RENDERED", 
        payload: list_rendered
      })
    }
    async function KeybaseListLongestMessagesInSpecificTopicCharacters(){
      let base_query = {
        "topic_selected":state.graph_metadata.topic_selected,
        "team_selected":state.graph_metadata.team_selected,
        "sort": { 
          "msg.content.content_character_length" : {
            "order" : "desc"
          }
        }
      }
      let formatted_data = await QueryBuilder(base_query);
      let list_rendered = {
        "data":[],
        "columns":["Team Name", "Topic Name", "Sender", "Message Contents"]
      }
      console.log("KeybaseListLongestMessagesInSpecificTopicCharacters")
      console.log(formatted_data)
      console.log("Object.keys")
      console.log(Object.keys(formatted_data))
      for(var i = 0; i < formatted_data.hits.hits.length; i++){
        console.log("Object.keys")
        console.log(formatted_data.hits.hits[i])
        list_rendered.data.push([
          formatted_data.hits.hits[i]._source.msg.channel.name,
          formatted_data.hits.hits[i]._source.msg.channel.topic_name,
          formatted_data.hits.hits[i]._source.msg.sender.username,
          formatted_data.hits.hits[i]._source.msg.content.text.body
        ])
      }
      // formatted_data.table.forEach((team) => {
      //   list_rendered.data.push([team.key, team.doc_count])
      // })
      dispatch({ 
        type: "LIST_RENDERED", 
        payload: list_rendered
      })
    }
    async function KeybaseListLongestMessagesInSpecificTopicCharacters(){
      let base_query = {
        "topic_selected":state.graph_metadata.topic_selected,
        "team_selected":state.graph_metadata.team_selected,
        "sort": { 
          "msg.content.content_character_length" : {
            "order" : "desc"
          }
        }
      }
      let formatted_data = await QueryBuilder(base_query);
      let list_rendered = {
        "data":[],
        "columns":["Team Name", "Topic Name", "Sender", "Message Contents"]
      }
      console.log("KeybaseListLongestMessagesInSpecificTopicCharacters")
      console.log(formatted_data)
      console.log("Object.keys")
      console.log(Object.keys(formatted_data))
      for(var i = 0; i < formatted_data.hits.hits.length; i++){
        console.log("Object.keys")
        console.log(formatted_data.hits.hits[i])
        list_rendered.data.push([
          formatted_data.hits.hits[i]._source.msg.channel.name,
          formatted_data.hits.hits[i]._source.msg.channel.topic_name,
          formatted_data.hits.hits[i]._source.msg.sender.username,
          formatted_data.hits.hits[i]._source.msg.content.text.body
        ])
      }
      // formatted_data.table.forEach((team) => {
      //   list_rendered.data.push([team.key, team.doc_count])
      // })
      dispatch({ 
        type: "LIST_RENDERED", 
        payload: list_rendered
      })
    }
    async function KeybaseListLongestMessagesInSpecificTopicCharacters(){
      let base_query = {
        "topic_selected":state.graph_metadata.topic_selected,
        "team_selected":state.graph_metadata.team_selected,
        "sort": { 
          "msg.content.content_character_length" : {
            "order" : "desc"
          }
        }
      }
      let formatted_data = await QueryBuilder(base_query);
      let list_rendered = {
        "data":[],
        "columns":["Team Name", "Topic Name", "Sender", "Message Contents"]
      }
      console.log("KeybaseListLongestMessagesInSpecificTopicCharacters")
      console.log(formatted_data)
      console.log("Object.keys")
      console.log(Object.keys(formatted_data))
      for(var i = 0; i < formatted_data.hits.hits.length; i++){
        console.log("Object.keys")
        console.log(formatted_data.hits.hits[i])
        list_rendered.data.push([
          formatted_data.hits.hits[i]._source.msg.channel.name,
          formatted_data.hits.hits[i]._source.msg.channel.topic_name,
          formatted_data.hits.hits[i]._source.msg.sender.username,
          formatted_data.hits.hits[i]._source.msg.content.text.body
        ])
      }
      // formatted_data.table.forEach((team) => {
      //   list_rendered.data.push([team.key, team.doc_count])
      // })
      dispatch({ 
        type: "LIST_RENDERED", 
        payload: list_rendered
      })
    }
    async function KeybaseListLongestMessagesInSpecificTopicCharacters(){
      let base_query = {
        "topic_selected":state.graph_metadata.topic_selected,
        "team_selected":state.graph_metadata.team_selected,
        "sort": { 
          "msg.content.content_character_length" : {
            "order" : "desc"
          }
        }
      }
      let formatted_data = await QueryBuilder(base_query);
      let list_rendered = {
        "data":[],
        "columns":["Team Name", "Topic Name", "Sender", "Message Contents"]
      }
      console.log("KeybaseListLongestMessagesInSpecificTopicCharacters")
      console.log(formatted_data)
      console.log("Object.keys")
      console.log(Object.keys(formatted_data))
      for(var i = 0; i < formatted_data.hits.hits.length; i++){
        console.log("Object.keys")
        console.log(formatted_data.hits.hits[i])
        list_rendered.data.push([
          formatted_data.hits.hits[i]._source.msg.channel.name,
          formatted_data.hits.hits[i]._source.msg.channel.topic_name,
          formatted_data.hits.hits[i]._source.msg.sender.username,
          formatted_data.hits.hits[i]._source.msg.content.text.body
        ])
      }
      // formatted_data.table.forEach((team) => {
      //   list_rendered.data.push([team.key, team.doc_count])
      // })
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
        ListTeamsUserHasPostedIn()
      }
      if(which_graph == "KeybaseListTeamsAUserHasNOTPostedIn") {
        ListTeamsUserHasNOTPostedIn()
      }
      if(which_graph == "KeybaseListUsersThatHavePostedInTeam") {
        KeybaseListUsersThatHavePostedInTeam()
      }
      if(which_graph == "KeybaseListUsersThatHaveNOTPostedInTeam") {
        KeybaseListUsersThatHaveNOTPostedInTeam()
      }
      if(which_graph == "KeybaseListUsersThatHavePostedInASpecificTopic") {
        KeybaseListUsersThatHavePostedInASpecificTopic()
      }
      if(which_graph == "KeybaseListUsersThatHaveNOTPostedInASpecificTopic") {
        KeybaseListUsersThatHaveNOTPostedInASpecificTopic()
      }
      if(which_graph == "KeybaseListLongestMessagesInSpecificTopicCharacters") {
        KeybaseListLongestMessagesInSpecificTopicCharacters()
      }
      if(which_graph == "KeybaseListLongestMessagesFromUserCharacters") {
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
      if(which_graph == "KeybaseListLongestMessagesOnTeamCharacters") {
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
      if(which_graph == "KeybaseListLongestMessagesOnTeamWords") {
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
      if(which_graph == "KeybaseListLongestMessagesFromUserWords") {
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
      if(which_graph == "KeybaseListLongestMessagesOnTeamWords") {
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
    }
    useEffect(() => {
      async function doAsync(){

        console.log("running KeybaseControlsList useEffect")
        //GenerateList("KeybaseListAllUsersWithTheTeamsTheyAreOn")
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
                defaultValue="List all users, with the teams they are on"
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
                  value="List longest messages in specific topic(Characters)"
                  label="List longest messages in specific topic(Characters)"
                  control={<Radio />} 
                  onClick={() => {
                    GenerateList("KeybaseListLongestMessagesInSpecificTopicCharacters") 
                    dispatch({ type: "LIST_SELECT", payload: "KeybaseListLongestMessagesInSpecificTopicCharacters"})
                    }}
                />
                  <FormControlLabel 
                  value="List longest messages on team(Characters)"
                  label="List longest messages on team(Characters)"
                  control={<Radio />} 
                  onClick={() => {
                    GenerateList("KeybaseListLongestMessagesOnTeamCharacters") 
                    dispatch({ type: "LIST_SELECT", payload: "KeybaseListLongestMessagesOnTeamCharacters"})
                    }}
                />
                <FormControlLabel 
                  value="List longest messages in specific topic(Words)"
                  label="List longest messages in specific topic(Words)"
                  control={<Radio />} 
                  onClick={() => {
                    GenerateList("KeybaseListLongestMessagesInSpecificTopicWords") 
                    dispatch({ type: "LIST_SELECT", payload: "KeybaseListLongestMessagesInSpecificTopicWords"})
                    }}
                />
                  <FormControlLabel 
                  value="List longest messages on team(Words)"
                  label="List longest messages on team(Words)"
                  control={<Radio />} 
                  onClick={() => {
                    GenerateList("KeybaseListLongestMessagesOnTeamWords") 
                    dispatch({ type: "LIST_SELECT", payload: "KeybaseListLongestMessagesOnTeamWords"})
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
            </RadioGroup>
            </FormControl>
      </>
    )
}
