import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
// import messages from 'src/i18n'
import { useLanguageStore } from 'src/stores/lenguajes'
import enUS from 'src/i18n/en-US/index.js'
import esES from 'src/i18n/es-ES/index.js'
import vaES from 'src/i18n/va-ES/index.js'

export default boot(({ app }) => {

  const lenguajeStore = useLanguageStore()

  const i18n = createI18n({
    locale: lenguajeStore.locale,
    fallbackLocale: 'es-ES',
    globalInjection: true,
    messages:{
      'es-ES': esES,
      'en-US': enUS,
      'va-ES': vaES
    }
  })

  // Set i18n instance on app
  app.use(i18n)
})
