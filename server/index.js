require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./routes/auth')
const ingredientRouter = require('./routes/ingredient')
const userRouter = require('./routes/user')
const mealRouter = require('./routes/meal')
// const postRouter = require('./routes/post')

const connectDB = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@What2Cook.73xag7r.mongodb.net/What2Cook?retryWrites=true&w=majority`,
			{
				useCreateIndex: true,
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false
			}
		)

		console.log('MongoDB connected')
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	}
}

connectDB()

const app = express()
app.use(express.json({ limit: '200mb' }))
app.use(cors())

app.use('/auth', authRouter)
app.use('/ingredients', ingredientRouter)
app.use('/user', userRouter)
app.use('/meals', mealRouter)
// app.use('/api/posts', postRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))


// const express = require("express");
// const TeachableMachine = require("@sashido/teachablemachine-node");
// const { createCanvas, loadImage } = require("canvas")

// const model = new TeachableMachine({
// 	modelUrl: "https://teachablemachine.withgoogle.com/models/-KQ-_epFH/"
// });

// const app = express();
// app.use(express.json())
// const port = 5000;

// app.post("/", async (req, res) => {
// 	const { url } = req.body;
// 	// const photo = req.body.photo
// 	// const img = await loadImage(photo)

// 	return model.classify({
// 		imageUrl: url,
// 	}).then((predictions) => {
// 		console.log(predictions);
// 		return res.json(predictions);
// 	}).catch((e) => {
// 		console.error(e);
// 		res.status(500).send("Something went wrong!")
// 	});
// });

// app.listen(port, () => {
// 	console.log(`Example app listening at http://localhost:${port}`);
// });
