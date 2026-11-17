import './ProjectImageLayout.css';

export default function ProjectImageLayout({ collection }) {
  return <div className="project-image-layout" aria-label={`${collection.title}完整作品`}>
    {collection.images.map((image, index) => <figure key={image.src}>
      <img src={image.src} alt={`${collection.title} · 作品 ${index + 1}`} width={image.width} height={image.height} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
      <figcaption><span>{collection.title}</span><span>{String(index + 1).padStart(2, '0')} / {String(collection.images.length).padStart(2, '0')}</span></figcaption>
    </figure>)}
  </div>;
}
