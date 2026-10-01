import { defineCollection, z } from 'astro:content';

const media = z.object({
  kind: z.enum(['cover', 'contain', 'duo', 'video', 'placeholder', 'illustration']),
  src: z.string().optional(),
  position: z.string().optional(),
  illustration: z.enum(['coralis']).optional(),
  placeholderEn: z.string().optional(),
  placeholderEs: z.string().optional(),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    org: z.string(),
    orgEn: z.string().optional(),
    years: z.string(),
    cats: z.array(z.enum(['ai', 'plat', 'pipe', 'data', 'os', 'res', 'own'])),
    title: z.string(),
    titleEn: z.string().optional(),
    descriptionEs: z.string(),
    descriptionEn: z.string(),
    metricEs: z.string().optional(),
    metricEn: z.string().optional(),
    tagsEs: z.array(z.string()),
    tagsEn: z.array(z.string()),
    link: z.string().optional(),
    linkLabelEs: z.string().optional(),
    linkLabelEn: z.string().optional(),
    media,
  }),
});

const roadmap = defineCollection({
  type: 'content',
  schema: z.object({
    yearEs: z.string(),
    yearEn: z.string(),
    place: z.string(),
    roleEs: z.string(),
    roleEn: z.string(),
    detailEs: z.string(),
    detailEn: z.string(),
  }),
});

const talks = defineCollection({
  type: 'content',
  schema: z.object({
    year: z.string(),
    kindEs: z.string(),
    kindEn: z.string(),
    title: z.string(),
    where: z.string(),
    textEs: z.string(),
    textEn: z.string(),
    media,
  }),
});

const courses = defineCollection({
  type: 'content',
  schema: z.object({
    nameEs: z.string(),
    nameEn: z.string(),
    where: z.string(),
    hoursEs: z.string(),
    hoursEn: z.string(),
    status: z.enum(['delivered', 'prep']).default('delivered'),
  }),
});

const opensource = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    kind: z.string(),
    textEs: z.string(),
    textEn: z.string(),
    link: z.string(),
    host: z.string(),
  }),
});

export const collections = { projects, roadmap, talks, courses, opensource };
