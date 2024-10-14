const autoBind = require("auto-bind");
const OptionModel = require("./option.model");


class OptionService {
    #model;
    constructor() {
        autoBind(this);
        this.#model = OptionModel;
    }

    async create() {
        
    }
};

module.exports = new OptionService();