const express = require('express')
const ConnectDB = require('./config/db')
const router = require('./routes/taskRoutes')
const cors = require('cors')

require('dotenv').config();
ConnectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/tasks', require('./routes/taskRoutes'))


const PORT = process.env.PORT || 5000
app.listen(PORT,
        ()=>console.log(`Server is running on http://localhost:${PORT}`)
    )