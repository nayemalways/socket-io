import express from 'express'
import { baseRoute, createUser, getActiveUsers, login } from '../models/controllers/user.controller.js';


export const router = express.Router();


router.get('/', baseRoute)
router.post('/signup', createUser )
router.post('/login', login )
router.get('/active_users', getActiveUsers )