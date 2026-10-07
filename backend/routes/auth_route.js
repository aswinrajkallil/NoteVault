import express from 'express';
import { Login, register } from '../controller/auth_controller.js';
import { createNote, getAllNotes } from '../controller/notes_controller.js';

const router = express.Router();

router.post('/register',register);
router.post('/login',Login);

router.get('/notes',getAllNotes);
router.post('/notes',createNote);

export default router