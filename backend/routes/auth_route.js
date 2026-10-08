import express from 'express';
import { Login, register } from '../controller/auth_controller.js';
import { createNote, deleteNote, getAllNotes, updateNote } from '../controller/notes_controller.js';
import middleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register',register);
router.post('/login',Login);

router.get('/notes', middleware, getAllNotes);
router.post('/notes', middleware, createNote);


router.put('/notes/:id', middleware, updateNote);
router.delete('/notes/:id', middleware, deleteNote);

export default router