const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const rootRouter = require('./routes/index');

app.use(express.json());
app.use(express.static('./public'));

app.use(cors());
app.listen(8080, () => { })
app.use('/api', rootRouter);
