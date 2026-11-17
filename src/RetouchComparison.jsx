import { retouchPairs } from './projects';
import './RetouchComparison.css';

export default function RetouchComparison() {
  return <div className="retouch-comparisons" aria-label="产品精修前后对比">
    {retouchPairs.map((pair, index) => <section className="retouch-pair" key={pair.after} aria-label={`${pair.title}精修对比`}>
      <header><span>{String(index + 1).padStart(2, '0')} / {String(retouchPairs.length).padStart(2, '0')}</span><h3>{pair.title}</h3></header>
      <div className="retouch-pair-images">
        <figure><figcaption><span>BEFORE</span>精修前</figcaption><img src={pair.before} alt={`${pair.title} · 精修前`} loading={index === 0 ? 'eager' : 'lazy'} /></figure>
        <figure><figcaption><span>AFTER</span>精修后</figcaption><img src={pair.after} alt={`${pair.title} · 精修后`} loading={index === 0 ? 'eager' : 'lazy'} /></figure>
      </div>
    </section>)}
  </div>;
}
