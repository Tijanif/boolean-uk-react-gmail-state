import Header from './components/Header'

import initialEmails from './data/emails'

import './App.css'
import { useState } from 'react'

function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [hideReadEmails, setHideReadEmails] = useState(false)

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

  const emailsToRender = hideReadEmails
    ? emails.filter(email => email.read)
    : emails

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
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
              <li key={email.id} className="email">
                <input
                  type="checkbox"
                  checked={email.read}
                  onChange={() => toggleRead(email)}
                />
                <input
                  className="star-checkbox"
                  type="checkbox"
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
