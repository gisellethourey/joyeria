import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/routes.js';
import { serverLog } from './middleware/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(serverLog)

app.get('/', (req, res) => {
    res.send('Desafio Joyeria');
});

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server on 🔥 http://localhost:${PORT}`);
});
