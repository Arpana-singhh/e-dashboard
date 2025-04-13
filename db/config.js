const mongoose = require('mongoose')
mongoose.connect('mongodb://0.0.0.0:27017/e-commerce',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})