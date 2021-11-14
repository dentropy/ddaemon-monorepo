#!/usr/bin/env node
const log = require('./git-log-to-json');

const tagName = /tag\:\s*v([\d|\.]*[-\.][\w]*)\,?/g;
const isTagName = str => {
  const match = tagName.exec(str);
  return match && match[1];
}

const changelog = {};

// get log info with mapped properties to log format, 
// https://git-scm.com/docs/git-log#_pretty_formats
log({ tag: "%d", note: "%N", msg: "%s"},  

  // replace \r\n etc from value
  (key, value) => value.replace(/\s\s/g,''))
    .then( records => {

      let tag = changelog['HEAD'] = [];
      records.forEach(record => {
        const tagName = isTagName(record.tag);
        if(tagName) tag = changelog[tagName] = [];
        tag.push(record.msg);
      })

      console.log(changelog);
    });