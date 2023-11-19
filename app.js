



import  express, { urlencoded }  from 'express'
import cookieParser from 'cookie-parser'
import  cors from 'cors'
import morgan from 'morgan'
import userRoutes from './routes/user.routes.js'
import courseRoutes from './routes/course.routes.js'
import path from "path";
const __dirname = path.resolve();
import errorMiddleware from './middleware/error.middleware.js'
import bodyParser from 'body-parser'
import { config } from 'dotenv'
config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());
app.use(morgan('dev'))
// app.use(bodyParser.json({extended : true}))
// app.use(bodyParser.json({urlencoded : true}))


app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use('/user' , userRoutes)
app.use('/course' , courseRoutes)

//routes of three modules 
app.use(express.static(path.join(__dirname, "./client/dist")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/dist/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.all('*', (req, res) => {
    res.status(404).send('opps! 404 page not found')
});

app.use(errorMiddleware);

export default app