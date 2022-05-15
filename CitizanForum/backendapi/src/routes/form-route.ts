import { Router } from 'express';
import FormsController from '../controllers/form-controller';
import formMiddleware from '../middlewares/form-middleware';

class FormsRoutes {
    router = Router();
    formsController = new FormsController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {

        //get all forms
        this.router.route('/getall').get(
            this.formsController.getAll);

        //get single form
        this.router.route('/getsingle').get(
            this.formsController.getSingle);

        //get forms by filter
        this.router.route('/').get(
            this.formsController.get);

        //create form
        this.router.route('/').post(
            formMiddleware.verifyRequest,
            formMiddleware.verifyParam,
            this.formsController.insert);
    }
}
export default new FormsRoutes().router;