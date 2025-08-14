import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const counter = ref(initialValue)

  const increment = () => {
    counter.value++
  }

  const decrement = () => {
    counter.value--
  }

  const reset = () => {
    counter.value = initialValue
  }

  const doubleCounter = computed(() => counter.value * 2)

  return {
    counter,
    increment,
    decrement,
    reset,
    doubleCounter
  }
}