require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
db.sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

db.sequelize.sync().then(() => {
  console.log('Drop and Resync Database with { force: true }');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});
