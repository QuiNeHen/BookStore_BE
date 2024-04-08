const Reader = require("../../models/reader.model");
const asyncHandler = require('express-async-handler');
const generateString = require("../../helpers/generateString");



const create = asyncHandler(async (req, res) => {
    try {
        req.body.token = generateString.generateRandomString(20);
        const user = await Reader.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ massage: `Error! ${error}` });
    }
})


const getUser = asyncHandler(async (req, res) => {
    try {
        const tokenUser = req.headers.authorization.split(" ")[1];
        const reader = await Reader.findOne({
            token: tokenUser
        })
        res.status(200).json({ message: "Send reader successfully.", reader });
    } catch (error) {
        res.status(500).json({ massage: `Error! ${error}` });
    }
})


const getInfor = asyncHandler(async(req, res) => {
    try {
        const token = req.cookies.tokenUser;
        const reader = await Reader.findOne({
            token: token,
        })
        res.status(200).json({ message: 'Send employee successfully', reader });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

module.exports = {
    create,
    getUser,
    getInfor,
}