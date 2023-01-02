const EventEmitter = require('events')
const uuid = require('uuid')

class Logger extends EventEmitter{

    log(msg){
        this.emit('message',{ id:uuid.v4(), msg:msg })
    }
}


const logger = new Logger()

//listener
logger.on('message', (data) => console.log('The data is ', data))

//emit
logger.log("Hello World")
logger.log("second msg")
