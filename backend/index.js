const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Schema } = mongoose;


// Connection URL
const url = 'mongodb://localhost:27017/dataNueron';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then((res) => {
    console.log('successfully connected')
}).catch((err) => {
    console.log('error while connecting to DB', err)
})

const app = express();
const PORT = 3002;


const Data = new Schema({
    text: { type: 'string', required: true },
    boxNum: { type: 'number', required: true }
});

const dataModel = mongoose.model('data', Data);


// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors())

let data = {};

app.get('/getAllData', async (req, res) => {
    console.log({ data })
    const readRes = await dataModel.find();
    if (readRes)
        return res.json({ message: 'Data fetched successfully.', res: readRes });
    else
        return res.status(400).json({ message: 'error while fetching data', res: readRes });
});

// Add API endpoint
app.post('/add', async (req, res) => {
    console.log(req.body)
    const { text, boxNum } = req.body;
    if (!text || !boxNum) {
        return res.status(400).json({ message: 'Please fill all values' });
    }
    const writableData = req.body;
    const writeRes = await dataModel.create(writableData);
    if (writeRes)
        return res.json({ message: 'Data added successfully.', writeRes });
    else
        return res.status(400).json({ message: 'error while adding data', writeRes });
});

// Update API endpoint
app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: 'text can not be empty' });
    }
    const updatedData = await dataModel.findByIdAndUpdate(id, { text })
    res.json({ message: 'Data updated successfully.', res: updatedData });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
