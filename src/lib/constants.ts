export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Profile', href: '#profile' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Awards', href: '#awards' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/ohhhdan/',
  email: 'dan@ohhhdan.com',
  github: 'https://github.com/ohhhdan',
};
