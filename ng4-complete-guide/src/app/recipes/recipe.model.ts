export class Recipe{

    // Longer method
/*  public name: string;
    public description: string;
    public imagePath: string;

    constructor(name:string, desc:string, imagePath:string){
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
    }*/

    // Shorter TS way
    constructor(public name: string, public description: string, public imagePath: string){}
}