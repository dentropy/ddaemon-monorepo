/*

* Get a list of all the channel's on the team
* Get a list of all channel's with a message from a user
* Compare the two lists
  * Put channel's someone has not posted in one new list
* Print the two lists

*/
import React, { useState, useEffect, useRef } from 'react';
import { Context } from '../../Provider';
import DataGrid from 'react-data-grid';
import KeybaseProvider, { KeybaseContext } from './KeybaseProvider'
import { CheckElasticResponse } from '../helper-functions/CheckElasticResponse';
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
//import { DataGrid } from '@mui/x-data-grid';
export const KeybaseListSearchResults =  (props) => {
    const [state, dispatch] = React.useContext(KeybaseContext);
    const [graph, setGraph] = useState(<h1>Loading</h1>); // TODO
    const [resultData, setResultData] = useState([{
      id:"Test",
      username:"Test",
      topic:"Test",
      team:"Test",
      body:"Test"
    }]); // TODO
    const my_columns =  ['id', 'username', 'topic', 'team', 'body']
    let wrapperRef = useRef(null);
    const myGrid = new Grid({
      columns: ['id', 'username', 'topic', 'team', 'body'],
      data: [{
        id:"Test",
        username:"Test",
        topic:"Test",
        team:"Test",
        body:"Test"
      }],
      sort: true
    });
    // useEffect(() => {
    //   updateDataGrid()
    // }, [props]);


    async function updateDataGrid() {
      console.log("props.search_phrase")
      console.log(props.search_phrase)
      async function doAsync() {
        // console.log("useEffect")
        let team_name = state.team_selected
        if (!state.graph_metadata.team_list.includes(state.team_selected) && state.team_selected != "*") {
          team_name = "complexweekend.oct2020"
        }
        // console.log("team_name")
        // console.log(team_name)
        let body_query = ({
          "index": "keybase-*",
          "query": { 
            "query": {
              "match": {
                  "msg.content.text.body": state.graph_metadata.general_search_phrase
              }
          },
          "size": 10
          }
        })
        // console.log(body_query)
        // TODO TEAM QUERY MANAGEMENT
        let myData = await (await fetch('/query', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(body_query)
        })).json()
            // console.log(body_query)
            // console.log("console.log(myData)")
            // console.log(myData)
            // console.log('"hits" in myData')
            // console.log("hits" in myData)
            let rendered_data = [];
            let mah_data = [];
            // console.log(myData)
            if (myData.hits.hits.length == 0) {
              setGraph(<h1>Zero Results</h1>)
            }
            else {
              const columns = [
                { key: 'id', name: 'ID' },
                { key: 'username', name: 'username'},
                { key: 'topic', name: 'topic'},
                { key: 'team', name: 'team'},
                { key: 'body', name: 'body'}
              ]
              let column_table_heading = []
              columns.forEach(tmp_column => {
                console.log(tmp_column)
                column_table_heading.push(<th>{tmp_column.key}</th>)
              })
              let row_of_rows = []
              myData.hits.hits.forEach((message) => {
                console.log(message._source.msg)
                mah_data.push({
                  id: mah_data.length,
                  username: message._source.msg.sender.username,
                  topic: message._source.msg.channel.topic_name,
                  team: message._source.msg.channel.name,
                  body: message._source.msg.content.text.body
                })
              })
              const myGrid = new Grid({
                columns: ['id', 'username', 'topic', 'team', 'body'],
                data: mah_data,
                sort: true
              });
              //try {
              setResultData(mah_data)
              // myGrid.render(wrapperRef.current)
              // wrapperRef.current.value = null
              // } catch{}
              // myGrid.updateConfig({
              //   data: mah_data
              // }).forceRender();
              // setGraph(grid)
              // setGraph(
              //   <div >
              //     <DataGrid
              //       rows={mah_data}
              //       columns={columns}
              //       rowHeight={100}
              //     />
              //   </div>
              // ) 

            }
      }
      doAsync()
    }
    const [noOfRender, setNoOfRender] = useState(0);
    useEffect(() => {

      console.log("wrapperRef.current")
      console.log(wrapperRef.current)
      updateDataGrid()
    }, [props]);



    return (
        <div>
          <Grid
            data={resultData}
            columns={my_columns}
            pagination={{
              limit: 10,
            }}
            sort={true}
            search={true}
          />
          {/* {graph} */}
          {/* <div ref={wrapperRef} /> */}
        </div>
    )
}