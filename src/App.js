import Header from './components/Header'

import initialEmails from './data/emails'

import './App.css'
import { useState } from 'react'

function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [hideReadEmails, setHideReadEmails] = useState(false)
  const [clickStatus, setClickStatus] = useState('')

  // find how many are in inbox
  const inboxEmails = emails.filter(email => !email.read).length

  // find how many are in starred
  const starredEmail = emails.filter(email => email.starred).length

  const toggleRead = email => {
    setEmails(
      emails.map(thingToChange => {
        if (email.id === thingToChange.id) {
          return { ...email, read: !email.read }
        } else {
          return thingToChange
        }
      })
    )
  }
  const toggleStar = email => {
    setEmails(
      emails.map(thingToCheack => {
        if (email.id === thingToCheack.id) {
          return { ...email, starred: !thingToCheack.starred }
        } else {
          return thingToCheack
        }
      })
    )
  }

  let emailsToRender = emails
  if (clickStatus === 'inbox')
    emailsToRender = emailsToRender.filter(email => !email.read)
  if (clickStatus === 'starred')
    emailsToRender = emailsToRender.filter(email => email.starred)
  if (hideReadEmails)
    emailsToRender = emailsToRender.filter(email => !email.read)

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            onClick={() => {
              if (clickStatus === '') {
                setClickStatus('inbox')
              } else {
                setClickStatus('')
              }
            }}
          >
            <span className="label">Inbox</span>
            <span className="count">{inboxEmails}</span>
          </li>
          <li
            className="item"
            onClick={() => {
              if (clickStatus === '') {
                setClickStatus('starred')
              } else {
                setClickStatus('')
              }
            }}
          >
            <span className="label">Starred</span>
            <span className="count">{starredEmail}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideReadEmails}
              onChange={event => {
                setHideReadEmails(event.target.checked)
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {emailsToRender.map(email => {
            return (
              <li
                key={email.id}
                className={`email ${email.read ? 'read' : 'unread'}`}
              >
                <input
                  className="read-checkbox"
                  type="checkbox"
                  checked={email.read}
                  onChange={() => toggleRead(email)}
                />
                <input
                  className="star-checkbox"
                  type="checkbox"
                  checked={email.starred}
                  onChange={() => toggleStar(email)}
                />
                <span>{email.sender}</span>
                <p className="title">{email.title}</p>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}

export default App
