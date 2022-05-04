export class Ingredient{

    //Longer way of declaring attribute and the constructor fn
    /*
    public name: string;
    public amount:number;

    constructor(name:string, amount:number){
        this.name = name;
        this.amount = amount;
    }*/

    // TS shorter way:
    constructor(public name:string, public amount: number){}

}