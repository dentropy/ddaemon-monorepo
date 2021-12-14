import glob from "glob";
import fs from 'fs';

/*

* The input should have everything in its own folder
* The output should put everything in three folders
  * One for messages
  * One for guild / Channel JSON
* 
*/


async function json_to_ndjson(index_name, input_path, output_folder_path){
    // Read JSON
    let rawdata = JSON.parse(fs.readFileSync(input_path));
    //fs.mkdirSync()
    let export_file_path = output_folder_path +"/" +  rawdata.channel.id +".ndjson"
    try{
        fs.unlinkSync(export_file_path);
        console.log(`Deleted ${export_file_path} to be reconverted`)
    } catch {
        console.log(`Created ${export_file_path}`)
    }
    rawdata.messages.forEach( async(single_message)=> {
            var index_id = {"index":
                {
                "_id":  "discord" + "-" + index_name + "-" +  rawdata.channel.id +"-"+ single_message.id
                }
            }
            fs.appendFileSync( export_file_path, JSON.stringify(index_id) + "\n")
            var message_json = single_message
            message_json.message_id = message_json.id
            delete message_json.id
            message_json.guild_id = rawdata.guild.id
            message_json.channel_id = rawdata.channel.id
            fs.appendFileSync( export_file_path, JSON.stringify(message_json) + "\n")
    })
}

async function main() {
    // Get all folders
    let input_folders = fs.readdirSync("./inputs")

    // Loop through all folders formatting their JSON
    try{
        fs.mkdirSync("exports")
        console.log("Creating ./exports folder") 
    }
    catch{
        console.log("./exports folder already exists")
    }
    input_folders.forEach( async(discord_guild_name) => {
        let json_files = await glob.sync(`**/inputs/${discord_guild_name}/*json`)
        let rawdata = JSON.parse(fs.readFileSync(json_files[0]));
        let export_folder_name = rawdata.guild.name + "-" + rawdata.guild.id
        try{
            fs.mkdirSync("./exports/" + export_folder_name)
            console.log(`Creating ./exports/${export_folder_name} folder`) 
        }
        catch{
            console.log(`./exports/${export_folder_name} folder already exists`)
        }
        console.log(json_files)
        json_files.forEach( async(message_file) => {
            await json_to_ndjson(
                rawdata.guild.id, 
                message_file, 
                "./exports/" + export_folder_name
            )
        })
    })
}

main()
