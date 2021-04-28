import { Storage } from './Storage'
import { IMessage } from '../shared/types'

class MessagesStorage extends Storage<IMessage> {
  constructor() {
    super()
  }
}

const storage = new MessagesStorage()

export default storage
