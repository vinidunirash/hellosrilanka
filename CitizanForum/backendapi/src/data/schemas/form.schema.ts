import mongoose = require("mongoose");
import { BaseEntity } from "vinidun-core-dev";

export interface Form extends BaseEntity {
    date: Date;
    name: string;
    digitalIdentity?: string;
    digitalIdentityLink?: string;
    subjectArea?: string;
    suggestions: string;
}


export class FormSchema {

    static schema() {
        let schema = new mongoose.Schema(
            {
                date: {
                    type: Date,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                digitalIdentity: {
                    type: String
                },
                digitalIdentityLink: {
                    type: String
                },
                subjectArea: {
                    type: String
                },
                suggestions:{
                    type: String,
                    required: true
                }
            });

        return mongoose.model<Form>("citizensform", schema);
    }
}
