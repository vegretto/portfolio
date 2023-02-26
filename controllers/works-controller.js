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

    async geSingleWork(req, res, next) {
        try {
            const id = req.body.id
            const work = await WorkModel.findById(id)
            return res.json(work)
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

    async updateWork(req, res, next) {
        try {
            const {_id, type, link, name} = JSON.parse(req.body.document)
            const imgSrc = req.file.originalname.split('.')[0];
            await WorkModel.updateOne({_id},
                {$set:{type, link, imgSrc, name}})
            return res.status(200).json("Работа отредактирована")
        } catch (e) {
            console.log(e.message)
            return res.status(500).json({message: "Ошибка сервера"})
        }
    }

    async deleteWork(req, res, next) {
        try {
            const id = req.body.id
            const work = await WorkModel.findById(id)
            await WorkModel.deleteOne(work)
            return res.status(200).json("Работа удалена")
        } catch (e) {
            console.log(e.message)
            return res.status(500).json({message: "Ошибка сервера"})
        }
    }
}

export default new WorksController()