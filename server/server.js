const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // usando node-fetch@2

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/submit-form', async (req, res) => {
    const { name,company, email, phone } = req.body;

    try {
        const response = await fetch('https://faelsouz0211.app.n8n.cloud/webhook/inicio-jornada', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, company, email, phone }),
        });

        const data = await response.text();
        res.status(200).send(data);
    } catch (err) {
        console.error('Erro ao enviar para o webhook:', err);
        res.status(500).send('Erro ao enviar para n8n');
    }
});

app.listen(3001, () => {
    console.log('Servidor proxy rodando em http://localhost:3001');
});
