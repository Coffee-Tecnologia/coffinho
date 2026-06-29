import 'dotenv/config';
import express from 'express';
import chatRouter from './routes/chat.js';
import feedbackRouter from './routes/feedback.js';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', chatRouter);
app.use('/api', feedbackRouter);

const port = process.env.PORT ?? 3001;
app.listen(port, () => {
  console.log(`Coffinho AI rodando em http://localhost:${port}`);
});
