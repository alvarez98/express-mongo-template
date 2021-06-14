const updateOne = require('../../db/controllers/updateOne')
const findOne = require('../../db/controllers/findOne')
const add = require('../../db/controllers/add')
const models = require('../../db/keys')

const onConnection = async (socket) => {
  try {
    const { user: client, data } = socket.handshake.query
    const clientExist = await findOne(models.CONNECTION, {
      client,
      data
    })
    if (clientExist) {
      await updateOne(models.CONNECTION, { _id: clientExist.id }, {
        socket: socket.id,
        isConnected: true
      })
    } else {
      await add(models.CONNECTION, {
        client,
        data,
        socket: socket.id
      })
    }
    socket.once('disconnect', async () => {
      await updateOne(models.CONNECTION, { socket: socket.id }, {
        isConnected: false
      }).catch(err => console.log(err))
    })
  } catch (error) {
    console.log('Error: ', error)
  }
}

module.exports = onConnection
