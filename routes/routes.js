import { Router } from 'express';
import { getAllJoyas, getFilteredJoyas } from '../src/controllers/joyas.controllers.js';

const router = Router();

// Ruta GET /joyas
router.get('/joyas', getAllJoyas);

// Ruta GET /joyas/filtros
router.get('/joyas/filtros', getFilteredJoyas);

export default router;
