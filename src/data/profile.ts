// Single source of truth for the home summary: metro map + skill levels.
// Public, non-sensitive data only. The security check (scripts/security-check.mjs)
// runs on every PR and blocks hosts, emails, phones and local paths.

export type Lang = 'en' | 'es';
type L10n = { en: string; es: string };

export interface Station {
  id: string;
  x: number;
  y: number;
  label: L10n;
  href?: string;
  /** label position relative to the station */
  pos?: 'above' | 'below';
  interchange?: boolean;
  future?: boolean;
}

export interface MetroLine {
  id: string;
  name: L10n;
  color: string;
  /** SVG path through the stations */
  d: string;
  dashed?: boolean;
}

export const lines: MetroLine[] = [
  { id: 'data', name: { en: 'Data & services', es: 'Datos y servicios' }, color: '#31958f', d: 'M60 90 H1000' },
  { id: 'compute', name: { en: 'Compute & pipelines', es: 'Cómputo y pipelines' }, color: '#e08a3c', d: 'M60 200 H420 L520 90' },
  { id: 'community', name: { en: 'Training & community', es: 'Formación y comunidad' }, color: '#6f7d95', d: 'M60 300 H760 M520 90 V300' },
  { id: 'ai', name: { en: 'Agentic AI', es: 'IA agéntica' }, color: '#7b5ea7', d: 'M760 90 V200 H880' },
  { id: 'ai-next', name: { en: 'Next', es: 'Siguiente' }, color: '#7b5ea7', d: 'M880 200 H1000', dashed: true },
];

export const stations: Station[] = [
  // data line
  { id: 'labs', x: 60, y: 90, pos: 'above', label: { en: 'Labs & clinical data', es: 'Labs y datos clínicos' }, href: '#p-03-pathocore' },
  { id: 'etl', x: 260, y: 90, pos: 'above', label: { en: 'Python ETL · OMOP', es: 'ETL Python · OMOP' }, href: 'https://github.com/BU-ISCIII/relecov-tools' },
  { id: 'hub', x: 520, y: 90, pos: 'above', interchange: true, label: { en: 'PathoCore data hub', es: 'Data hub PathoCore' }, href: '#p-03-pathocore' },
  { id: 'apis', x: 760, y: 90, pos: 'above', label: { en: 'APIs · secure access', es: 'APIs · acceso seguro' }, href: '#p-04-backend-pathocore-apis' },
  { id: 'portal', x: 1000, y: 90, pos: 'above', label: { en: 'React portal', es: 'Portal React' }, href: 'https://github.com/BU-ISCIII/pathocore-web' },
  // compute line
  { id: 'hpc', x: 60, y: 200, pos: 'below', label: { en: 'HPC-CIBER', es: 'HPC-CIBER' }, href: '#p-02-hpc-ciber' },
  { id: 'nf', x: 240, y: 200, pos: 'below', label: { en: 'Nextflow · nf-core', es: 'Nextflow · nf-core' }, href: '#p-05-bacass' },
  { id: 'auto', x: 420, y: 200, pos: 'below', label: { en: 'Automated analyses', es: 'Análisis automáticos' }, href: '#p-03-pathocore' },
  // AI line
  { id: 'agents', x: 760, y: 200, pos: 'below', label: { en: 'Agentic platform ops', es: 'Operación con agentes' }, href: '#p-12-cloud-agents' },
  { id: 'local-ai', x: 880, y: 200, pos: 'below', label: { en: 'Local AI', es: 'IA local' }, href: '#p-11-local-ai' },
  { id: 'twins', x: 1000, y: 200, pos: 'below', future: true, label: { en: 'Digital twins', es: 'Gemelos digitales' } },
  // community line
  { id: 'courses', x: 60, y: 300, pos: 'below', label: { en: 'Courses 20–24h', es: 'Cursos 20–24h' }, href: '#comunidad' },
  { id: 'hack', x: 260, y: 300, pos: 'below', label: { en: 'nf-core hackathons', es: 'Hackathons nf-core' }, href: '#comunidad' },
  { id: 'talks', x: 520, y: 300, pos: 'below', label: { en: 'Conferences', es: 'Congresos' }, href: '#comunidad' },
  { id: 'support', x: 760, y: 300, pos: 'below', label: { en: 'Support to CIBER groups', es: 'Soporte a grupos CIBER' }, href: '#p-01-biplat' },
];

