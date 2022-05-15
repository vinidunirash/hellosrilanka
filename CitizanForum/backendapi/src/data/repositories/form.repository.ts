import { GenericRepository, FilterQuery } from "vinidun-core-dev";
import { Form, FormSchema } from "../schemas/form.schema";

class FormsRepository extends GenericRepository<Form> {
    constructor() {
        super(FormSchema.schema());
    }
}

Object.seal(FormsRepository);

export default new FormsRepository();