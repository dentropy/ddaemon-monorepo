import React from 'react';
import { DiscordContext } from './DiscordProvider'
import { DiscordMessagesPerMonth } from './DiscordBackend'
import Chart from "react-apexcharts";

export const DiscordDataVizMessageFrequency = () => {
    const [state, dispatch] = React.useContext(DiscordContext);
    const [frequencyMessages, setFrequencyMessages] = React.useState("Placeholder");

    var graph_data = {
      options: {
        chart: {
          height: 380,
          width: "100%",
          type: "bar",
          animations: {
            initialAnimation: {
              enabled: false
            }
          }
        },
        xaxis: {
          type: "datetime"
        }
      },
      series: [
        {
          name: "Series 1",
          data: [
            {
              x: "02-10-2017 GMT",
              y: 34
            },
            {
              x: "02-11-2017 GMT",
              y: 43
            },
            {
              x: "02-12-2017 GMT",
              y: 31
            },
            {
              x: "02-13-2017 GMT",
              y: 43
            },
            {
              x: "02-14-2017 GMT",
              y: 33
            },
            {
              x: "02-15-2017 GMT",
              y: 52
            }
          ]
        }
      ]
    };

    React.useEffect(() => {
        async function doAsync (){
            console.log("DiscordMessagesPerDay")
            let tmp_result = await  DiscordMessagesPerMonth("453243919774253079", 2021, 1)
            console.log(tmp_result)
            let processed_series = []
            Object.keys(tmp_result).sort().forEach((date) => {
              processed_series.push({
                "x":date,
                "y": tmp_result[date]
              })
            })
            graph_data.series.data = processed_series
            let tmp_series = [{
              name : "Messages per day",
              data : processed_series
            }]
            console.log(graph_data.series)
            console.log("tmp_series")
            console.log(tmp_series)
            setFrequencyMessages(
              <Chart
                options={graph_data.options}
                series={tmp_series}
                type={graph_data.options.chart.type}
                width="500"
              />
            )
        }
        doAsync()
    }, [])

    return (
      <div overflow="auto">
        <h1>{frequencyMessages}</h1>
      </div>
    )
}