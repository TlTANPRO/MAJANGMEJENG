import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X, Search, Plus } from 'lucide-react';

const base = '/MAJANGMEJENG/';
const whatsapp = 'https://wa.me/6282225666497?text=Halo%20Majang%20Mejeng%2C%20saya%20ingin%20memulai%20percakapan.';
const social = { instagram: 'https://www.instagram.com/majangmejeng_/', tiktok: 'https://www.tiktok.com/@majangmejeng_?lang=id-ID' };
const nav = [['index','INDEX'],['people','PEOPLE'],['places','PLACES'],['culture','CULTURE'],['creators','CREATORS'],['current','CURRENT'],['stories','STORIES'],['community','COMMUNITY'],['collaborate','COLLABORATE']];
const images = {
  people: `${base}editorial-portrait.jpg`,
  places: `${base}coastline.jpg`,
  culture: `${base}studio-table.jpg`,
  creators: `${base}editorial-portrait.jpg`,
};
const stories = [
  { title: 'The people behind the everyday.', type: 'PEOPLE', text: 'Portraits, makers, founders and communities behind the things worth noticing.', image: images.people },
  { title: 'Places that reward a slower look.', type: 'PLACES', text: 'Field notes from streets, corners and landscapes that deserve another look.', image: images.places },
  { title: 'Culture in motion.', type: 'CULTURE', text: 'Food, rituals, visual language, music and scenes changing beneath the surface.', image: images.culture },
];
function jump(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'auto', block: 'start' });
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);
}
export default function V12() {
  const [menu,setMenu] = useState(false), [searchOpen,setSearchOpen] = useState(false), [query,setQuery] = useState(''), [story,setStory] = useState<number|null>(null), [saved,setSaved] = useState<number[]>([]);
  const filtered = stories.filter(s => (s.title + ' ' + s.type + ' ' + s.text).toLowerCase().includes(query.toLowerCase()));
  const toggleSave = (i:number) => setSaved(v => v.includes(i) ? v.filter(x => x !== i) : [...v,i]);
  return <div className="v12">
    <header className="v12-header">
      <button className="v12-brand" onClick={() => jump('signal')} aria-label="Majang Mejeng home"><b>MM</b><span>MAJANG<br/>MEJENG</span></button>
      <div className="v12-status"><span>INDEPENDENT MEDIA / INDONESIA</span><b>THE CURRENT</b></div>
      <div className="v12-actions"><button onClick={() => setSearchOpen(true)} aria-label="Search"><Search size={18}/></button><button className="v12-menu" onClick={() => setMenu(true)}><span>MENU</span><Menu size={18}/></button></div>
    </header>
    {menu && <aside className="v12-drawer" role="dialog" aria-modal="true"><button className="v12-close" onClick={() => setMenu(false)} aria-label="Close navigation"><X/></button><small>NAVIGATION / 001</small>{nav.map(([id,label],i)=><button key={id} onClick={() => {setMenu(false);jump(id)}}><em>0{i+1}</em><strong>{label}</strong><ArrowRight/></button>)}<footer><a href={social.instagram} target="_blank" rel="noreferrer">INSTAGRAM ↗</a><a href={social.tiktok} target="_blank" rel="noreferrer">TIKTOK ↗</a></footer></aside>}
    {searchOpen && <div className="v12-search"><button className="v12-close" onClick={() => {setSearchOpen(false);setQuery('')}} aria-label="Close search"><X/></button><small>SEARCH THE CURRENT</small><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="People, places, culture..."/><div>{query && filtered.map(s=><button key={s.title} onClick={()=>{setSearchOpen(false);setStory(stories.indexOf(s))}}><span>{s.type}</span><strong>{s.title}</strong><ArrowRight/></button>)}{query&&!filtered.length&&<p>No story found. Try another keyword.</p>}</div></div>}
    {story !== null && <div className="v12-reader"><button className="v12-reader-close" onClick={()=>setStory(null)} aria-label="Close story"><X/></button><div className="v12-reader-image"><img src={stories[story].image} alt=""/></div><div className="v12-reader-copy"><small>{stories[story].type} / FIELD NOTE</small><h2>{stories[story].title}</h2><p>{stories[story].text} This is where Majang Mejeng adds context beyond the fast-moving feed: who made it, why it matters and what to notice next.</p><div className="v12-reader-actions"><button onClick={()=>toggleSave(story)}><Plus size={18}/>{saved.includes(story)?'SAVED':'SAVE STORY'}</button><button onClick={()=>navigator.clipboard?.writeText(location.href)}><ArrowUpRight size={18}/>SHARE</button></div></div></div>}
    <main>
      <section id="signal" className="v12-scene v12-signal"><div className="v12-grain"/><div className="v12-eyebrow">MAJANG MEJENG / 001</div><div className="v12-mark">MM</div><div className="v12-hero"><small>FOLLOW WHAT IS MOVING.</small><h1>LOOK<br/><em>CLOSER.</em></h1><p>Independent stories about people, places, culture and the ideas changing the everyday.</p><button onClick={()=>jump('proposition')}>ENTER THE CURRENT <ArrowDown/></button></div><div className="v12-edge">SCROLL / 001 — 013</div></section>
      <section id="proposition" className="v12-scene v12-proposition"><span className="v12-scene-no">01</span><div><small>WHAT IS MAJANG MEJENG?</small><h2>WE MAKE THE<br/><em>LOCAL</em> WORTH<br/>LOOKING AT.</h2></div><p>Not a feed. Not a catalogue. An editorial layer that connects the things worth noticing with the people who make them happen.</p><div className="v12-line">SCROLL TO DISCOVER <ArrowRight/></div></section>
      <section id="index" className="v12-scene v12-index"><div><small>THE INDEX / 05 WORLDS</small><h2>WHERE DO<br/><em>YOU</em> WANT<br/>TO GO?</h2></div><div className="v12-index-list">{[['01','PEOPLE','Faces, makers, communities'],['02','PLACES','Corners, cities, landscapes'],['03','CULTURE','Food, rituals, music, scenes'],['04','CREATORS','Artists, brands, builders'],['05','STORIES','Longer reads and field notes']].map(([n,t,d])=><button key={t} onClick={()=>jump(t.toLowerCase())}><i>{n}</i><strong>{t}</strong><span>{d}</span><ArrowUpRight/></button>)}</div></section>
      <section id="proof" className="v12-scene v12-proof"><div><small>WHY THIS EXISTS</small><h2>OBSERVATION<br/><em>BEFORE</em><br/>NOISE.</h2></div><div className="v12-proof-grid"><article><b>01</b><strong>FIELD</strong><span>Stories begin with being there.</span></article><article><b>02</b><strong>PEOPLE</strong><span>Credit the humans behind the scene.</span></article><article><b>03</b><strong>CONTEXT</strong><span>Give a post a world around it.</span></article></div></section>
      <section id="people" className="v12-scene v12-editorial"><div className="v12-photo"><img src={images.people} alt="People editorial"/></div><div className="v12-copy"><small>02 / PEOPLE</small><h2>PEOPLE<br/><em>MAKE</em><br/>THE PLACE.</h2><p>{stories[0].text}</p><button onClick={()=>setStory(0)}>OPEN FEATURE <ArrowRight/></button></div></section>
      <section id="places" className="v12-scene v12-editorial v12-places"><div className="v12-copy"><small>03 / PLACES</small><h2>GO A<br/><em>LITTLE</em><br/>CLOSER.</h2><p>{stories[1].text}</p><button onClick={()=>setStory(1)}>OPEN FEATURE <ArrowRight/></button></div><div className="v12-photo"><img src={images.places} alt="Place editorial"/></div></section>
      <section id="culture" className="v12-scene v12-culture"><div className="v12-culture-bg"><img src={images.culture} alt="Culture editorial"/></div><div className="v12-culture-copy"><small>04 / CULTURE</small><h2>CULTURE<br/><em>NEVER</em><br/>STANDS STILL.</h2><p>{stories[2].text}</p><button onClick={()=>setStory(2)}>OPEN FEATURE <ArrowRight/></button></div></section>
      <section id="creators" className="v12-scene v12-creators"><div><small>05 / CREATORS</small><h2>MADE<br/><em>BY</em><br/>PEOPLE.</h2></div><div className="v12-creator-stack"><img src={images.creators} alt="Creator editorial"/><button onClick={()=>setStory(0)}><b>CREATOR INDEX</b><span>Artists / photographers / makers / local brands</span><ArrowUpRight/></button></div></section>
      <section id="current" className="v12-scene v12-current"><div><small>06 / SOCIAL CURRENT</small><h2>THE FEED<br/><em>IS LIVE.</em></h2><p>Instagram and TikTok are the live edge. The website adds context, archives the signal and turns moments into stories.</p></div><div className="v12-social-grid"><a href={social.instagram} target="_blank" rel="noreferrer"><small>INSTAGRAM</small><strong>@majangmejeng_</strong><ArrowUpRight/></a><a href={social.tiktok} target="_blank" rel="noreferrer"><small>TIKTOK</small><strong>@majangmejeng_</strong><ArrowUpRight/></a></div></section>
      <section id="stories" className="v12-scene v12-stories"><div><small>07 / FEATURED STORIES</small><h2>STAY FOR<br/><em>THE STORY.</em></h2></div><div className="v12-story-list">{stories.map((s,i)=><button key={s.title} onClick={()=>setStory(i)}><i>0{i+1}</i><strong>{s.title}</strong><span>{s.type} / FIELD NOTE {saved.includes(i)?'· SAVED':''}</span><ArrowRight/></button>)}</div></section>
      <section id="community" className="v12-scene v12-community"><div><small>08 / COMMUNITY</small><h2>THE WORLD<br/><em>GETS BIGGER</em><br/>WHEN PEOPLE<br/>CONNECT.</h2></div><div className="v12-community-grid">{['CREATORS','COMMUNITIES','LOCAL BRANDS','EVENTS','IDEAS','COLLABORATIONS'].map(x=><button key={x}>{x}</button>)}</div></section>
      <section id="collaborate" className="v12-scene v12-collaborate"><div className="v12-end-mark">MM</div><div><small>09 / COLLABORATE</small><h2>HAVE SOMETHING<br/><em>WORTH SHOWING?</em></h2><p>Send a story, person, place, event or collaboration. If it deserves a closer look, let's talk.</p><a href={whatsapp}>START A CONVERSATION <ArrowRight/></a></div><button onClick={()=>jump('signal')}>BACK TO THE BEGINNING ↑</button></section>
    </main>
    <footer className="v12-footer"><b>MM</b><span>© 2026 MAJANG MEJENG</span><span>PEOPLE / PLACES / CULTURE / CREATORS</span><a href={social.instagram} target="_blank" rel="noreferrer">INSTAGRAM ↗</a><a href={social.tiktok} target="_blank" rel="noreferrer">TIKTOK ↗</a></footer>
  </div>;
}
