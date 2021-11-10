import fs from 'fs';
//const fs = require('fs');
let rawdata = fs.readFileSync('test.json');
let something = JSON.parse(rawdata);

// Get all the values
let preprocess_list = []
let values_list = []
for (const [key, value] of Object.entries(something.aggregations.departments.buckets)) {
  //console.log(`${key}: ${Object.keys(value)} ${(value.key)} ${(value.doc_count)}`);
  preprocess_list.push(value)
  values_list.push(value.doc_count)
}

// Sort them
values_list.sort()
console.log(values_list)

// Go through the values and the list recursively removing 
values_list = values_list.filter(function(elem, pos) {
  return values_list.indexOf(elem) == pos;
})
console.log(values_list)

// from the list each value and adding it to the other list
let result_list = []
for(var i = 0; i < values_list.length; i++){
  for(var j = 0; j < preprocess_list.length; j++){
    //console.log(preprocess_list[j])
    if(preprocess_list[j].doc_count == values_list[i]){
      result_list.push(preprocess_list[j])
    }
  }
}
result_list.splice(0, result_list.length - 10);
result_list.reverse()

// Get the keys
let the_keys = []
result_list.forEach((key) => {
  the_keys.push(key.key)
})
console.log(the_keys)