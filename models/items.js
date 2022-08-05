import mongoose from "mongoose"

const itemsSchema = new mongoose.schema({
    codigo:{type:String,maxlenght:100,required:true},
    nombre:{type:String,maxlength:50,required:true},
    precio:{type:String,maxlength:50,required:true},
    estado:{type:String,required:true,default:1},
    duracion:{type:Date,required:true}

})
export default mongoose.model("items",itemsSchema)