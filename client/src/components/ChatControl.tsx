import React from 'react'
import './ChatControl.css'

interface IProps {
  onSubmit: (event: React.MouseEvent<HTMLFormElement>) => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
}

export const ChatControl: React.FC<IProps> = ({ onSubmit, onChange, value }) => (

  <form className="chat_control" onSubmit={onSubmit}>
    <input onChange={onChange} value={value} required minLength={1} />
    <button className="chat_control__btn" type="submit">Submit</button>
  </form>

)
