import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', {
  state: () => ({
    locale: localStorage.getItem('app_locale') || 'es-ES',
    availableLocales: ['es-ES', 'en-US', 'va-ES']
  }),
  actions: {
    setLocale(locale) {
      if (this.availableLocales.includes(locale)) {
        this.locale = locale
        localStorage.setItem('app_locale', locale)
      }
    },
    nextLocale() {
      const currentIndex = this.availableLocales.indexOf(this.locale)
      const nextIndex = (currentIndex + 1) % this.availableLocales.length
      return this.availableLocales[nextIndex]
    }
  }
})


/*
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLanguageStore = defineStore('language', {
  state: () => ({
    locale: ref(localStorage.getItem('app_locale') || 'es-ES'),
    availableLocales: ['es-ES', 'en-US', 'va-ES']
  }),
  actions: {
    setLocale(locale) {
      if (this.availableLocales.includes(locale)) {
        this.locale.value = locale
        localStorage.setItem('app_locale', locale)
      }
    },
    nextLocale() {
      const currentIndex = this.availableLocales.indexOf(this.locale.value)
      const nextIndex = (currentIndex + 1) % this.availableLocales.length
      return this.availableLocales[nextIndex]
    }
  }
})

*/