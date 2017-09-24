const serve = require('serve')

/*Verzeichnis ./ auf Port 3000 ausliefern*/
const server = serve('./client/', {
  port: 3000
})
