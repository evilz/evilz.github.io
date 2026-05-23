import { getAsset, getBlogPermalink, getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Accueil', href: getPermalink('/') },
    { text: 'Articles', href: getBlogPermalink() },
    { text: 'Tags', href: getPermalink('/tags') },
    { text: 'Catégories', href: getPermalink('/categories') },
    { text: 'À propos', href: getPermalink('/about') },
    { text: 'Contact', href: getPermalink('/contact') },
  ],
  actions: [{ text: 'GitHub', href: 'https://github.com/evilz', target: '_blank', icon: 'tabler:brand-github' }],
};

export const footerData = {
  links: [
    {
      title: 'Navigation',
      links: [
        { text: 'Accueil', href: getPermalink('/') },
        { text: 'Articles', href: getBlogPermalink() },
        { text: 'Tags', href: getPermalink('/tags') },
        { text: 'Catégories', href: getPermalink('/categories') },
      ],
    },
    {
      title: 'Contenu',
      links: [
        { text: 'À propos', href: getPermalink('/about') },
        { text: 'Contact', href: getPermalink('/contact') },
        { text: 'Staff', href: getPermalink('/staff') },
        { text: 'RSS', href: getAsset('/rss.xml') },
      ],
    },
    {
      title: 'Profil',
      links: [
        { text: 'GitHub', href: 'https://github.com/evilz' },
        { text: 'X / Twitter', href: 'https://x.com/Evilznet' },
        { text: 'Site', href: 'https://www.evilznet.com' },
        { text: 'Email', href: 'mailto:evilz@evilznet.com' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Mentions du site', href: getPermalink('/about-1') },
    { text: 'Flux RSS', href: getAsset('/rss.xml') },
  ],
  socialLinks: [
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/evilz' },
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/Evilznet' },
    { ariaLabel: 'Email', icon: 'tabler:mail', href: 'mailto:evilz@evilznet.com' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: 'Blog personnel de <span class="font-semibold">Vincent Bourdon</span> — Code for Human.',
};
