const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

// Pasta onde os arquivos serão gerenciados
const filesDir = path.join(__dirname, 'files');

// Cria a pasta se não existir
if (!fs.existsSync(filesDir)) {
  fs.mkdirSync(filesDir);
}

/**
 * 📄 Criar arquivo
 * body: { "name": "exemplo.txt", "content": "Olá mundo" }
 */
app.post('/files', (req, res) => {
  const { name, content } = req.body;
  const filePath = path.join(filesDir, name);

  fs.writeFile(filePath, content || '', (err) => {
    if (err) return res.status(500).send('Erro ao criar arquivo');
    res.status(201).send('Arquivo criado com sucesso!');
  });
});

/**
 * 📂 Listar arquivos
 */
app.get('/files', (req, res) => {
  fs.readdir(filesDir, (err, files) => {
    if (err) return res.status(500).send('Erro ao listar arquivos');
    res.json(files);
  });
});

/**
 * 📖 Ler arquivo
 */
app.get('/files/:name', (req, res) => {
  const filePath = path.join(filesDir, req.params.name);

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return res.status(404).send('Arquivo não encontrado');
    res.send(data);
  });
});

/**
 * ✏️ Renomear arquivo
 * body: { "newName": "novo.txt" }
 */
app.put('/files/:name', (req, res) => {
  const oldPath = path.join(filesDir, req.params.name);
  const newPath = path.join(filesDir, req.body.newName);

  fs.rename(oldPath, newPath, (err) => {
    if (err) return res.status(500).send('Erro ao renomear arquivo');
    res.send('Arquivo renomeado com sucesso!');
  });
});

/**
 * 🗑️ Deletar arquivo
 */
app.delete('/files/:name', (req, res) => {
  const filePath = path.join(filesDir, req.params.name);

  fs.unlink(filePath, (err) => {
    if (err) return res.status(404).send('Arquivo não encontrado');
    res.send('Arquivo deletado com sucesso!');
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
