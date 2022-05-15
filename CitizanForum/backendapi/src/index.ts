import cookieParser from "cookie-parser";
import express, { Application } from "express";
import { DbConnect } from "vinidun-core-dev";
import { Config } from "./config/config";
import Routes from "./routes";
import cors from 'cors';


export default class Server {

    constructor(app: Application) {

        this.config(app);
    }

    //setting up application configurations
    config = async (app: Application): Promise<void> => {
        //set up configurations considering the environment
        const config: Config = require(`./config/${process.env.NODE_ENV}-config.json`);

        //enable cros access
        app.use(cors());

        //enable cookie 
        app.use(cookieParser());

        //enable json requests and response
        app.use(express.json());

        //enable url encoded request and resposne
        app.use(express.urlencoded({ extended: true }));

        await DbConnect.disconnect();

        await DbConnect.connect(config);

        new Routes(app);
    }
}