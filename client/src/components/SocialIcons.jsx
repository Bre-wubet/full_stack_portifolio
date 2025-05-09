import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const SocialIcons = () => {
  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com', color: 'hover:text-gray-800', delay: '0s' },
    { icon: FaLinkedin, href: 'https://linkedin.com', color: 'hover:text-blue-600', delay: '0.2s' },
    { icon: FaTwitter, href: 'https://twitter.com', color: 'hover:text-blue-400', delay: '0.4s' },
    { icon: FaEnvelope, href: 'mailto:your.email@example.com', color: 'hover:text-red-500', delay: '0.6s' }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {socialLinks.map((social, index) => {
        const Icon = social.icon;
        const angle = (index * (360 / socialLinks.length)) * (Math.PI / 180);
        const radius = '120px';
        
        return (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto
              transform transition-all duration-300 ${social.color}`}
            style={{
              animation: `orbit 20s linear infinite`,
              animationDelay: social.delay,
              transform: `rotate(${angle}rad) translateX(${radius}) rotate(-${angle}rad)`
            }}
          >
            <Icon className="text-2xl transition-transform hover:scale-125" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialIcons;