export class Record {

    public _id: string;
    public firstName: string;
    public lastName: string;
    public emailAddress: string;

    constructor(input: Object) {

        this._id = input["_id"];
        this.firstName = input["firstName"];
        this.lastName = input["lastName"];
        this.emailAddress = input["emailAddress"];
    }
    
}