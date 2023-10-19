const express = require('express');
const app = express();
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const multer = require("multer")
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser")
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
const postRouter = require('./routes/posts')
const commentRouter = require('./routes/comments')
dotenv.config();

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB Connected Successfully !")
    }catch(err) {
        console.log(err)
    }
}

app.use(express.json());
app.use("/images", express.static(path.join(__dirname,"/images")))
app.use(cookieParser());
app.use(cors({origin:"https://craftzblog.netlify.app/",credentials:true}))
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/comments', commentRouter)


//IMAGE UPLOAD
const storage = multer.diskStorage({
    destination:(req, file, fn) => {
        fn(null, "images")
    },
    filename:(req, file, fn) => {
        // console.log(req.body)
        // console.log(file)
        fn(null, req.body.img)
        // fn(null, file.originalname)
    }
})

const upload = multer({storage:storage})

app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("Image has Been uploaded Successfully!")
})

app.get('/', (req, res) => {
    res.send("Server is Running Fine!")
})
app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Listening at Port ${process.env.PORT}`);
})