import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Creates a scroll-triggered reveal animation for a section element.
 * Fades in and slides up from 30px below.
 * @param {HTMLElement} element - The element to animate
 * @param {Object} options - Optional overrides
 * @returns {ScrollTrigger} The ScrollTrigger instance (for cleanup)
 */
export function createSectionReveal(element, options = {}) {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (prefersReducedMotion) {
    gsap.set(element, { opacity: 1, y: 0 })
    return null
  }

  gsap.set(element, { opacity: 0, y: 30 })

  return gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: options.duration || 0.6,
    ease: options.ease || 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: options.start || 'top 85%',
      once: true,
      ...options.scrollTrigger,
    },
  })
}

/**
 * Creates a staggered reveal for multiple child elements.
 * @param {HTMLElement} container - The parent container (used as ScrollTrigger trigger)
 * @param {string} childSelector - CSS selector for children to stagger
 * @param {number} stagger - Stagger delay between children (default: 0.1)
 * @returns {gsap.core.Tween}
 */
export function createStaggerReveal(container, childSelector, stagger = 0.1) {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  const children = container.querySelectorAll(childSelector)

  if (prefersReducedMotion) {
    gsap.set(children, { opacity: 1, y: 0 })
    return null
  }

  gsap.set(children, { opacity: 0, y: 20 })

  return gsap.to(children, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: stagger,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
      once: true,
    },
  })
}

/**
 * Creates a typing animation effect (steps-based).
 * @param {HTMLElement} element - The element containing text to type
 * @param {number} charDuration - Duration per character in seconds (default: 0.05)
 * @returns {gsap.core.Timeline}
 */
export function createTypingEffect(element, charDuration = 0.05) {
  const text = element.textContent
  const totalDuration = text.length * charDuration

  element.style.width = '0'
  element.style.overflow = 'hidden'
  element.style.whiteSpace = 'nowrap'
  element.style.borderRight = '2px solid var(--accent-teal)'

  const tl = gsap.timeline()

  tl.to(element, {
    width: 'auto',
    duration: totalDuration,
    ease: `steps(${text.length})`,
  })

  tl.to(element, {
    borderColor: 'transparent',
    duration: 0.5,
    repeat: 3,
    yoyo: true,
    ease: 'steps(1)',
  })

  return tl
}
