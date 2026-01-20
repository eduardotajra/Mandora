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
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'Cargo/função na equipe (ex: Lead Artist, Gameplay Programmer)',
      validation: (Rule) => Rule.required().max(100),
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
      name: 'socials',
      title: 'Social Links',
      type: 'object',
      description: 'Links para perfis sociais do membro',
      fields: [
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
          description: 'URL do perfil no LinkedIn',
        },
        {
          name: 'github',
          title: 'GitHub',
          type: 'url',
          description: 'URL do perfil no GitHub',
        },
        {
          name: 'artstation',
          title: 'ArtStation',
          type: 'url',
          description: 'URL do perfil no ArtStation',
        },
      ],
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
      title: 'Skills',
      type: 'array',
      description: 'Lista de habilidades do membro (ex: Pixel Art, Unity, C#)',
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
      subtitle: 'role',
      media: 'avatar',
      slug: 'slug',
    },
    prepare({ title, subtitle, media, slug }) {
      return {
        title,
        subtitle: `${subtitle || 'No role'}${slug?.current ? ` • /team/${slug.current}` : ''}`,
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
    {
      title: 'Role, A-Z',
      name: 'roleAsc',
      by: [{ field: 'role', direction: 'asc' }],
    },
  ],
})
