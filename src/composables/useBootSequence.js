import { ref } from 'vue'

export function useBootSequence() {
  const hasBooted = typeof window !== 'undefined' && localStorage.getItem('hasBooted') === 'true'
  const showBoot = ref(!hasBooted)
  const isComplete = ref(hasBooted)

  function completeBoot() {
    showBoot.value = false
    isComplete.value = true
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasBooted', 'true')
    }
  }

  function skipBoot() {
    completeBoot()
  }

  return {
    showBoot,
    isComplete,
    completeBoot,
    skipBoot,
  }
}
