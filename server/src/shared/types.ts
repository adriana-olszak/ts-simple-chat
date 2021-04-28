// Copied over to not fiddle with file sharing between two separate pckgs

export interface IListenEvents {
  new_message: (data: IMessage) => void,
  add_user: (username: string) => void,
  disconnect: () => void,
}

export interface IEmitEvents {
  new_message: (args: IMessage) => void
  archive: (args: IMessage[]) => void
  login: () => void,
  disconnect: () => void,
}

export interface IMessage {
  username: string;
  message: string;
  timestamp: number;
}

export interface IParticipant {
  username: string;
  connected: boolean;
  createdAt: number;
  lastLogin: number;
}
