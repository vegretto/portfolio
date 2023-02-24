import {Schema, model} from "mongoose";

const ExperienceSchema = new Schema({
    company: {type: String, required: true},
    link: {type: String, required: true},
    companyDescription: {type: String, required: true},
    companyDescriptionDetails: {type: Array, required: true},
    jobTitle: {type: String, required: true},
    jobResponsibilities: {type: Array, required: true},
    period: {type: String, required: true},
})

export default model('Experience', ExperienceSchema)