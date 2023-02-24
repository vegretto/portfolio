import Router from 'express'
import ExperienceController from '../controllers/experience-controller.js'

const router = Router();

router.get('/get-experience', ExperienceController.getExperiences)
router.post('/get-single-experience', ExperienceController.getSingleExperience)
router.post('/add-experience', ExperienceController.addExperience)
router.post('/update-experience', ExperienceController.updateExperience)
router.delete('/delete-experience', ExperienceController.deleteExperience)

export default router