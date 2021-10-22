
import './styles/quasar.sass'
import lang from 'quasar/lang/fr.js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/mdi-v4/mdi-v4.css'

// To be used on app.use(Quasar, { ... })
export default {
  config: {
    screen: {
      bodyClasses: true // <<< add this
    }
  },
  plugins: {
  },
  lang: lang
}