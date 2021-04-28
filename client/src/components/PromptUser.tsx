import React from 'react'
import './PromptUser.css'
import LOGO from '../assets/logo.png'

interface IProps {
  onSubmit: (event: React.MouseEvent<HTMLFormElement>) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error: boolean
}

export const PromptUser: React.FC<IProps> = ({ onChange, onSubmit, error }) => (
  <form onSubmit={onSubmit} className='user-prompt__form'>
    <div className='user-prompt__logo-wrapper'>
      <img src={LOGO} alt='' className='user-prompt__logo' />
    </div>

    {error && <div className='user-prompt__error'>Username already taken</div>}
    <label className='user-prompt__label' htmlFor='nickname'>
      Nickname
      <input id='nickname' onChange={onChange} className='user-prompt__input' required minLength={3}
             autoComplete='off' />
    </label>
    <button className='user-prompt__btn' type='submit'>Submit</button>
  </form>
)
