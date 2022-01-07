

export async function DiscordMessagesPerDay(guild_id, gte_date, lt_date){
    let body_query = ({
        "index": `discordmessages`,
        "query": 
        {
            "query": {
                "bool": {
                  "must": [
                      { "match": {
                          "guild_id": {"query": guild_id}
                          }
                      },
                      { 
                        "range": {
                            "timestamp": {
                                "gte": gte_date,
                                "lt": lt_date
                            }
                        }
                      }
                  ]
                }
            }
        }
    })
    console.log("body_query.query")
    console.log(body_query.query)
    let elasticResponse = await (await fetch('/query', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body_query)
    })).json()
    return elasticResponse
}

export async function DiscordMessagesPerDays(guild_id, mah_date, days_after){
    let return_obj = {}
    console.log(DiscordMessagesPerDays)
    for(var i = 1; i < days_after; i++) {
        var from_date = new Date(mah_date); 
        from_date.setDate(from_date.getDate() + i)
        var to_date = new Date(mah_date); 
        to_date.setDate(to_date.getDate() + (i + 1))
        let tmp_obj = await DiscordMessagesPerDay(
            guild_id,
            from_date.toISOString(),
            to_date.toISOString()
        )
        console.log("tmp_obj")
        console.log(tmp_obj)
        if (tmp_obj != undefined) {
            return_obj["2021-01-" + i.toString()] = tmp_obj.hits.total.value
        }
    }
    return return_obj
}

export async function DiscordMessagesPerMonth(guild_id, year, month){
    function daysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
    }
    return DiscordMessagesPerDays(guild_id, `${year}-${month}-01`, daysInMonth(month, year) )
}

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

async function most_message_per_channel(tmp_guild_id){
    let body_query = ({
        "index": `discordmessages`,
        "query": {
            "query": {
            "bool": {
                "must": [
                    { "match": {
                        "guild_id": {"query": tmp_guild_id}
                        }
                    }
                ]
            }
            },
            "aggs": {
                "topics": {
                    "terms": {
                        "field": "channel_id",
                        "size": 32
                    }
                }
            },
            "size" : 0
        }
    })
    console.log("body_query")
    console.log(body_query)
    let elasticResponse = await (await fetch('/query', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body_query)
    })).json()
    let return_obj = {
        xaxis: [],
        data:  []
    }
    elasticResponse.aggregations.topics.buckets.forEach((elasticHit) => {
        return_obj.xaxis.push(elasticHit.key)
        return_obj.data.push(elasticHit.doc_count)
    })
    return return_obj
}

async function most_messages_per_user(tmp_guild_id){
    let body_query = ({
        "index": `discordmessages`,
        "query": {
            "query": {
              "bool": {
                "must": [
                    { "match": {
                        "guild_id": {"query": tmp_guild_id}
                        }
                    }
                ]
              }
            },
            "aggs": {
              "topics": {
                  "terms": {
                      "field": "author.id",
                      "size": 32
                  },
                  "aggs" : {
                    "teams": {
                        "terms": {
                            "field": "channel_id",
                            "size": 250
                        }
                    }
                  }
              }
            },
            "size" : 0
          }
    })
    // console.log("body_query")
    // console.log(body_query)
    let elasticResponse = await (await fetch('/query', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body_query)
    })).json()
    let return_obj = {
        xaxis: [],
        data:  []
    }
    elasticResponse.aggregations.topics.buckets.forEach((elasticHit) => {
        return_obj.xaxis.push(elasticHit.key)
        return_obj.data.push(elasticHit.doc_count)
    })
    return return_obj
}

async function user_ids_to_users(list_user_id){
    let body_query = ({
        "index": `discordusers`,
        "query": {
            "query": {
              "bool" : {
                "filter" : {
                  "terms": {
                    "user_id": list_user_id
                  }
                }
              }
            },
            "size":list_user_id.length
          }
    })
    console.log("body_query")
    console.log(body_query)
    let elasticResponse = await (await fetch('/query', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body_query)
    })).json()
    let something_users = {}
    elasticResponse.hits.hits.forEach((mah_hit) => {
        something_users[mah_hit._source.user_id] = mah_hit._source.name + "#" + mah_hit._source.discriminator
    })
    let return_list = []
    list_user_id.forEach((tmp_user_id) =>{
        return_list.push(something_users[tmp_user_id])
    })
    return return_list
}

async function channel_ids_to_channels(list_channel_id){
    let body_query = ({
        "index": `discordchannels`,
        "query": {
            "query": {
              "bool" : {
                "filter" : {
                  "terms": {
                    "user_id": list_channel_id
                  }
                }
              }
            },
            "size":list_channel_id.length
          }
    })
    console.log("body_query")
    console.log(body_query)
    let elasticResponse = await (await fetch('/query', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body_query)
    })).json()
    let something_users = {}
    elasticResponse.hits.hits.forEach((mah_hit) => {
        something_users[mah_hit._source.user_id] = mah_hit._source.name
    })
    let return_list = []
    list_channel_id.forEach((tmp_user_id) =>{
        return_list.push(something_users[tmp_user_id])
    })
    return return_list
}

async function query_builder(mah_inputs){
    let body_query = ({
        "index": "discordmessages*",
        "query": {
            "query": {
                "bool": {
                    "filter": {
                        "terms": {

                        }
                    }
                }
            },
            "size": mah_inputs.size
        }
    })
    if ("match_guilds" in mah_inputs){
        // guild_id
        body_query.query.query.bool.filter.terms["guild_id"] = mah_inputs.match_guilds
    }
    if ("match_channels" in mah_inputs){
        // channel_id
        body_query.query.query.bool.filter.terms["match_channels"] = mah_inputs.match_channels
    }
    if ("match_users" in mah_inputs){
        // author.id 
        body_query.query.query.bool.filter.terms["match_users"] = mah_inputs.match_users
    }
    if ("agg_guilds" in mah_inputs){
        body_query.query.aggs = {
            "keys": {
                "terms": {
                    "field": "guild_id",
                    "size": mah_inputs.agg_size
                }
            }
        }
    }
    if ("agg_channels" in mah_inputs){
        body_query.query.aggs = {
            "keys": {
                "terms": {
                    "field": "channel_id",
                    "size": mah_inputs.agg_size
                }
            }
        }
    }
    if ("agg_users" in mah_inputs){
        body_query.query.aggs = {
            "keys": {
                "terms": {
                    "field": "author.id ",
                    "size": mah_inputs.agg_size
                }
            }
        }
    }
    let myData = await (await fetch('/query', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body_query)
    })).json()
    console.log("discord_body_query")
    console.log(body_query)
    console.log(myData)
    return myData
}

export async function discord_backend_api(mah_json){
    console.log("mah_json")
    console.log(mah_json)
    switch (mah_json.query_name) {
        case 'most_messages_per_user': {
            return most_messages_per_user(mah_json.inputs.guild_id)
        }
        case 'most_message_per_channel': {
            return most_message_per_channel(mah_json.inputs.guild_id)
        }
        case 'user_ids_to_users': {
            return user_ids_to_users(mah_json.inputs.users)
        }
        case 'channel_ids_to_channels' : {
            return channel_ids_to_channels(mah_json.inputs.channels)
        }
        case 'query_builder' : {
            return await query_builder(mah_json.inputs)
        }
        default:  {   
            return "Error"
        }
    }
}
