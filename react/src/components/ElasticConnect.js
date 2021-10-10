import { Client } from '@elastic/elasticsearch'


export async function ElasticConnect(){
    let elastic_node = "https://elasticsearch.complexityweekend.xyz"
    let elastic_user = "elastic"
    let elastic_pass = "IdZYY9QeF0H2kjJC8eXbluBaYh6ZJdM"
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
    const { body } = await client.search({
        index: 'dentropydaemon-keybase',
        // type: '_doc', // uncomment this line if you are using {es} ≤ 6
        body: {
          query: {
            match: { quote: 'daemon' }
          }
        }
    })
    console.log(body.hits.hits)

}