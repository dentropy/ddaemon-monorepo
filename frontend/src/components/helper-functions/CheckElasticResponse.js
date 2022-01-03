export function CheckElasticResponse(tmp_input) {
    // console.log("CheckElasticResponse")
    // console.log(tmp_input)
    // console.log(Object.keys(tmp_input).indexOf("aggregations") > -1 )
    // console.log(Object.keys(tmp_input).indexOf("aggregations") > -1 )
    if (Object.keys(tmp_input).indexOf("aggregations") > 1 ){
        return true
    }
    else {
        return false
    }
}