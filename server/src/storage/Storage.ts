import { v4 as uuid } from 'uuid'

export class Storage<T extends {}> {
  protected readonly storage: Map<string, T>

  constructor() {
    this.storage = new Map()
  }

  public id() {
    return uuid()
  }

  public set(key: string, value: T) {
    return this.storage.set(key, value)
  }

  public get(key: string) {
    return this.storage.get(key)
  }

  public has(key: string) {
    return this.storage.has(key)
  }

  public delete(key: string) {
    return this.storage.delete(key)
  }

  public clear() {
    return this.storage.clear()
  }

  public values() {
    return this.storage.values()
  }

  public entries() {
    return this.storage.entries()
  }

  get size() {
    return this.storage.size
  }
}
