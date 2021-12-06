const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
require('./mongo/mongo_connect');
const questionRoute = require('./routes/questions.routes');
const userRoute = require('./routes/users.routes');

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/api', questionRoute);
app.use('/api/auth', userRoute);

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
