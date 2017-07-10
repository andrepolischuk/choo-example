import fetch from 'isomorphic-fetch'

export default function store (state, emitter) {
  if (!state.users) {
    state.users = []
    state.error = null
    state.fetching = false
  }

  emitter.on('addUser', async login => {
    const exists = state.users.find(us => us.login === login)

    if (exists) {
      emitter.emit('handleError', `${login} already exists`)
      return
    }

    state.error = null
    state.fetching = true
    emitter.emit('render')

    const response = await fetch(`https://api.github.com/users/${login}`)
    const user = await response.json()

    state.fetching = false

    state.users = [
      ...state.users,
      user
    ]

    emitter.emit('render')
  })

  emitter.on('deleteUser', login => {
    state.users = state.users.filter(us => us.login !== login)
    emitter.emit('render')
  })

  emitter.on('handleError', error => {
    state.error = error
    emitter.emit('render')
  })
}
