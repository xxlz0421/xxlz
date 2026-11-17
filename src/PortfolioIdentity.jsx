import { AnimatedHeading, ScrollFade } from './AnimatedText';

export function Signature({ className = '' }) {
  return <span className={`orange-signature ${className}`} role="img" aria-label="Li Wei 手写签名" />;
}

export function PortfolioFooter({ reduced, onContact }) {
  return <footer id="contact" className="contact section-pad editorial-footer">
    <div className="contact-top"><span className="eyebrow">05 / THANK YOU FOR WATCHING</span><a href="#home" className="back-top">回到顶部 <span>↑</span></a></div>
    <AnimatedHeading className="thanks-heading" lines={['THANKS']} reduced={reduced} />
    <div className="footer-photo" aria-hidden="true"><img src="./assets/sofa-editorial.png" alt="" loading="lazy" /></div>
    <ScrollFade reduced={reduced} className="footer-contact-copy"><Signature /><p className="footer-invitation">下一个作品，<br /><span>期待与你一起。</span></p><button className="pill-button primary" onClick={onContact}>LET’S TALK <span>↗</span></button><div className="contact-lines"><span>李威 / LI WEI · 电商视觉设计师</span><a href="tel:18573041680"><small>PHONE / WECHAT</small>185 7304 1680</a><a href="mailto:1027688839@qq.com"><small>EMAIL</small>1027688839@qq.com</a></div></ScrollFade>
    <div className="footer-bottom"><a href="#home" className="footer-logo">LI WEI<span>®</span></a><span>E-COMMERCE / CGI / AIGC</span><span>© 2026 李威</span></div>
  </footer>;
}
