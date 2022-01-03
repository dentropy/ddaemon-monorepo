

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