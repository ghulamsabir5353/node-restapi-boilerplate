const compression = require('@loaders/compression');
const morgan = require('@loaders/morgan');
const cors = require('@loaders/cors');
const swagger = require('@loaders/swagger');
const db = require('@loaders/db');
const bodyParser = require('@loaders/bodyParser');
const routes = require('@loaders/routes')

async function init({expressApp}){
    await compression(expressApp)
    await morgan(expressApp)
    await cors(expressApp)
    await swagger(expressApp)
    await db(expressApp)
    await bodyParser(expressApp)
    await routes(expressApp)
}

module.exports = {init}