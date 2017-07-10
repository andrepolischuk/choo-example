import html from 'choo/html'
import styles from './styles.css'

export default function main (state, emit) {
  return html`
    <div class="${state.fetching ? styles.fetching : styles.normal}">
      <form onsubmit=${event => submit(event, emit)}>
        <input type="text" placeholder="Type github username..." tabindex="0" autofocus />
        <button type="submit">Add</button>
      </form>
      ${state.error && html`
        <p class="${styles.error}">
          ${state.error}
         <button type="button" onclick=${() => emit('handleError', null)}>Close</button>
        </p>
      `}
      ${state.users.map(user => html`
        <p>
          <a href="${user.html_url}">${user.name}</a>
          <small>${user.login}</small>
          <button onclick=${() => emit('deleteUser', user.login)}>Delete</button>
        </p>
      `)}
    </div>
  `
}

function submit (event, emit) {
  const {value} = event.target.querySelector('input')

  event.preventDefault()

  if (value) {
    emit('addUser', value)
  }
}
