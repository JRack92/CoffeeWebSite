// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// Definimos el esquema para el MENÚ
const menuCollection = defineCollection({
  type: 'data',
  schema: z.array(
    z.object({
      id: z.string(),
      nombre: z.string(),
      descripcion: z.string(),
      precio: z.number().positive(),
      categoria: z.enum(['cafe', 'bebidas-frias', 'platos-fuertes', 'snacks', 'licores']),
      imagen: z.string().url(),
      destacado: z.boolean().default(false),
      etiquetas: z.array(z.string()).optional(),
    })
  )
});

// Definimos el esquema para el BLOG (Eventos/Rodadas)
const blogCollection = defineCollection({
  type: 'content', // 'content' es para Markdown/MDX
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    author: z.string().default('Admin'),
    image: z.string().url().optional(), // Foto de portada del evento
    tags: z.array(z.string())
  })
});

// Exportamos las colecciones para que Astro las reconozca
export const collections = {
  'menu': menuCollection,
  'blog': blogCollection,
};