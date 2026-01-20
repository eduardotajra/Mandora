import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'member',
  title: 'Team Member',
  type: 'document',
  icon: () => '👤',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Nome completo do membro da equipe',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL amigável gerada automaticamente a partir do nome',
      options: {
        source: 'name',
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
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      description: 'Foto do membro da equipe (recomendado: 400x400px, formato quadrado)',
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
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Link do LinkedIn pessoal do membro',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
      description: 'Link do GitHub pessoal do membro',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      description: 'Biografia do membro (suporta formatação rica)',
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
      name: 'skills',
      title: 'Skills/Role',
      type: 'array',
      description: 'Funções e habilidades do membro (ex: Lead Artist, Pixel Art, Unity, C#). Pode adicionar múltiplos.',
      of: [
        {
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'favoriteGame',
      title: 'Favorite Game',
      type: 'string',
      description: 'Jogo favorito do membro (fun fact)',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'avatar',
      slug: 'slug',
    },
    prepare({ title, media, slug }) {
      return {
        title,
        subtitle: slug?.current ? `/team/${slug.current}` : '',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Name, A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
