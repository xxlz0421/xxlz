import './ModelComparison.css';

const sections = [
  { title: '线稿生模特', en: 'LINE ART TO MODEL', pairs: [
    { title: '手袋模特应用', before: '018', after: '022', beforeLabel: '线稿参考', afterLabel: '模特应用' },
    { title: '耳机模特应用', before: '020', after: '023', beforeLabel: '人偶参考', afterLabel: '模特应用' }
  ] },
  { title: '产品使用前后生图', en: 'BEFORE & AFTER / PRODUCT EFFECT', pairs: [
    { title: '吹风机使用效果', before: '021', after: '017', beforeLabel: '使用前', afterLabel: '使用后' },
    { title: '唇妆使用效果', before: '024', after: '019', beforeLabel: '使用前', afterLabel: '使用后' }
  ] }
];

export default function ModelComparison({ collection }) {
  return <article className="model-comparison">
    <header className="model-case-cover">
      <img src={collection.cover} alt="AIGC 模特应用封面" />
      <div className="model-cover-top"><span>LI WEI / VISUAL DESIGN</span><span>PORTFOLIO</span></div>
      <div className="model-cover-title"><span>SELECTED WORKS / 04</span><h3>AIGC 模特应用</h3><p>FROM IDEA TO IMAGE.</p></div>
      <span className="model-cover-mark" aria-hidden="true">↗</span>
    </header>
    {sections.map(section => <section className="model-comparison-section" key={section.en}>
      <header><span>{section.en}</span><h3>{section.title}</h3></header>
      {section.pairs.map(pair => <div className="model-comparison-pair" aria-label={pair.title} key={pair.before}>
        <figure><img src={`./portfolio/aigc/${pair.before}.webp`} alt={`${pair.title} · ${pair.beforeLabel}`} loading="lazy" /><figcaption>{pair.beforeLabel}</figcaption></figure>
        <figure><img src={`./portfolio/aigc/${pair.after}.webp`} alt={`${pair.title} · ${pair.afterLabel}`} loading="lazy" /><figcaption>{pair.afterLabel}</figcaption></figure>
      </div>)}
    </section>)}
  </article>;
}
