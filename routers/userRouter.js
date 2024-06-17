const { getUsers, postUser, deleteUser, updateUser } = require("../controllers/userController")

const router = require("express").Router()

router.get("/getusers", getUsers)
router.post("/postuser", postUser)
router.delete("/deleteUser/:id", deleteUser)
router.patch("/updateuser/:id", updateUser)

module.exports = router