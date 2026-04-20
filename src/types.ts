export type SkillCategory =
  | 'languages'
  | 'frontend'
  | 'backend'
  | 'blockchain'
  | 'data'
  | 'tooling';

export type Skills = Record<SkillCategory, readonly string[]>;

export interface Highlight {
  readonly title: string;
  readonly body: string;
}

export interface Experience {
  readonly id: string;
  readonly company: string;
  readonly role: string;
  readonly start: string;
  readonly end: string;
  readonly period: string;
  readonly mode: string;
  readonly stack: readonly string[];
  readonly summary: string;
  readonly highlights: readonly Highlight[];
}

export interface ProjectLink {
  readonly label: string;
  readonly href: string;
}

export interface Project {
  readonly id: string;
  readonly name: string;
  readonly tagline: string;
  readonly status: string;
  readonly year: string;
  readonly role: string;
  readonly summary: string;
  readonly problem: string;
  readonly stack: readonly string[];
  readonly highlights: readonly Highlight[];
  readonly links: readonly ProjectLink[];
}

export interface CVData {
  readonly name: string;
  readonly role: string;
  readonly location: string;
  readonly email: string;
  readonly phone: string;
  readonly linkedinUrl: string;
  readonly github: string;
  readonly years: number;
  readonly summary: readonly string[];
  readonly skills: Skills;
  readonly experience: readonly Experience[];
  readonly projects: readonly Project[];
}
