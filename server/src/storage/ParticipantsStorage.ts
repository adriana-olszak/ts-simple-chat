import { IParticipant } from '../shared/types'
import { Storage } from './Storage'

class ParticipantsStorage extends Storage<IParticipant> {
  constructor() {
    super()
  }

  get active() {
    return Array.from(this.storage).reduce((acc, [key, participant]) => {
      if (!participant.connected) return acc
      acc.set(key, participant)
      return acc
    }, new ParticipantsStorage())
  }

  public softDelete(username: string) {
    const participant = this.storage.get(username)
    if (!participant) return // I'm omitting Error Handling
    this.storage.set(username, { ...participant, connected: false })
  }

  public upsert(username: string, participant: Omit<IParticipant, 'createdAt' | 'lastLogin'>) {
    const existingParticipant = this.storage.get(username)
    // for simplification I am assuming that we operate on dates without accounting for timezones
    const now = Date.now()

    if (!existingParticipant) {
      this.set(username, { ...participant, createdAt: now, lastLogin: now })
      return
    }

    this.set(username, {
      ...existingParticipant,
      lastLogin: now,
    })
  }
}

const storage = new ParticipantsStorage()

export default storage
