const mongoose = require("mongoose")
const Document = require("./Document")

mongoose.connect( 'mongodb://localhost/google-docs-clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,


})

const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

const defaultValue = ""

io.on("connection", socket => {
  socket.on("get-document", async documentId => {
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit("load-document", document.data)

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)/* quer fazer um broadcast message para todos menos para nos que tem alteracoes que eles deveriam receber */
    })

    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, { data })/* acha o documento por id e salva ele */
    })
  })
})

async function findOrCreateDocument(id) {
  if (id == null) return

  const document = await Document.findById(id)
  if (document) return document/* se nao tiver um documento criamos ele com um id e data */
  return await Document.create({ _id: id, data: defaultValue })
}
  
