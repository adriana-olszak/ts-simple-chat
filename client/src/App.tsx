import React, { useEffect, useRef, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import './App.css'

import { IEmitEvents, IListenEvents, IMessage } from './shared/types'

import { PromptUser } from './components/PromptUser'
import { Message } from './components/Message'
import { NoMessages } from './components/NoMessages'
import { ChatControl } from './components/ChatControl'

const socket: Socket<IEmitEvents, IListenEvents> = io('http://localhost:8080')

function App() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isConnected, setConnected] = useState(false)
  const [isUserRegistered, setUserRegistered] = useState(false)
  const [username, setUsername] = useState('')
  const [usernameTaken, setUsernameTaken] = useState(false)
  const [messageInput, setMessageInput] = useState('')
  const [messages, setMessage] = useState<IMessage[]>([])

  useEffect(() => {
    socket.on('new_message', (data) => {
      setMessage((state) => [...state, data])
    })

    socket.on('login', () => {
      setUserRegistered(true)
    })
    socket.on('connect', () => {
      setConnected(true)
    })

    socket.on('disconnect', () => {
      setConnected(false)
    })

    socket.on('archive', (data) => {
      setMessage(data)
    })

    window.addEventListener('beforeunload', onunload)

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('new_message')
      socket.off('login')
      socket.off('active_participants')
      socket.off('archive')
      window.removeEventListener('beforeunload', onunload)
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    if (!messagesEndRef.current) return
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  const onunload = () => {
    if (isConnected)
      socket.emit('disconnect')
  }

  const isUserNameTaken = async () => {
    const requestOptions = {
      method: 'HEAD',
    }

    return fetch(`http://localhost:8080/participant/${username}`, requestOptions)
      .then(response => {
        switch (response.status) {
          case 204:
            return false
          // Error handling omitted, in prod would be taken care in ApiService
          default:
            return true
        }
      })
      .catch(error => {
        console.log('error in userName validation', error)
        return true
      })
  }

  const sendMessage = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!messageInput) return
    if (isConnected) {
      socket.emit('new_message', {
        message: messageInput,
        username,
        timestamp: Date.now(),
      })
      setMessageInput('')
    }
  }

  const registerUser = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault()
    const taken = await isUserNameTaken()

    setUsernameTaken(taken)
    if (taken) return
    if (isConnected) {
      socket.emit('add_user', username)
    }
  }

  return (
    <div className='app'>
      {!isUserRegistered ? (
        <PromptUser onSubmit={registerUser} onChange={(e) => setUsername(e.target.value)} error={usernameTaken} />
      ) : (
        <div className='wrapper'>

          <div className='messages'>
            {messages.length === 0 ? (
              <NoMessages />
            ) : (
              <>
                {messages.map(({ timestamp, message, username: msgUsername }) => (
                  <Message
                    key={`${timestamp}/${username}`}
                    msgUsername={msgUsername}
                    username={username}
                    message={message}
                    timestamp={timestamp}
                  />
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
          <ChatControl onSubmit={sendMessage} onChange={(e) => setMessageInput(e.target.value)}
                       value={messageInput} />
        </div>
      )}
      <div className='app-status'>
        <span
          className={`app-status-dot ${isConnected ? 'app-status-dot__connected' : 'app-status-dot__disconnected'}`} />
      </div>
    </div>
  )
}

export default App
