# 🎮 Team Staircase - Website

Website oficial do **Team Staircase**, um estúdio de desenvolvimento de jogos dedicado a criar experiências digitais imersivas e únicas.

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Começar](#-como-começar)
- [Configuração](#-configuração)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Deploy](#-deploy)
- [Contribuindo](#-contribuindo)

## 🎯 Sobre o Projeto

O Team Staircase é um estúdio de desenvolvimento de jogos que busca transformar ideias em realidade através de jogos extraordinários. Este website apresenta nossos jogos, equipe e permite que visitantes entrem em contato conosco.

## ✨ Funcionalidades

- **Página Inicial**: Hero section impactante com carrossel horizontal de jogos em destaque
- **Catálogo de Jogos**: Página dedicada com todos os jogos desenvolvidos
- **Páginas de Detalhes**: Páginas individuais para cada jogo com informações completas, screenshots e trailers
- **Equipe**: Seção "Sobre Nós" na página principal com perfis dos membros da equipe
- **Perfis de Membros**: Páginas individuais para cada membro com biografia, habilidades e links sociais
- **Formulário de Contato**: Sistema de contato integrado com envio de emails via Resend
- **CMS Sanity Studio**: Interface administrativa para gerenciar conteúdo (jogos, membros)
- **Design Responsivo**: Layout adaptável para todos os dispositivos
- **Carrossel Horizontal**: Navegação intuitiva de jogos com scroll arrastável (estilo Netflix)

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 16.1.4** - Framework React com App Router
- **React 19.2.3** - Biblioteca JavaScript para interfaces
- **TypeScript 5** - Tipagem estática para JavaScript
- **Tailwind CSS 4** - Framework CSS utility-first
- **Framer Motion 12.27.5** - Biblioteca de animações
- **Lucide React 0.562.0** - Ícones modernos

### Backend & CMS
- **Sanity CMS 3.99.0** - Headless CMS para gerenciamento de conteúdo
- **Resend 6.8.0** - Serviço de envio de emails
- **Next.js API Routes** - API endpoints para formulário de contato

### Utilitários
- **@portabletext/react** - Renderização de conteúdo rico do Sanity
- **@sanity/client** - Cliente Sanity para queries GROQ
- **@sanity/image-url** - Builder de URLs de imagens otimizadas

## 📁 Estrutura do Projeto

```
mandora/
├── app/                          # App Router do Next.js
│   ├── page.tsx                 # Página inicial
│   ├── layout.tsx               # Layout global
│   ├── globals.css              # Estilos globais
│   ├── games/                   # Página de listagem de jogos
│   │   └── page.tsx
│   ├── game/[slug]/             # Páginas dinâmicas de jogos
│   │   ├── page.tsx
│   │   └── not-found.tsx
│   ├── team/[slug]/             # Páginas dinâmicas de membros
│   │   ├── page.tsx
│   │   └── not-found.tsx
│   ├── contact/                 # Página de contato
│   │   └── page.tsx
│   ├── studio/                  # Sanity Studio
│   │   └── [[...tool]]/
│   │       ├── page.tsx
│   │       └── Studio.tsx
│   └── api/                     # API Routes
│       └── contact/             # Endpoint de contato
│           └── route.ts
├── components/                  # Componentes React
│   ├── ui/                      # Componentes de UI reutilizáveis
│   │   └── Container.tsx        # Container para centralização
│   ├── Hero.tsx                 # Hero section
│   ├── FeaturedGames.tsx        # Carrossel de jogos
│   ├── AboutSummary.tsx         # Seção sobre nós
│   ├── GameCard.tsx             # Card de jogo
│   ├── Navbar.tsx               # Navegação
│   ├── Footer.tsx               # Rodapé
│   ├── ImageGallery.tsx         # Galeria de imagens
│   └── VideoPlayer.tsx          # Player de vídeo
├── lib/                         # Utilitários e configurações
│   └── sanity.ts                # Cliente Sanity e queries GROQ
├── sanity/                      # Configuração do Sanity
│   ├── schemas/                 # Schemas de conteúdo
│   │   ├── game.ts              # Schema de jogos
│   │   └── member.ts            # Schema de membros
│   ├── config.ts                # Configuração do Sanity
│   └── structure.ts            # Estrutura do Studio
├── types/                       # Definições TypeScript
│   └── index.ts                 # Tipos globais
└── public/                      # Arquivos estáticos
```

## 🚀 Como Começar

### Pré-requisitos

- **Node.js** 18+ e npm/yarn/pnpm
- **Conta no Sanity** (gratuita em [sanity.io](https://www.sanity.io))
- **Conta no Resend** (gratuita em [resend.com](https://resend.com) - 3.000 emails/mês)

### Instalação

1. **Clone o repositório**
   ```bash
   git clone <repository-url>
   cd mandora
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Configure as variáveis de ambiente**
   
   Crie um arquivo `.env.local` na raiz do projeto:
   ```env
   # Sanity CMS
   NEXT_PUBLIC_SANITY_PROJECT_ID=seu_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   
   # Resend (Email)
   RESEND_API_KEY=sua_api_key
   CONTACT_EMAIL=seu@email.com
   
   # Opcional
   NEXT_PUBLIC_SITE_URL=https://teamstaircase.com
   ```

4. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

5. **Acesse o site**
   - Website: http://localhost:3000
   - Sanity Studio: http://localhost:3000/studio

## ⚙️ Configuração

### Sanity CMS

1. **Criar Projeto no Sanity**
   - Acesse [sanity.io](https://www.sanity.io)
   - Crie uma conta e um novo projeto
   - Copie o `Project ID` e `Dataset` para o `.env.local`

2. **Schemas Configurados**
   - `sanity/schemas/game.ts` - Gerenciar jogos
   - `sanity/schemas/member.ts` - Gerenciar membros da equipe

3. **Acessar o Studio**
   - Após configurar, acesse `/studio` para gerenciar o conteúdo

### Resend (Email)

1. **Criar Conta no Resend**
   - Acesse [resend.com](https://resend.com)
   - Crie uma conta e obtenha sua API Key
   - Adicione a API Key no `.env.local`

2. **Configurar Domínio (Opcional)**
   - Para produção, configure um domínio verificado no Resend

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento na porta 3000

# Build
npm run build        # Cria build de produção otimizado
npm run start        # Inicia servidor de produção

# Linting
npm run lint         # Executa ESLint para verificar código
```

## 🎨 Design System

### Cores Principais
- **Background**: `slate-950`
- **Texto**: `slate-300`, `slate-400`
- **Destaques**: `purple-500/600`, `cyan-400`, `indigo-600`
- **Gradientes**: `from-violet-600 to-indigo-600`

### Tipografia
- **Títulos**: Orbitron (`font-orbitron`)
- **Corpo**: Inter (`font-inter`)

### Componentes Reutilizáveis
- **Container**: Componente para centralização e padding consistente
- **GameCard**: Card de jogo reutilizável
- Layouts responsivos com Tailwind CSS

## 🌐 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório à [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente na dashboard
3. Deploy automático a cada push

### Outras Plataformas

O projeto pode ser deployado em qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- AWS Amplify
- Entre outras

## 📝 Estrutura de Dados

### Game Schema
- `title`: Título do jogo
- `slug`: URL amigável
- `shortDescription`: Descrição curta
- `fullDescription`: Descrição completa (rich text)
- `coverImage`: Imagem de capa
- `screenshots`: Array de screenshots
- `releaseDate`: Data de lançamento
- `genre`: Gênero do jogo
- `platformLinks`: Links para Steam, Itch.io, Google Play
- `videoUrl`: URL do trailer (opcional)

### Member Schema
- `name`: Nome completo
- `slug`: URL amigável
- `avatar`: Foto do membro
- `skills`: Array de habilidades/funções
- `bio`: Biografia (rich text)
- `favoriteGame`: Jogo favorito
- `linkedinUrl`: Link do LinkedIn
- `githubUrl`: Link do GitHub

## 🔗 Links

- **Website**: [teamstaircase.com](https://teamstaircase.com)
- **X (Twitter)**: [@TeamStaircase](https://x.com/TeamStaircase)
- **Itch.io**: [team-staircase.itch.io](https://team-staircase.itch.io/)
- **Bluesky**: [@team-staircase.bsky.social](https://bsky.app/profile/team-staircase.bsky.social)
- **Email**: teamstaircasegames@gmail.com

## 📄 Licença

Todos os direitos reservados © 2024 Team Staircase

## 👥 Equipe

Desenvolvido com ❤️ pelo **Team Staircase**

---

**Team Staircase** - Criando mundos digitais imersivos e experiências únicas.
