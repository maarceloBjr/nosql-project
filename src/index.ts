import express from 'express';
import connectDB from './config/db';
import userRoutes from './routes/user';
import loginRoutes from './routes/login';

const app = express();
const port = process.env.PORT || 3000;

// Conectar ao MongoDB
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Usar rotas
app.use('/api', userRoutes);
app.use('/api', loginRoutes);

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express and MongoDB!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
