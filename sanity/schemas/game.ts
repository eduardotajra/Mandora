import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'game',
  title: 'Game',
  type: 'document',
  icon: () => '🎮',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Nome do jogo',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL amigável gerada automaticamente a partir do título',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Imagem de capa principal do jogo (recomendado: 1200x675px)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Texto alternativo para acessibilidade',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      description: 'Pitch rápido para exibir nos cards (máximo 200 caracteres)',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      description: 'Descrição completa, changelogs, detalhes do jogo (suporta formatação rica)',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Trailer URL',
      type: 'url',
      description: 'URL do trailer do jogo (YouTube ou Vimeo)',
    }),
    defineField({
      name: 'genre',
      title: 'Genre',
      type: 'string',
      description: 'Gênero do jogo (ex: RPG, Shooter, Puzzle, Strategy)',
      options: {
        list: [
          { title: 'RPG', value: 'RPG' },
          { title: 'Shooter', value: 'Shooter' },
          { title: 'Puzzle', value: 'Puzzle' },
          { title: 'Strategy', value: 'Strategy' },
          { title: 'Action', value: 'Action' },
          { title: 'Adventure', value: 'Adventure' },
          { title: 'Platformer', value: 'Platformer' },
          { title: 'Simulation', value: 'Simulation' },
          { title: 'Sports', value: 'Sports' },
          { title: 'Racing', value: 'Racing' },
          { title: 'Fighting', value: 'Fighting' },
          { title: 'Party Game', value: 'Party Game' },
          { title: 'Other', value: 'Other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'platformLinks',
      title: 'Platform Links',
      type: 'object',
      description: 'Links para as plataformas onde o jogo está disponível',
      fields: [
        {
          name: 'steam',
          title: 'Steam',
          type: 'url',
          description: 'URL da página do jogo na Steam',
        },
        {
          name: 'itch',
          title: 'itch.io',
          type: 'url',
          description: 'URL da página do jogo no itch.io',
        },
        {
          name: 'googlePlay',
          title: 'Google Play',
          type: 'url',
          description: 'URL da página do jogo no Google Play Store',
        },
      ],
    }),
    defineField({
      name: 'screenshots',
      title: 'Screenshots',
      type: 'array',
      description: 'Galeria de imagens do jogo (recomendado: 1920x1080px)',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Texto alternativo para acessibilidade',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
      description: 'Data de lançamento do jogo (deixe em branco para "TBA" - To Be Announced)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'genre',
      media: 'coverImage',
      releaseDate: 'releaseDate',
    },
    prepare({ title, subtitle, media, releaseDate }) {
      return {
        title,
        subtitle: `${subtitle || 'No genre'} • ${releaseDate ? new Date(releaseDate).getFullYear() : 'TBA'}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Release Date, Newest',
      name: 'releaseDateDesc',
      by: [{ field: 'releaseDate', direction: 'desc' }],
    },
    {
      title: 'Release Date, Oldest',
      name: 'releaseDateAsc',
      by: [{ field: 'releaseDate', direction: 'asc' }],
    },
    {
      title: 'Title, A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})
