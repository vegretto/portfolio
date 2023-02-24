import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import works from './routes/works.routes.js'
import auth from './routes/auth.routes.js'
import experience from './routes/experience.routes.js'
import mongoose from 'mongoose'
import errorMiddleware from './middlewares/error-middleware.js'

const __dirname = path.resolve();

const PORT = process.env.PORT ?? 5000;
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use('/api/works', works)
app.use('/api/auth', auth)
app.use('/api/experience', experience)
app.use(errorMiddleware)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')));
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}
const start = async () => {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}...`)
        });
    } catch (e) {
        console.log(e);
    }
}

start();


