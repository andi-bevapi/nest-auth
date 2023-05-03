import { IsString, IsNotEmpty } from "class-validator";

export class Params{
    @IsString()
    @IsNotEmpty()
    public id:string;
    @IsString()
    @IsNotEmpty()
    public name:string;
    @IsString()
    @IsNotEmpty()
    public lastname:string;
}