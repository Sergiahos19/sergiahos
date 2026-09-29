import type { ReactNode, SVGProps } from 'react'

export type IconName = 'arrow-up-right' | 'menu' | 'close' | 'mail' | 'phone' | 'github' | 'linkedin' | 'instagram' | 'facebook' | 'tiktok' | 'code' | 'smartphone' | 'plug' | 'search' | 'sparkles' | 'workflow' | 'check' | 'arrow-right' | 'eye' | 'eye-off' | 'building' | 'arrow-up'

const paths: Record<IconName, ReactNode> = {
  'arrow-up-right': <><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  phone: <><path d="M21 16.4v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 1.1 3.7 2 2 0 0 1 3.1 1.5h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L7 9.5a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" /></>,
  github: <><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.1-1.5 6.1-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6S17.5.7 15 2.7a13.2 13.2 0 0 0-7 0C5.5.7 4.3 1.6 4.3 1.6a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.1 6.4 6.1 6.7A3.4 3.4 0 0 0 8 18.1V22" /></>,
  linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
  facebook: <><path d="M15 21v-8h3l.5-4H15V7c0-1.2.4-2 2-2h1.7V1.4C18 1.2 16.8 1 15.4 1 12 1 10 3 10 6.6V9H7v4h3v8z" /></>,
  tiktok: <><path d="M14 3v11.2a4.2 4.2 0 1 1-3-4V7.1a8 8 0 1 0 7 7.9V9.8a9 9 0 0 0 4 1V7a5 5 0 0 1-5-4z" /></>,
  code: <><path d="m8 17-5-5 5-5m8 10 5-5-5-5m-2-12-4 20" /></>,
  smartphone: <><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M11 18h2" /></>,
  plug: <><path d="M12 22v-5m-5-7V2m10 8V2M7 7h10v4a5 5 0 0 1-10 0V7Z" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  sparkles: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" /><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z" /></>,
  workflow: <><rect x="3" y="3" width="6" height="6" rx="1" /><rect x="15" y="15" width="6" height="6" rx="1" /><path d="M6 9v3a3 3 0 0 0 3 3h6m0 0-3-3m3 3-3 3" /></>,
  check: <><path d="m5 12 4 4L19 6" /></>,
  'arrow-right': <><path d="M5 12h14m-7-7 7 7-7 7" /></>,
  eye: <><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>,
  'eye-off': <><path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" /><path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c6.4 0 10 7 10 7a14 14 0 0 1-3 3.8M6.2 6.2C3.5 8 2 12 2 12s3.6 7 10 7a10 10 0 0 0 3.1-.5" /></>,
  building: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 21V9h6v12M7 7h.01M17 7h.01M7 11h.01M17 11h.01" /></>,
  'arrow-up': <><path d="M12 19V5m-7 7 7-7 7 7" /></>,
}

export function Icon({ name, size = 20, ...props }: SVGProps<SVGSVGElement> & { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>
}
