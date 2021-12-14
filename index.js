import glob from "glob";
import fs, { writeFileSync } from 'fs';

/*

* The input should have everything in its own folder
* The output should put everything in three folders
  * One for messages
  * One for guild / Channel JSON
* 
*/


async function json_to_ndjson(index_name, input_path, output_folder_path){
    let rawdata = JSON.parse(fs.readFileSync(input_path));
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

async function get_users(input_path, output_folder_path){
    try{
        fs.mkdirSync("./exports/" + output_folder_path + "/users")
        console.log(`Creating ./exports/${output_folder_path}/users folder`) 
    }
    catch{
        console.log(`./exports/${output_folder_path}/users folder already exists`)
    }
    let rawdata = JSON.parse(fs.readFileSync(input_path));
    let users = {}
    rawdata.messages.forEach( async(single_message)=> {
        if ( !(single_message.author.name + "#" + single_message.author.discriminator in users) ){
            users[single_message.author.name + "#" + single_message.author.discriminator] = single_message.author
        }
    })
    fs.writeFileSync(output_folder_path + "/user.json", JSON.stringify(users))
}

async function index_messages(guild_name, export_folder_name, json_files){
    try{
        fs.mkdirSync("./exports/" + export_folder_name)
        console.log(`Creating ./exports/${export_folder_name} folder`) 
    }
    catch{
        console.log(`./exports/${export_folder_name} folder already exists`)
    }
    try{
        fs.mkdirSync("./exports/" + export_folder_name + "/messages")
        console.log(`Creating ./exports/${export_folder_name}/messages folder`) 
    }
    catch{
        console.log(`./exports/${export_folder_name}/messages folder already exists`)
    }
    json_files.forEach( async( message_file) => {
        await json_to_ndjson(
            guild_name, 
            message_file, 
            "./exports/" + export_folder_name + "/messages"
        )
    })
}

async function main() {
    // Get all folders
    let input_folders = fs.readdirSync("./inputs")

    try{
        fs.mkdirSync("exports")
        console.log("Creating ./exports folder") 
    }
    catch{
        console.log("./exports folder already exists")
    }


    console.log("Indexing messages to Elasticsearch Format")
    input_folders.forEach( async(discord_guild_name) => {
        let json_files = await glob.sync(`**/inputs/${discord_guild_name}/*json`)
        let rawdata = JSON.parse(fs.readFileSync(json_files[0]));
        let export_folder_name = rawdata.guild.name + "-" + rawdata.guild.id
        if (fs.existsSync("./exports/" + export_folder_name + "/messages")) {
            console.log(`./exports/${export_folder_name}/messages exists!`);
        } else {
            index_messages(rawdata.guild.id, export_folder_name, json_files)
        }
    })

    // User Stuff
    let users = {
        "list":{},
        "guild_id":"test"
    }
    let export_folder_name
    for (var folder_index = 0; folder_index < input_folders.length; folder_index++){
        let json_files = await glob.sync(`**/inputs/${input_folders[folder_index]}/*json`)
        let rawdata = JSON.parse(fs.readFileSync(json_files[0]));
        users.guild_id = rawdata.guild.id
        export_folder_name = rawdata.guild.name + "-" + rawdata.guild.id
        if (await fs.existsSync("./exports/" + export_folder_name + "/users")) {
            console.log(`./exports/${export_folder_name}/users exists!`);
        } else {
            try{
                await fs.mkdirSync("./exports/" + export_folder_name + "/users")
                console.log(`Creating ./exports/${export_folder_name}/users folder`) 
            }
            catch{
                console.log(`./exports/${export_folder_name}/users folder already exists`)
            }
            for(var file_index = 0; file_index < json_files.length; file_index++) {
                let channel_json = await JSON.parse( await fs.readFileSync(json_files[file_index]));
                for(var message_index = 0; message_index < channel_json.messages.length; message_index++) {
                    if ( !(channel_json.messages[message_index].author.id in users.list) ){
                        users.list[channel_json.messages[message_index].author.id] = channel_json.messages[message_index].author
                    }
                }
            }
        }
    }
    fs.writeFileSync("./exports/" + export_folder_name + "/users/users.json" , JSON.stringify(users))
    console.log(`Indexed ${Object.keys(users.list).length} users`)
    let export_file_path = "./exports/" + export_folder_name + "/users/users.ndjson"
    Object.keys(users.list).forEach( async(single_user)=> {
        var index_id = {"index":
            {
            "_id":  "discordusers" + "-" + users.guild_id + "-" + single_user
            }
        }
        fs.appendFileSync( export_file_path, JSON.stringify(index_id) + "\n")
        var user_json = users.list[single_user]
        user_json.user_id = user_json.id
        delete user_json.id
        fs.appendFileSync( export_file_path, JSON.stringify(user_json) + "\n")
    })
    // End User Stuff
}

main()
