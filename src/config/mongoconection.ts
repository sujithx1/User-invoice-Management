

import mongoose from "mongoose";



export const DB_Connection=()=>{
mongoose.connect(process.env.MONGO_URL as string)
.then(()=>console.log('MongoDB connected...')
)
.catch((err)=>console.log('MongoDB-error', err))
}