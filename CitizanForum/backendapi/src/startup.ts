import express from 'express';
import { Application } from 'express';
import Server from '.';


const app: Application = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3100;

const server: Server = new Server(app);

app.listen(port, 'localhost', function () {

    console.info(`Server running on : http://localhost:${port}`);

  }).on('error', (err: any) => {

    if (err.code === 'EADDRINUSE') {
      console.log('server startup error: address already in use');
    } else {
      console.log(err);
    }

  });