export default function decorate(block) {
  const rows = [...block.children];
  const [videoRow, contentRow] = rows;

  const videoCell = videoRow?.firstElementChild;
  const videoLink = videoCell?.querySelector('a');
  const poster = videoCell?.querySelector('picture, img');

  const media = document.createElement('div');
  media.className = 'video-hero-media';

  if (videoLink?.href && videoLink.href.endsWith('.mp4')) {
    const video = document.createElement('video');
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('aria-hidden', 'true');
    video.src = videoLink.href;
    media.append(video);
  } else if (poster) {
    media.append(poster);
  } else {
    media.classList.add('is-placeholder');
    media.setAttribute('aria-hidden', 'true');
  }

  const content = document.createElement('div');
  content.className = 'video-hero-content';
  const contentCell = contentRow?.firstElementChild;
  const contentChildren = [...(contentCell?.children || [])];
  const eyebrowElement = contentChildren.find((child) => child.tagName === 'P' && !child.querySelector('a'));
  const heading = contentCell?.querySelector('h1, h2, h3');
  const textElement = contentChildren.find((child) => child.tagName === 'P' && child !== eyebrowElement && !child.querySelector('a'));
  const links = contentCell?.querySelectorAll('a');

  const eyebrow = eyebrowElement?.textContent?.trim();
  if (eyebrow) {
    const p = document.createElement('p');
    p.className = 'video-hero-eyebrow';
    p.textContent = eyebrow;
    content.append(p);
  }

  if (heading) {
    content.append(heading);
  }

  const text = textElement?.textContent?.trim();
  if (text) {
    const p = document.createElement('p');
    p.className = 'video-hero-text';
    p.textContent = text;
    content.append(p);
  }

  if (links?.length) {
    const actions = document.createElement('p');
    actions.className = 'video-hero-actions';
    links.forEach((link, index) => {
      link.className = index === 0 ? 'button primary' : 'button secondary';
      actions.append(link);
    });
    content.append(actions);
  }

  block.textContent = '';
  block.append(media, content);
}
