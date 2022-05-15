import formRepository from "../data/repositories/form.repository";
import { GenericDomain, GenericResponse } from "vinidun-core-dev";
import { Form } from "../data/schemas/form.schema";
import { InsertFormRequest } from "./dtos/fom.dto";
import { Config } from "../config/config";

class FormDomain extends GenericDomain<Form> {

    constructor() {
        super(formRepository);
    }

    public async insertSingleFrom(param: InsertFormRequest): Promise<GenericResponse> {

        try {

            //insert to database
            let entity = <Form>
                {
                    date: param.date,
                    name: param.name,
                    digitalIdentity: param.digitalIdentity,
                    digitalIdentityLink: param.digitalIdentityLink,
                    subjectArea: param.subjectArea,
                    suggestions: param.suggestions,

                }
            formRepository.insertSingle(entity);

            //update google sheet
            const fs = require("fs");
            const { google } = require('googleapis')
            const credentials = require("../config/google-credentials.json");
            const service = google.sheets("v4");
            const config: Config = require(`../config/${process.env.NODE_ENV}-config.json`);

            const authClient = new google.auth.JWT(
                credentials.client_email,
                null,
                credentials.private_key.replace(/\\n/g, "\n"), [config.googleAPI]
            );
            const token = await authClient.authorize();
            authClient.setCredentials(token);

            const res = await service.spreadsheets.values.append({
                auth: authClient,
                spreadsheetId: config.spreadSheetId,
                range: "A:B",
                valueInputOption: 'RAW',
                insertDataOption: 'INSERT_ROWS',
                resource: {
                    values: [
                        [param.date, param.name, param.digitalIdentity, param.digitalIdentityLink, param.subjectArea, param.suggestions]
                    ],
                },
            });


            return { message: "The form created successfully.", messageType: "success" };
        }
        catch {
            return { message: "Application error occered.", messageType: "danger" };
        }
    }
}

Object.seal(FormDomain);

export default new FormDomain();