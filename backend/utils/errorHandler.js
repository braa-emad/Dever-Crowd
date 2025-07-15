class ErorHandler extends Error{
    constructor(){
        super();
    }
    create(message, statusCode, errors){
        this.message = message;
        this.statusCode = statusCode;
        this.errors = errors
        return this;
    }
}
module.exports = new ErorHandler();