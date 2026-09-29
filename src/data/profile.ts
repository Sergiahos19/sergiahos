import type { IconName } from '../components/Icon'
import portrait from '../../images/profil.jpeg'
import pageBackground from '../../images/aplan.jpeg'

export { pageBackground }

export const profile: {
  name: string
  email: string
  phone: string
  portrait: string
  socials: { label: string; url: string; icon: IconName }[]
} = {
  name: 'Sergiahos',
  email: 'ahossergi@gmail.com',
  phone: '+229 01 56 03 68 00',
  portrait,
  socials: [
    { label: 'Facebook', url: '', icon: 'facebook' },
    { label: 'Instagram', url: '', icon: 'instagram' },
    { label: 'TikTok', url: '', icon: 'tiktok' },
    { label: 'LinkedIn', url: '', icon: 'linkedin' },
    { label: 'GitHub', url: '', icon: 'github' },
  ],
}
