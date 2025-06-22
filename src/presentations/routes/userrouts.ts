

import express from "express"
import { userController } from "../../di/user.di"
import { generatenewAccessToken } from "../../config/jwt"
import { invoiceController } from "../../di/invoice.di"
import { Authentication } from "../middlewares/authentication"

const router=express.Router()



router.post('/login',(req,res,next)=>{
    userController.login(req,res,next)
})

router.post('/user',(req,res,next)=>{
    userController.create(req,res,next)
})
router.put('/user/:id',Authentication,(req,res,next)=>{
    userController.userUpdate(req,res,next)  
})
router.delete('/user/:id',Authentication,(req,res,next)=>{
    userController.deleteUser(req,res,next)  
})
router.post('/logout/:id',(req,res,next)=>{
    userController.deleteUser(req,res,next)  
})
router.get('/users',Authentication,(req,res,next)=>{    
    userController.getallusers(req,res,next) 
})

router.post('/invoice/:userId',Authentication,(req,res,next)=>{
    invoiceController.invoiceCreate(req,res,next)
})

router.get('/invoices/:userId',Authentication,(req,res,next)=>{
    invoiceController.getinvoiceByusers(req,res,next)
})

router.put('/invoice/:id/:userId',Authentication,(req,res,next)=>{
    invoiceController.invoiceUpdate(req,res,next)
})


router.delete('/invoice/:id/:userId',Authentication,(req,res,next)=>{
    invoiceController.invoicedelete(req,res,next)
})



router.post('/refresh/:role',(req,res)=>{ generatenewAccessToken(req,res)})




export {router}