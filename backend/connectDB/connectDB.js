const mongoose = require('mongoose');

const connectDB = (uri)=>{
    return(
        mongoose.connect(uri).then(()=>{
            try {
                console.log("DealsDry Database Connected..");
            } catch (error) {
                console.error(error);
            }
        })
    )
}

module.exports = connectDB;