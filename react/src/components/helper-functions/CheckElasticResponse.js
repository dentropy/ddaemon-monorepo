export function CheckElasticResponse(tmp_input) {
    if ("aggregations" in Object.keys(tmp_input)){
        return true
    }
    else {
        return false
    }
}