import express from "express";
import { updateUser, deleteUser, getAllUser, getSingleUser } from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.put('/:id', verifyAdmin, updateUser)

router.delete('/:id', verifyAdmin, deleteUser)

router.get('/:id', getSingleUser)

router.get('/', verifyAdmin, getAllUser)



export default router;