import choo from 'choo'
import log from 'choo-log'
import persist from 'choo-persist'
import store from './store'
import main from './main'

const app = choo()

if (process.env.NODE_ENV !== 'production') {
  app.use(log())
}

app.use(persist())
app.use(store)
app.route('/', main)
app.mount('#root')
