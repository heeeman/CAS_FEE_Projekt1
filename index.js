const serve = require('serve')

/*Verzeichnis static/ auf Port 3000 ausliefern*/
const server = serve('./', {
  port: 3000
})
