// elastic-glob.js
import { Client } from '@elastic/elasticsearch'
import fg from 'fast-glob'
import fs from 'fs'

async function dumb_to_elastic(
    export_dir,
    elastic_node,
    elastic_user,
    elastic_pass,
    elastic_index)
    {
    console.log("Started")
    const client = new Client({ 
        node: elastic_node,
        auth: {
            username: elastic_user,
            password: elastic_pass
        },
        ssl: {
            rejectUnauthorized: false
        }
    })
    // await client.indices.delete({
    //     index: elastic_index,
    // })
    let files_to_index = await fg.sync([`./${export_dir}/*json`])
    let create_index_cmd = await client.create({
        id: "PaulWasHerePlaceholder",
        index: elastic_index,
        body: {
            hello:"world"
        }
    })
    console.log(create_index_cmd)
    var response = await client.indices.putSettings({
        index: elastic_index,
        body:{
            "index.mapping.total_fields.limit": 4000
        }
    }
    )
    response = await client.indices.putMapping({
        index: elastic_index,
        body: {
          "properties": {
            "msg.channel.topic_name": { 
              "type":     "text",
              "fielddata": true
            }
          }
        }
      })
    for(let j = 0; j < files_to_index.length; j++){
        console.log("Indexing")
        let file_content = fs.readFileSync(files_to_index[j], 'utf8')
        let dataset = JSON.parse(file_content)
        const body = dataset.flatMap(doc => [{ index: { _index: elastic_index } }, doc])

        const { body: bulkResponse } = await client.bulk({ refresh: true, body })
    
        if (bulkResponse.errors) {
        const erroredDocuments = []
        // The items array has the same order of the dataset we just indexed.
        // The presence of the `error` key indicates that the operation
        // that we did for the document has failed.
        bulkResponse.items.forEach((action, i) => {
            const operation = Object.keys(action)[0]
            if (action[operation].error) {
            erroredDocuments.push({
                // If the status is 429 it means that you can retry the document,
                // otherwise it's very likely a mapping error, and you should
                // fix the document before to try it again.
                status: action[operation].status,
                error: action[operation].error,
                operation: body[i * 2],
                document: body[i * 2 + 1]
            })
            }
        })
        console.log(erroredDocuments)
        }
    
        const { body: count } = await client.count({ index: elastic_index })
        console.log(count)
    }
}


// export_dir,
// elastic_node,
// elastic_user,
// elastic_pass,
// elastic_index

dumb_to_elastic(
  "json_exports",
  "https://elasticsearch.complexityweekend.xyz",
  "elastic",
  "hxw8zSWFInI3m7zXZ6V1hJDb2hVvbB8",
  "gitrepos"
)
export {
    dumb_to_elastic
}