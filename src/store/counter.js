import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: 'Vue 3 Demo'
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    getMessage: (state) => `${state.name}: Count is ${state.count}`
  },
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    reset() {
      this.count = 0
    },
    incrementBy(value) {
      this.count += value
    }
  }
})