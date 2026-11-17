import BlurText from './reactbits/BlurText';
import FadeContent from './reactbits/FadeContent';

export function AnimatedHeading({ lines, as: Tag = 'h2', className = '', reduced, hero = false, id }) {
  return <Tag className={`animated-heading ${className}`} id={id}>{lines.map((line, i) => reduced ? <span className="blur-line static" key={line}>{line}</span> : <BlurText key={line} as="span" text={line} className={`blur-line blur-line-${i}`} animateBy="letters" direction="top" effect="drift" delay={hero ? 65 : 30} stepDuration={0.45} blur={9} distance={30} trigger={hero ? 'load' : 'view'} replayOnHover />)}</Tag>;
}

export function ScrollFade({ children, className = '', reduced, delay = 0 }) {
  return reduced ? <div className={className}>{children}</div> : <FadeContent className={className} effect="focus" blur={8} duration={1.05} delay={delay} threshold={0.16} initialOpacity={0} once={false}>{children}</FadeContent>;
}
