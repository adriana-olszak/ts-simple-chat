import React from 'react'
import './Message.css'
import { getColorFromString } from '../shared/utils'

interface IProps {
  msgUsername: string
  username: string
  message: string
  timestamp: number
}

export const Message: React.FC<IProps> = ({ msgUsername, username, message, timestamp }) => {
  const isCurrentUserMessage = msgUsername === username;
  return (
  <div
    className={`message ${isCurrentUserMessage ? 'own' : 'alien'}`}
    style={{
      backgroundColor: getColorFromString(msgUsername),
    }}
  >
    <p>{message}</p>
    <small>
      {!isCurrentUserMessage && (<b>{msgUsername}</b>)}
       {new Date(timestamp).toLocaleString()}
    </small>
  </div>
)}
