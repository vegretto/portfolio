import WorkModel from "../models/work-model.js";

class WorksController {
    async getWorks(req, res, next) {
        try {
            const works = await WorkModel.find()
            return res.json(works)
        } catch (e) {
            console.log(e.message)
            return res.status(500).json({message: "Ошибка сервера"})
        }
    }

    async addWork(req, res, next) {
        try {
            const {type, link, name} = JSON.parse(req.body.document)
            const imgSrc = req.file.originalname.split('.')[0];

            await WorkModel.create({type, link, imgSrc, name})
            return res.status(200).json("Работа добавлена")
        } catch (e) {
            console.log(e.message)
            return res.status(500).json({message: "Ошибка сервера"})
        }
    }
}

export default new WorksController()