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
        (errorMessage.includes('Each child in a list should have a unique "key" prop') && errorMessage.includes('StyledBox')) ||
        (errorMessage.includes('Cannot update a component') && errorMessage.includes('PortableTextInput'))
      )
    ) {
      // Suprime avisos conhecidos do next-sanity
      return
    }
    originalError.apply(console, args)
  }
}

export default function Studio() {
  useEffect(() => {
    // Corrigir estilos de rolagem do Studio
    const style = document.createElement('style');
    style.id = 'sanity-studio-fix';
    style.textContent = `
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        height: 100vh !important;
        width: 100% !important;
        overflow: hidden !important;
      }
      body > nav,
      body > footer {
        display: none !important;
      }
      body > main {
        height: 100vh !important;
        width: 100% !important;
        overflow: hidden !important;
        padding: 0 !important;
        margin: 0 !important;
        padding-top: 0 !important;
        position: relative !important;
      }
      #__next {
        height: 100vh !important;
        width: 100% !important;
        overflow: hidden !important;
      }
      [data-sanity] {
        height: 100vh !important;
        overflow: auto !important;
      }
    `;
    
    // Remove estilo anterior se existir
    const existingStyle = document.getElementById('sanity-studio-fix');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    document.head.appendChild(style);
    
    // Remover classes e estilos do layout principal que interferem
    document.body.className = '';
    document.body.style.cssText = 'margin: 0; padding: 0; height: 100vh; width: 100%; overflow: hidden;';
    
    const nav = document.querySelector('nav');
    if (nav) {
      (nav as HTMLElement).style.display = 'none';
    }
    
    const footer = document.querySelector('footer');
    if (footer) {
      (footer as HTMLElement).style.display = 'none';
    }
    
    const main = document.querySelector('main');
    if (main) {
      (main as HTMLElement).className = '';
      (main as HTMLElement).style.cssText = 'height: 100vh; width: 100%; overflow: hidden; padding: 0; margin: 0; position: relative;';
    }
    
    return () => {
      const styleToRemove = document.getElementById('sanity-studio-fix');
      if (styleToRemove) {
        styleToRemove.remove();
      }
    };
  }, []);

  return <NextStudio config={config} />
}
