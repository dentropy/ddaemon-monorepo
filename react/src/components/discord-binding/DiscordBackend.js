

export async function DiscordGetGuilds() {
    let body_query = ({
        "index": "discordguilds",
        "query": {
            "query": {
              "match_all": {}
            },
            "size" : 250
          }
    })
    let elasticResponse = await (await fetch('/query', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body_query)
    })).json()
    let return_obj = {}
    elasticResponse.hits.hits.forEach((elasticHit) => {
        return_obj[elasticHit._source.name] = elasticHit._source
    })
    return return_obj
}

export async function DiscordGetChannels(guild_id){
    let body_query = ({
        "index": `discordchannels`,
        "query": {
            "query": {
              "script": {
                "script": `doc['_id'][0].indexOf('${guild_id}') > -1`
              }
            },
            "size" : 250
          }
    })
    let elasticResponse = await (await fetch('/query', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body_query)
    })).json()
    let return_obj = {}
    elasticResponse.hits.hits.forEach((elasticHit) => {
        return_obj[elasticHit._source.name] = elasticHit._source
    })
    return return_obj

}

export async function DiscordGetUsers(guild_id){
    let body_query = ({
        "index": `discordusers`,
        "query": {
            "query": {
              "script": {
                "script": `doc['_id'][0].indexOf('${guild_id}') > -1`
              }
            },
            "size" : 250
          }
    })
    let elasticResponse = await (await fetch('/query', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body_query)
    })).json()
    let return_obj = {}
    elasticResponse.hits.hits.forEach((elasticHit) => {
        return_obj[elasticHit._source.name] = elasticHit._source
    })
    return return_obj

}