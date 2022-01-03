import React from 'react';
import { DiscordContext } from './DiscordProvider'
import { DiscordMessagesPerMonth } from './DiscordBackend'
export const DiscordDataVizMessageFrequency = () => {
    const [state, dispatch] = React.useContext(DiscordContext);
    const [frequencyMessages, setFrequencyMessages] = React.useState("Placeholder");
    React.useEffect(() => {
        async function doAsync (){
            console.log("DiscordMessagesPerDay")
            let tmp_result = await  DiscordMessagesPerMonth("453243919774253079", 2021, 1)
            console.log(tmp_result)
            //setFrequencyMessages()
        }
        doAsync()
    }, [])

    return (
      <div overflow="auto">
        <h1>{frequencyMessages}</h1>
      </div>
    )
}