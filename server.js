const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const multer = require('multer')
const { mergepdfs } = require('./merger.js')
const upload = multer({ dest: 'uploads/' })
app.use('/static', express.static(path.join(__dirname, './merged.pdf')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "client/index.html"))
})
app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, "client/style.css"))
})

app.post('/merge', upload.array("pdfs", 2), async (req, res, next) => {
  console.log(req.files[0])
  // res.send(req.files)
  await mergepdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
  res.redirect("/static")

})
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})