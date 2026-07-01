import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import chatRouter from './routes/chat.js';
import feedbackRouter from './routes/feedback.js';
import adminRouter from './routes/admin.js';
import { warnIfMissingAdminKey } from './middleware/adminAuth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Painel admin (HTML estático — sem auth na rota, o JS faz o login)
app.get('/admin', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'admin.html'));
});

app.use('/api', chatRouter);
app.use('/api', feedbackRouter);
app.use('/api', adminRouter);

const port = process.env.PORT ?? 3001;
app.listen(port, () => {
  console.log(`Coffinho AI rodando em http://localhost:${port}`);
  warnIfMissingAdminKey();
});
