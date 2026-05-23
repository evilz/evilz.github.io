import { getAsset, getBlogPermalink, getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Accueil', href: getPermalink('/') },
    { text: 'Articles', href: getBlogPermalink() },
    { text: 'Tags', href: getPermalink('/tags') },
  ],
  actions: [{ text: 'GitHub', href: 'https://github.com/evilz', target: '_blank', icon: 'tabler:brand-github' }],
};

export const footerData = {
  socialLinks: [
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/evilz' },
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/Evilznet' },
    { ariaLabel: 'Email', icon: 'tabler:mail', href: 'mailto:evilz@evilznet.com' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: 'Blog personnel de <span class="font-semibold">Vincent Bourdon</span> — Code for Human.',
};
