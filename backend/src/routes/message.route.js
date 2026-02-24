import express from 'express'
import { getAllChats, getAllContacts, getMessagesByUserId, sendMessage } from '../controllers/message.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

//This runs protectRoute middleware before every route
router.use(protectRoute)

//These routes has to be in this order as /:id can't be any higher as it is dynamic and accept any value
router.get('/contacts',getAllContacts)
router.get('/chats',getAllChats)
router.get('/:id',getMessagesByUserId)
router.post('/send/:id',sendMessage)

export default router;