const { connect } = require('mongoose');
const mongoose = require("mongoose");

mongoose.set('runValidators', true);
connect(process.env.DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});