 const mongoose = require('mongoose');
 const mongoDb = process.env.MONGODB_URI
mongoose.connect(mongoDb,{
useNewUrlParser: true,
 useUnifiedTopology: true
}).then(() => {
    console.log('DB is connected')
}).catch(err => console.log(err))
