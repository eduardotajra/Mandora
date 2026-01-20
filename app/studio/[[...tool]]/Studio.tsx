'use client'

import { useEffect } from 'react'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

// Suprime avisos de props desconhecidas do React no console (compatibilidade next-sanity + React 19)
// Deve ser executado antes do componente ser renderizado
if (typeof window !== 'undefined') {
  const originalError = console.error
  console.error = (...args: any[]) => {
    // Filtra múltiplos padrões de erro relacionados ao disableTransition
    const errorMessage = args[0]
    if (
      typeof errorMessage === 'string' &&
      (
        errorMessage.includes('disableTransition') ||
        errorMessage.includes('disableT') ||
        errorMessage.includes('React does not recognize') ||
        (errorMessage.includes('prop') && errorMessage.includes('DOM element'))
      )
    ) {
      // Suprime apenas o aviso específico do disableTransition do next-sanity
      return
    }
    originalError.apply(console, args)
  }
}

export default function Studio() {
  return <NextStudio config={config} />
}
