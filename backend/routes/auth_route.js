import express from 'express';
import { Login, refreshAccessToken, register } from '../controller/auth_controller.js';
import { createNote, deleteNote, getAllNotes, getNote, updateNote } from '../controller/notes_controller.js';
import middleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register',register);
router.post('/login',Login);

router.get('/notes/:id', middleware, getNote);
// router.get('/admin/notes', middleware, getAllNotes);

router.post('/notes', middleware, createNote);
router.post('/refresh', refreshAccessToken);

router.put('/notes/:id', middleware, updateNote);
router.delete('/notes/:id', middleware, deleteNote);

export default router