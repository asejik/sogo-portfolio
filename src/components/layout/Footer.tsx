import { Github, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';

const socials = [
  { name: 'GitHub', href: 'https://github.com/asejik', Icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/sogoayenigba', Icon: Linkedin },
  { name: 'X', href: 'https://x.com/sogoayenigba', Icon: Twitter },
  { name: 'Instagram', href: 'https://instagram.com/sogoayenigba', Icon: Instagram },
  { name: 'Facebook', href: 'https://facebook.com/asejik', Icon: Facebook },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <p className="font-display text-ivory text-2xl font-semibold">Sogo Ayenigba</p>
          <p className="mt-1 text-stone">AI Application Developer, Ilorin, Nigeria</p>
        </div>
        <ul className="flex gap-2">
          {socials.map(({ name, href, Icon }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className="flex items-center justify-center w-11 h-11 rounded-full border border-line text-stone hover:text-ivory hover:border-stone transition-colors"
              >
                <Icon size={18} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-10 text-sm text-stone">&copy; {year} Sogo Ayenigba</div>
    </footer>
  );
};

export default Footer;
