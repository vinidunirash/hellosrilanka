import express from "express";
import { GenericResponse, QueryBuilder } from "vinidun-core-dev";
import { InsertFormRequest } from "../domains/dtos/fom.dto";
import formDomain from "../domains/form.domain";


export default class FormsController {

    async getAll(req: express.Request, res: express.Response) {

        try {
            formDomain.findAll().then(e => {
                res.send(e);
            })
        }
        catch (error) {
            res.send();
        }
    }

    async getSingle(req: express.Request, res: express.Response) {

        try {
            formDomain.findById(req.params.id).then(e => {
                res.send(e);
            })
        }
        catch (error) {
            res.send();
        }
    }


    //filter :
    //http://localhost:3100/forms?name=Vinidu Nirah

    //select :
    //http://localhost:3100/forms?select=suggestions

    //sort :
    // (-) descending
    //http://localhost:3100/forms?sort=-name

    //page
    //http://localhost:3100/forms?skip=0&limit=2
    async get(req: express.Request, res: express.Response) {

        console.log(req.query);

        try {

            const queryBuilder = new QueryBuilder();
            const predefined = {
                vip: { name: { $in: ['Google', 'Microsoft', 'NodeJs'] } },
                sentStatus: 'sent'
            };

            const parsedQuery = queryBuilder.parse(req.query);

            formDomain.find(parsedQuery).then(e => {
                res.send(e);
            })
        }
        catch (error) {
            res.send();
        }
    }

    async insert(req: express.Request, res: express.Response) {

        try {

            let entity = <InsertFormRequest>req.body;
            formDomain.insertSingleFrom(entity).then((value: GenericResponse) => {
                return res.send(value);
            }).catch((ereor: any) => {
                return res.send(ereor);
            });
        }
        catch (error) {
            res.send();
        }
    }
}