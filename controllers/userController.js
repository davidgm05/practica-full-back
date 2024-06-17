const User = require("../models/userModel")

const getUsers = async (req,res) =>  {
    try{
        const users = await User.find();
        if(!users){
            return res.status(204).json({
                status: "error",
                message: "no se encontraron usuarios"
            })
        }
        return res.status(200).json({
            status: "success",
            data: users
        })
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "no se pudo traer los usuarios"
        })
    }
}

const postUser = async (req,res) => {
    try{
        const {nombre, apellido}= req.body;
        const newUser = new User({
            nombre,
            apellido
        })
        await newUser.save();
        return res.status(200).json({
            status: "success",
            data: newUser,
        })
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "no se pudo crear"
        })
    }
}

const deleteUser = async (req,res) => {
    try{
       const userId = req.params.id;
       const user = await User.findByIdAndDelete(userId)
       if(!user){
        return res.status(404).json({
            status: "error",
            message: "no se encontro el usuario",
           })
       }
       return res.status(200).json({
        status: "success",
        data: userId,
       })
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "no se pudo borrar"
        })
    }
}

const updateUser = async (req,res) => {
    try{
       const userId = req.params.id;
       const {nombre, apellido} = req.body;
       if(!userId){
        return res.status(404).json({
            status: "error",
            message: "no se encontro el usuario",
        })
       }
       const userToUpdate = await User.findByIdAndUpdate(
        userId,
        {nombre, apellido},
        {new: true},
       )
       return res.status(200).json({
        status: "success",
        data: userToUpdate,
       })
     } catch (error) {
         return res.status(400).json({
             status: "error",
             message: "no se pudo actualizar"
         })
     }
}

module.exports = {getUsers, postUser, deleteUser, updateUser}