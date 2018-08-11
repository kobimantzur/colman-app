import { Ingredient } from "../shared/ingredient.modle";

export class Recipe{
    public _id: String;
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];
    public address: string;
    public latitude: string;
    public longitude: string;


    constructor(name: string , desc: string, imagePath: string, ingredients: Ingredient[]){
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ingredients; 
     }
}