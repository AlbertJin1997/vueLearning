import { createPinia } from 'pinia'
import { useCounterStore } from './counter'

export const pinia = createPinia()
export { useCounterStore }