import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';

type Scene = { id: string; index: string; kicker: string; title: string; body: string; image?: string };

const scenes: Scene[] = [
  { id: 'signal', index: '00', kicker: 'MAJANG MEJENG / SIGNAL', title: 'LOOK CLOSER.', body: 'A living editorial current about people, places, culture and the ideas moving around Indonesia.' },
  { id: 'world', index: '01', kicker: 'ENTER THE WORLD', title: 'THE EVERYDAY IS ALIVE.', body: 'We turn the ordinary into a reason to stop, look and feel something.', image: '/MAJANGMEJENG/coastline.jpg' },
  { id: 'people', index: '02', kicker: 'PEOPLE / 01—04', title: 'PEOPLE MAKE THE PLACE.', body: 'Portraits, makers, founders, communities and the characters behind the scene.', image: '/MAJANGMEJENG/editorial-portrait.jpg' },
  { id: 'places', index: '03', kicker: 'PLACES / FIELD NOTES', title: 'GO A LITTLE CLOSER.', body: 'Local places, hidden corners and landscapes that deserve a second look.', image: '/MAJANGMEJENG/coastline.jpg' },
  { id: 'culture', index: '04', kicker: 'CULTURE / IN MOTION', title: 'CULTURE NEVER STANDS STILL.', body: 'Food, rituals, visual language, music and the scenes changing beneath the surface.', image: '/MAJANGMEJENG/studio-table.jpg' },
  { id: 'creators', index: '05', kicker: 'CREATORS / NOW', title: 'MADE BY PEOPLE.', body: 'A growing index of creators, artists and local brands worth discovering.', image: '/MAJANGMEJENG/editorial-portrait.jpg' },
  { id: 'current', index: '06', kicker: 'SOCIAL CURRENT', title: 'SEE WHAT IS MOVING.', body: 'Social is the live edge. The website is where the signal becomes a deeper story.' },
  { id: 'stories', index: '07', kicker: 'FEATURED STORIES', title: 'STAY FOR THE STORY.', body: 'Enter an editorial story and keep moving through the world of Majang Mejeng.' },
  { id: 'collaborate', index: '08', kicker: 'COLLABORATE', title: 'HAVE SOMETHING WORTH SHOWING?', body: 'Send us a signal. Stories, people, places, events and collaborations are welcome.' },
];

const social = {
  instagram: 'https://www.instagram.com/majangmejeng_/',
  tiktok: 'https://www.tiktok.com/@majangmejeng_?lang=id-ID',
};

function clamp(v: number, min = 0, max = 1) { return Math.max(min, Math.min(max, v)); }

