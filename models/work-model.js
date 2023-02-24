import {Schema, model} from "mongoose";

const WorkSchema = new Schema({
    type: {type: String, required: true},
    link: {type: String, required: true},
    imgSrc: {type: String, required: true},
    name: {type: String, required: true}
})

export default model('Work', WorkSchema)