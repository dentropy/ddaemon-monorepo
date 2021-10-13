// import { Context2 } from "./Context";

// export const ElasticQuerier =  (props) => {

//   // {
//   //   "most":"message",
//   //   "per" :"team"
//   // }
//   useEffect((props) => {
//     const [context, setContext] = useState();
//     async function doAsync() {
//       //let query_field = "msg.channel.topic_name.keyword" // "msg.content.type"
//       console.log("useEffect")
//       console.log(props.query_field)
//       let myData = await (await fetch('/query', {
//         method: 'POST', 
//         headers: {
//           'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify({
//           "index": "keybase-dentropydaemon",
//           "query": {
//             "query": {
//               "bool": {
//                 "must": [{
//                   "exists": {
//                     "field": props.per
//                     },
//                   },{ "match": {
//                     `${props.per}` : {"query": props.most}
//                     }
//                 }
//               ]
//               }
//             },
//             "aggs": {
//               "keys": {
//                 "terms": {
//                   "field": props.per
//                 }
//               }
//             },
//             "size": 0
//           }
//         })
//       })).json()
//       let formatted_data = {'table':[]}
//       console.log(myData.aggregations.keys.buckets)
//       myData.aggregations.keys.buckets.forEach((thingy) => {
//         formatted_data.table.push(thingy)
//       })
//       console.log(formatted_data)
//       setData(formatted_data);
//       setGraph(<VegaLite spec={spec} data={formatted_data} view='svg'/>)
//     }
//     doAsync()
//   }, []);
// }