export default function V10() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('signal');
  const [menu, setMenu] = useState(false);
  const [story, setStory] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
        const sections = scenes.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
        const marker = window.scrollY + window.innerHeight * 0.42;
        let current = sections[0]?.id ?? 'signal';
        for (const el of sections) if (marker >= el.offsetTop) current = el.id;
        setActive(current);
      });
    };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    onScroll();
    return () => { cancelAnimationFrame(raf); removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); };
  }, []);

  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); history.replaceState(null, '', `#${id}`); };
  const storyTitles = useMemo(() => ['Stories made by people, not algorithms.', 'Look closer at the places around us.', 'Culture is always in motion.'], []);
  const storyImages = ['/MAJANGMEJENG/editorial-portrait.jpg', '/MAJANGMEJENG/coastline.jpg', '/MAJANGMEJENG/studio-table.jpg'];

  return <div className="v10" style={{ '--scroll': progress } as React.CSSProperties}>
    <div className="v10-progress"><span style={{ transform: `scaleY(${progress})` }} /></div>
    <header className={`v10-nav ${progress > 0.08 ? 'is-scrolled' : ''}`}>
      <button className="v10-logo" onClick={() => go('signal')} aria-label="Majang Mejeng home"><b>MM</b><span>MAJANG<br/>MEJENG</span></button>
      <div className="v10-nav-center"><span>INDEPENDENT MEDIA</span><i>{String(Math.round(progress * 100)).padStart(3, '0')}%</i></div>
      <button className="v10-menu" onClick={() => setMenu(true)} aria-label="Open navigation"><span>MENU</span><Menu size={19}/></button>
    </header>

    {menu && <aside className="v10-menu-panel" role="dialog" aria-modal="true">
      <button className="v10-close" onClick={() => setMenu(false)} aria-label="Close navigation"><X/></button>
      <span className="v10-mono">NAVIGATION / 001</span>
      <div>{scenes.slice(1).map(s => <button key={s.id} onClick={() => go(s.id)}><small>{s.index}</small><strong>{s.title}</strong><ArrowRight/></button>)}</div>
      <footer><a href={social.instagram} target="_blank" rel="noreferrer">INSTAGRAM ↗</a><a href={social.tiktok} target="_blank" rel="noreferrer">TIKTOK ↗</a></footer>
    </aside>}

    <main>
      <section id="signal" className="v10-scene v10-signal-scene">
        <div className="v10-noise" />
        <div className="v10-topline"><span>INDONESIA / 2026</span><span>SCROLL TO ENTER</span></div>
        <div className="v10-signal-core" style={{ transform: `translateY(${progress * -80}px) scale(${1 + progress * .04})` }}>
          <div className="v10-rings"><i/><i/><i/><i/></div>
          <div className="v10-cross v10-cross-a"/><div className="v10-cross v10-cross-b"/>
          <span className="v10-dot"/><span className="v10-orbit o1"/><span className="v10-orbit o2"/>
          <div className="v10-signal-word">MM</div>
        </div>
        <div className="v10-hero-copy"><span className="v10-mono">{scenes[0].kicker}</span><h1>FOLLOW<br/><em>WHAT</em><br/>IS MOVING.</h1><p>{scenes[0].body}</p><button onClick={() => go('world')}>Enter the world <ArrowDownRight/></button></div>
        <div className="v10-bottomline"><span>00 — 08</span><span>PEOPLE / PLACES / CULTURE / CREATORS</span></div>
      </section>

      <section id="world" className="v10-scene v10-world-scene">
        <div className="v10-sticky">
          <div className="v10-world-image"><img src={scenes[1].image} alt="Editorial landscape"/><div className="v10-image-shade"/></div>
          <div className="v10-world-type"><span className="v10-mono">{scenes[1].kicker}</span><h2>THE<br/><em>EVERYDAY</em><br/>IS ALIVE.</h2><p>{scenes[1].body}</p></div>
          <div className="v10-scroll-cue"><ArrowDown/><span>KEEP MOVING</span></div>
        </div>
      </section>

      <section id="people" className="v10-scene v10-story-scene light">
        <div className="v10-sticky split">
          <div className="v10-story-index"><span className="v10-mono">{scenes[2].index}</span><span className="v10-vertical">PEOPLE / PORTRAIT / FIELD</span></div>
          <div className="v10-story-photo"><img src={scenes[2].image} alt="Editorial portrait"/><span>01 / PEOPLE</span></div>
          <div className="v10-story-type"><span className="v10-mono">{scenes[2].kicker}</span><h2>PEOPLE<br/><em>MAKE</em><br/>THE PLACE.</h2><p>{scenes[2].body}</p><button onClick={() => go('stories')}>Open stories <ArrowRight/></button></div>
        </div>
      </section>

      <section id="places" className="v10-scene v10-places-scene light">
        <div className="v10-sticky"><div className="v10-places-title"><span className="v10-mono">{scenes[3].kicker}</span><h2>GO A<br/><em>LITTLE</em><br/>CLOSER.</h2></div><div className="v10-place-strip"><img src={scenes[3].image} alt="Editorial place"/><div className="v10-place-meta"><b>FIELD NOTES</b><span>LOCAL / INDONESIA</span><ArrowUpRight/></div></div><div className="v10-place-line"><span>PLACE IS A STORY</span><span>03 / 09</span></div></div>
      </section>

      <section id="culture" className="v10-scene v10-culture-scene">
        <div className="v10-sticky"><div className="v10-culture-bg"><img src={scenes[4].image} alt="Culture editorial"/></div><div className="v10-culture-copy"><span className="v10-mono">{scenes[4].kicker}</span><h2>CULTURE<br/><em>NEVER</em><br/>STANDS STILL.</h2><p>{scenes[4].body}</p></div><div className="v10-culture-number">04</div></div>
      </section>

      <section id="creators" className="v10-scene v10-creators-scene light">
        <div className="v10-sticky"><div className="v10-creators-head"><span className="v10-mono">{scenes[5].kicker}</span><h2>MADE<br/><em>BY</em><br/>PEOPLE.</h2></div><div className="v10-creator-cards"><article><img src={scenes[5].image} alt="Creator"/><span>CREATOR / 001</span></article><article><img src={scenes[2].image} alt="Creator"/><span>CREATOR / 002</span></article></div><p>{scenes[5].body}</p></div>
      </section>

      <section id="current" className="v10-scene v10-current-scene">
        <div className="v10-sticky"><div className="v10-current-head"><span className="v10-mono">{scenes[6].kicker}</span><h2>SEE WHAT<br/><em>IS MOVING.</em></h2><p>{scenes[6].body}</p></div><div className="v10-social-cards"><a href={social.instagram} target="_blank" rel="noreferrer"><small>INSTAGRAM</small><strong>@majangmejeng_</strong><ArrowUpRight/></a><a href={social.tiktok} target="_blank" rel="noreferrer"><small>TIKTOK</small><strong>@majangmejeng_</strong><ArrowUpRight/></a></div></div>
      </section>

      <section id="stories" className="v10-scene v10-stories-scene light">
        <div className="v10-sticky split-story"><div><span className="v10-mono">{scenes[7].kicker}</span><h2>STAY FOR<br/><em>THE STORY.</em></h2><p>{scenes[7].body}</p></div><div className="v10-feature"><img src={storyImages[story]} alt="Featured story"/><span>0{story + 1} / 03</span><h3>{storyTitles[story]}</h3><div>{storyTitles.map((_, i) => <button key={i} onClick={() => setStory(i)} className={i === story ? 'active' : ''}>{String(i + 1).padStart(2, '0')}</button>)}</div></div></div>
      </section>

      <section id="collaborate" className="v10-scene v10-end-scene">
        <div className="v10-sticky v10-end-inner"><div className="v10-end-word">KEEP<br/><em>LOOKING.</em></div><div className="v10-end-copy"><span className="v10-mono">{scenes[8].kicker}</span><h2>HAVE SOMETHING<br/>WORTH SHOWING?</h2><p>{scenes[8].body}</p><a href="mailto:majangmejeng@gmail.com">Start a conversation <ArrowRight/></a></div><div className="v10-end-loop"><button onClick={() => go('signal')}>BACK TO THE BEGINNING <ArrowUpRight/></button></div></div>
      </section>
    </main>
    <footer className="v10-footer"><b>MM</b><span>© 2026 MAJANG MEJENG</span><span>PEOPLE / PLACES / CULTURE / CREATORS</span><a href={social.instagram} target="_blank" rel="noreferrer">INSTAGRAM</a><a href={social.tiktok} target="_blank" rel="noreferrer">TIKTOK</a></footer>
  </div>;
}
