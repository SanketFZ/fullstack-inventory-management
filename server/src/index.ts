import express, { request } from "express"
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors"
import dotenv from "dotenv"
import dashboardRoutes from "./routes/dashboardRoutes"
import productRoutes from "./routes/productRoutes"
import userRoutes from "./routes/userRoutes"
import expenseRoutes from "./routes/expenseRoutes"

/* ROUTE IMPORTS */

/* CONFIGURATIONS */
dotenv.config()
const app = express();
app.use(express.json())
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy());
app.use(morgan("common"));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

/* ROUTES */
app.use("/dashboard",dashboardRoutes);
app.use("/products",productRoutes);
app.use("/users",userRoutes);
app.use("/expenses",expenseRoutes);


/* SERVER */
const port = process.env.PORT || 3001
app.listen( port,()=> {
    console.log(`Server is running at ${port}`);
});
