const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const multer = require("multer")

const User = require("../models/User")

//configure multer for file upload

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/") // store uploads 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // use orignal of the file
    },
})

// User register

const upload = multer({ storage })

router.post("/register", upload.single('profileImage'), async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body

        const profileImage = req.file

        if (!profileImage) {
            return res.status(400).send("No file uploaded")
        }

        const profileImagePath = profileImage.path
        // console.log(profileImagePath)

        // check if user exist

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exist!" })
        }

        // hash the password

        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashPassword,
            profileImagePath,
        })
        // save user 

        await newUser.save()

        // send a succesfull message

        res.status(200).json({ message: "User registered successfully!", user: newUser })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Registration failed!", error: err.message })
    }
})

module.exports = router