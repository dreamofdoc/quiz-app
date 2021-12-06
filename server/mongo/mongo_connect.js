const { connect } = require('mongoose');

connect(process.env.DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});