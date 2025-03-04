export class CustomError extends Error{
    success:boolean
    status:number
    error:string
    constructor(error:string, success:boolean=false, status:number=500){
        super(error)
        this.success = success,
        this.status= status ,
        this.error = error || "Something went wrong"
    }
}