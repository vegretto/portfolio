import Router from 'express'
import multer from 'multer';
import worksController from '../controllers/works-controller.js'

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './client/src/assets/images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

router.get('/get-works', worksController.getWorks)
router.post('/get-single-work', worksController.geSingleWork)
router.post('/add-work', upload.single('img'), worksController.addWork)
router.post('/update-work', upload.single('img'), worksController.updateWork)
router.delete('/delete-work', worksController.deleteWork)

export default router