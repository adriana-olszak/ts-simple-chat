import React from 'react'
import './NoMessages.css'
import NO_MESSAGES_IMG from '../assets/message.png'

export const NoMessages: React.FC = () => (
  <figure className="noMessages">
    <img className="noMessages_icon" src={NO_MESSAGES_IMG} alt="" />
    <figcaption>There are no messages in this chat, start the conversation now</figcaption>
  </figure>
)
