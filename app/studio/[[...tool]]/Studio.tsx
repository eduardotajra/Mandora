'use client'

import { useEffect } from 'react'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

// Suprime avisos conhecidos do Sanity Studio no console (compatibilidade next-sanity + React 19)
// Deve ser executado antes do componente ser renderizado
if (typeof window !== 'undefined') {
  const originalError = console.error
  console.error = (...args: any[]) => {
    // Filtra múltiplos padrões de erro relacionados ao Sanity Studio
    const errorMessage = args[0]
    if (
      typeof errorMessage === 'string' &&
      (
        errorMessage.includes('disableTransition') ||
        errorMessage.includes('disableT') ||
        errorMessage.includes('React does not recognize') ||
        (errorMessage.includes('prop') && errorMessage.includes('DOM element')) ||
        (errorMessage.includes('Each child in a list should have a unique "key" prop') && errorMessage.includes('StyledBox'))
      )
    ) {
      // Suprime avisos conhecidos do next-sanity
      return
    }
    originalError.apply(console, args)
  }
}

export default function Studio() {
  return <NextStudio config={config} />
}
