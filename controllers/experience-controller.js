import ExperienceModel from "../models/experience-model.js";


class ExperienceController {
    async getExperiences(req, res, next) {
        try {
            const experiences = await ExperienceModel.find()
            return res.json(experiences)
        } catch (e) {
            console.log(e.message)
            return res.status(500).json({message: "Ошибка сервера"})
        }
    }

    async getSingleExperience(req, res, next) {
        try {
            const id = req.body.id
            const experience = await ExperienceModel.findById(id)
            return res.json(experience)
        } catch (e) {
            console.log(e.message)
            return res.status(500).json({message: "Ошибка сервера"})
        }
    }

    async addExperience(req, res, next) {
        try {
            const data = req.body
            await ExperienceModel.create(data)
            return res.status(200).json("Опыт добавлен")
        } catch (e) {
            console.log(e.message)
            return res.status(500).json({message: "Ошибка сервера"})
        }
    }

    async updateExperience(req, res, next) {
        try {
            const {_id, company, link, companyDescription,
                companyDescriptionDetails, jobTitle,
                jobResponsibilities, period} = req.body
            await ExperienceModel.updateOne({_id},
                {$set:{_id, company, link, companyDescription,
                    companyDescriptionDetails, jobTitle,
                    jobResponsibilities, period}})
            return res.status(200).json("Опыт отредактирован")
        } catch (e) {
            console.log(e.message)
            return res.status(500).json({message: "Ошибка сервера"})
        }
    }

    async deleteExperience(req, res, next) {
        try {
            const id = req.body.id
            const experience = await ExperienceModel.findById(id)
            await ExperienceModel.deleteOne(experience)
            return res.status(200).json("Опыт удален")
        } catch (e) {
            console.log(e.message)
            return res.status(500).json({message: "Ошибка сервера"})
        }
    }
}

export default new ExperienceController()