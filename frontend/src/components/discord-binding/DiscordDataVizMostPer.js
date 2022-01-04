import React from 'react';
import { DiscordContext } from './DiscordProvider'
import { DiscordDataVizMostPerSidebar } from './DiscordDataVizMostPerSidebar'
import { discord_backend_api } from './DiscordBackend'

import Chart from "react-apexcharts";

import { Box } from '@mui/system';

export const DiscordDataVizMostPer = () => {
    const [state, dispatch] = React.useContext(DiscordContext);
    const [renderedGraph, setRenderedGraph] = React.useState(<h1>Rendering</h1>);
    let graphData = ({
          
      series: [{
        name: 'Inflation',
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
      }],
      options: {
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val ;
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
        },
        
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          position: 'top',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
          tooltip: {
            enabled: true,
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + "%";
            }
          }
        
        },
        title: {
          text: 'Monthly Inflation in Argentina, 2002',
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#444'
          }
        }
      },
    })
  
    React.useEffect(() => {
        async function doAsync (){
            let fetched_data = await discord_backend_api({
              "dataset" : "discord",
              "query_name" : "most_messages_per_user",
              "inputs" : {
                  "guild_id" : state.discord_guild_id
              }
            })
            console.log("fetched_data")
            console.log(fetched_data)
            let tmp_graph_data = graphData
            tmp_graph_data.series[0].data = fetched_data.data
            tmp_graph_data.options.xaxis.categories = fetched_data.xaxis
            graphData = tmp_graph_data
            console.log(tmp_graph_data)
            setRenderedGraph(        
              <Chart 
                options={tmp_graph_data.options} 
                series={tmp_graph_data.series} 
                type="bar" 
                height={350} 
              />
            )
        }
        doAsync()
    }, [state.discord_render_viz])

    
    return (
      <>
        {renderedGraph}
      </>
    )
}