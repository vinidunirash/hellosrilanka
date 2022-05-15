import { Application } from 'express';
import formRoute from './form-route';

export default class Routes {

  constructor(app: Application) {
    app.use('/forms', formRoute);
  }
}