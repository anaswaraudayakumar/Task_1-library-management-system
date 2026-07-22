const mongoose = require('mongoose')
const connectionString = process.env.DB_CONNECTIONSTRING

mongoose
    .connect(connectionString)
    .then(() => {
        console.log('Database connection String Successfull')
    })
    .catch((error) => {
        console.log('Database connection string failed')
        console.log(error)
    })
