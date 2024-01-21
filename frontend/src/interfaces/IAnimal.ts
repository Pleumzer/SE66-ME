import { AnimalTypeInterface } from "./IAnimalType"
import { AnimalReproductionTypeInterface } from "./IReproductionType";
import { SexsInterface } from "./IAnimalSex"
import { ImageUpload } from "./IUpload";

export interface AnimalInterface{
    ID ? : number;
    Animal_Name?: string;
    Animal_Biomial_Name?: string;
    Animal_Abode?:string;
    Animal_Register_Date?:number;
    Animal_Birthday_Date?:number;
    AnimalSexID?:number;
    AnimalSex?:SexsInterface
    AnimalTypeID?:number;
    AnimalType?:AnimalTypeInterface;
    ReproductionTypeID?:number;
    ReproductionType?:AnimalReproductionTypeInterface;
    Animal_Profile?:string;
}