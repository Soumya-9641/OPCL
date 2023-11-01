const mongoose = require("mongoose");

const DB="mongodb+srv://soumya-9641:soumya@cluster0.y7qxfvq.mongodb.net/OPCL?retryWrites=true&w=majority" 



mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log(`connection successfull`)
}).catch((err)=>{
    console.log("no connection")
})