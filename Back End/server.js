import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import cors from "cors"
import cookieParser from "cookie-parser"
import connectCloud from "./config/cloudnery.js";
// routes 
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoute.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/orderRouts.js"
import adminRoutes from "./routes/adminRoutes/adminRoute.js"

dotenv.config();
connectDb() ;
connectCloud()
const app = express()

app.set("trust proxy", 1);

const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL?.replace(/\/$/, ""),
    "http://localhost:5173",
    "http://localhost:3000",
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
            return callback(null, true);
        }
        return callback(null, false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
}))

app.use(cookieParser())
app.use(express.json())



app.use("/api/auth", authRoutes)
app.use("/api/products" , productRoutes )
app.use("/api/cart", cartRoutes )
app.use("/api/order" , orderRoutes )

app.use("/api/admin" , adminRoutes )


const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

