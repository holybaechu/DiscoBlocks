const express = require('express');
const fs = require('fs');

const app = express();

function refreshRoutes(path) {
    fs.readdirSync(path).forEach(file => {
        if (fs.lstatSync(path + '/' + file).isDirectory()) {
            refreshRoutes(path + '/' + file);
        }else if(file.endsWith('.js')){
            if(path.startsWith('./routes')){
              app.use(path.substring(8) + '/' + file.substring(0, file.length-3), require(path + '/' + file));
            }
        }
    });
  }

refreshRoutes("./routes")

const port = process.env.PORT || 443
app.listen(port, function () {
    console.log('Listening on port ' + port);
})