export type Family = 'compute' | 'data' | 'ai';
export const families: Record<Family, { name: L10n; color: string }> = {
  compute: { name: { en: 'Compute & pipelines', es: 'Cómputo y pipelines' }, color: '#e08a3c' },
  data: { name: { en: 'Data & software', es: 'Datos y software' }, color: '#31958f' },
  ai: { name: { en: 'AI', es: 'IA' }, color: '#7b5ea7' },
};

/** 1 = basic, 2 = advanced, 3 = expert (self-assessed, same as the CV) */
export const skills: { name: string; family: Family; level: 1 | 2 | 3 }[] = [
  { name: 'Nextflow / nf-core', family: 'compute', level: 3 },
  { name: 'SLURM / HPC', family: 'compute', level: 3 },
  { name: 'Bash', family: 'compute', level: 3 },
  { name: 'Docker / Apptainer', family: 'compute', level: 2 },
  { name: 'AWS', family: 'compute', level: 1 },
  { name: 'Azure', family: 'compute', level: 1 },
  { name: 'Python', family: 'data', level: 3 },
  { name: 'R', family: 'data', level: 3 },
  { name: 'REST APIs / ETL', family: 'data', level: 3 },
  { name: 'Git / CI/CD', family: 'data', level: 3 },
  { name: 'Interactive dashboards', family: 'data', level: 2 },
  { name: 'AI-assisted development', family: 'ai', level: 3 },
  { name: 'Agentic AI systems', family: 'ai', level: 2 },
];

/** Home hero copy. Plain and concrete: what he builds, and proof it works. */
export const heroCopy = {
  title: {
    en: ['The complete infrastructure & data systems', 'behind omics and health data.'],
    es: ['La infraestructura y los sistemas de datos', 'detrás de los datos ómicos y de salud.'],
  },
  lead: {
    en: 'Platform Tech Lead, PhD. I run the CIBERINFEC bioinformatics platform: pipelines, HPC, a data hub and APIs used by national pathogen surveillance networks in Spain.',
    es: 'Platform Tech Lead, PhD. Dirijo la plataforma de bioinformática de CIBERINFEC: pipelines, HPC, un data hub y APIs que usan redes nacionales de vigilancia de patógenos en España.',
  },
  offerTitle: { en: 'What I can take on', es: 'Qué puedo asumir' },
};

export const offers: { title: L10n; text: L10n; proof: L10n; color: string; href: string }[] = [
  {
    title: { en: 'Build the platform', es: 'Montar la plataforma' },
    text: { en: 'HPC, containers, pipelines and user onboarding, from requirements to daily use.', es: 'HPC, contenedores, pipelines y acogida de usuarios, de los requisitos al uso diario.' },
    proof: { en: '15+ researchers · 4 national projects', es: '15+ investigadores · 4 proyectos nacionales' },
    color: '#e08a3c',
    href: '#p-02-hpc-ciber',
  },
  {
    title: { en: 'Turn lab data into a data hub', es: 'Convertir datos de laboratorio en un data hub' },
    text: { en: 'ETL, metadata standards, OMOP mapping, APIs and access control.', es: 'ETL, estándares de metadatos, mapeo OMOP, APIs y control de acceso.' },
    proof: { en: 'PathoCore · 2 national networks', es: 'PathoCore · 2 redes nacionales' },
    color: '#31958f',
    href: '#p-03-pathocore',
  },
  {
    title: { en: 'Ship production pipelines', es: 'Poner pipelines en producción' },
    text: { en: 'Nextflow and nf-core workflows, tested, versioned and documented.', es: 'Workflows Nextflow y nf-core, con tests, versiones y documentación.' },
    proof: { en: 'nf-core/bacass maintainer', es: 'Maintainer de nf-core/bacass' },
    color: '#6f7d95',
    href: '#p-05-bacass',
  },
  {
    title: { en: 'Run operations with AI agents', es: 'Operar con agentes de IA' },
    text: { en: 'Agents with limited tools, budgets and human review before anything goes out.', es: 'Agentes con herramientas limitadas, presupuesto y revisión humana antes de publicar nada.' },
    proof: { en: 'In use for courses and platform tasks', es: 'En uso para cursos y tareas de plataforma' },
    color: '#7b5ea7',
    href: '#p-12-cloud-agents',
  },
];
