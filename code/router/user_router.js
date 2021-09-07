import express from 'express'
import {
    getAllUser
} from '../controller/uesr_ctrl.js'
const router = new express.Router()

router.get('/user', getAllUser)

export default router