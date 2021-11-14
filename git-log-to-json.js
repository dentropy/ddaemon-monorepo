const { exec } = require('child_process');

// Compile 'git log' command
const command = params =>
  `cd tmpRepo && git log --pretty=format:"
    ${params.join(command.format.param)}
    ${command.format.line}"`;

const hash = 451436388.16325235; //Math.random()*10e8;
command.format = {
  line: hash.toString(36),
  param: +hash.toString(36),
};

module.exports = (schema, post = (k,v) => v) => 
  new Promise((resolve, reject) => {
    const keys = Object.keys(schema);
    const params = keys.map(key => schema[key]);
    // Execute coomand and parse result
    exec(command(params), (err, stdout) => {
      if(err) reject(err)
      else resolve(stdout.split(command.format.line)
          .filter(line => line.length)
          .map(line => line.split(command.format.param)
            .reduce((obj, value, idx) => {
              const key = keys[idx];
              obj[key] = post(key, value);
              return obj;
            }, {})
          )
      );
    });
});