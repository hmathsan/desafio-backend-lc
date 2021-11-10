import dotenv from 'dotenv';

import {initServer} from './adapter/server';

dotenv.config();

const PORT = process.env.SERVER_PORT || 5000;

initServer()
    .then(server => {
        server.listen(PORT, () => {
            console.info("Server running. Listening to port " + PORT)
        })
    })
    .catch(e => {
        console.error(e)
    })