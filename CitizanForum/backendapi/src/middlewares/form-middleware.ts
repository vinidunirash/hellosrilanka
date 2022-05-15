import express from "express";

class FormMiddleware {

    //check the request body is null
    public verifyRequest(request: express.Request, response: express.Response, next: express.NextFunction) {
        if (request.body !== {}) {
            next();
        } else {
            response.status(400).send({
                error: `Invalid request`,
            });
        }
    }

    //validate parameters
    public verifyParam(request: express.Request, response: express.Response, next: express.NextFunction) {
        if (request.body.data, request.body.name, request.body.suggestions) {
            next();
        } else {
            response.status(400).send({
                error: `Required Fields are Missing`,
            });
        }
    }    
}

export default new FormMiddleware();
