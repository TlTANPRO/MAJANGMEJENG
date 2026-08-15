import { useEffect, useMemo, useState } from 'react';
import { ArrowDownRight, ArrowRight, Menu, X } from 'lucide-react';

type Story={category:string;title:string;dek:string;meta:string;image:string};

const stories:Story[]=[
 {category:'PEOPLE',title:'Stories made by people, not algorithms.',dek:'Majang Mejeng is an editorial space for people, places, culture and ideas worth putting in front of people.',meta:'01 / EDITORIAL',image:'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=82'},
 {category:'PLACES',title:'Look closer at the places around us.',dek:'Local places become memorable when we understand the people and stories behind them.',meta:'02 / PLACES',image:'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=82'},
 {category:'CULTURE',title:'Culture is always in motion.',dek:'From everyday rituals to new creative scenes, we document what is changing and what remains.',meta:'03 / CULTURE',image:'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=82'},
];
const worlds=['PEOPLE','PLACES','CULTURE','FOOD','CREATORS','IDEAS'];

export default function V9(){
 const [menu,setMenu]=useState(false); const [active,setActive]=useState(0); const [progress,setProgress]=useState(0);
 useEffect(()=>{const f=()=>{const h=document.documentElement;setProgress(h.scrollHeight===h.clientHeight?0:h.scrollTop/(h.scrollHeight-h.clientHeight)*100)};addEventListener('scroll',f,{passive:true});f();return()=>removeEventListener('scroll',f)},[]);
 const story=useMemo(()=>stories[active], [active]);
 const jump=(id:string)=>{setMenu(false);history.replaceState(null,'',`#${id}`);document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'})};
 return <div className="v9">
  <div className="v9-progress"><span style={{height:`${progress}%`}}/></div>
  <header className="v9-nav"><button className="v9-brand" onClick={()=>jump('top')} aria-label="Majang Mejeng home"><b>MM</b><span>MAJANG<br/>MEJENG</span></button><nav>{['stories','worlds','social','collaborate'].map(x=><button key={x} onClick={()=>jump(x)}>{x}</button>)}</nav><button className="v9-menu" onClick={()=>setMenu(true)} aria-label="Open menu"><Menu size={20}/></button></header>
  {menu&&<aside className="v9-overlay"><button className="v9-close" onClick={()=>setMenu(false)} aria-label="Close menu"><X/></button><span className="v9-kicker">NAVIGATION / 001</span>{['stories','worlds','social','collaborate'].map(x=><button key={x} onClick={()=>jump(x)}>{x}<ArrowRight/></button>)}</aside>}
  <main id="top">
   <section className="v9-hero"><div className="v9-grain"/><div className="v9-hero-top"><span>INDEPENDENT EDITORIAL MEDIA</span><span>INDONESIA / 2026</span></div><div className="v9-hero-body"><div><p className="v9-kicker">MAJANG MEJENG / 001</p><h1>FOLLOW<br/><em>WHAT</em> IS<br/>MOVING.</h1><p className="v9-lede">People. Places. Culture. Creators. We put stories where they can be seen.</p><div className="v9-actions"><button onClick={()=>jump('stories')}>Explore stories <ArrowDownRight/></button><a href="https://www.instagram.com/majangmejeng_/" target="_blank" rel="noreferrer">Instagram <ArrowRight/></a></div></div><div className="v9-signal" aria-label="Living signal visual"><i/><i/><i/><b/><span>LIVE<br/>SIGNAL</span></div></div><div className="v9-hero-bottom"><span>SCROLL TO DISCOVER</span><span>01 — 06</span></div></section>
   <section className="v9-manifest"><p className="v9-kicker">A NOTE FROM MM</p><h2>We make the<br/><em>ordinary</em> worth<br/>looking at.</h2><p>Majang Mejeng is a visual-first media project built around real stories from Indonesia. No noise for noise's sake. Just things, people and ideas worth noticing.</p></section>
   <section className="v9-stories" id="stories"><div className="v9-section-head"><span className="v9-kicker">01 / STORIES</span><span>EDITORIAL CURRENT</span></div><div className="v9-story-layout"><div className="v9-story-image"><img src={story.image} alt=""/><span>{story.meta}</span></div><div className="v9-story-copy"><span className="v9-kicker">{story.category}</span><h2>{story.title}</h2><p>{story.dek}</p><button onClick={()=>jump('collaborate')}>Start with a story <ArrowRight/></button><div className="v9-story-controls">{stories.map((_,i)=><button key={i} className={i===active?'active':''} onClick={()=>setActive(i)} aria-label={`Story ${i+1}`}>0{i+1}</button>)}</div></div></div></section>
   <section className="v9-worlds" id="worlds"><div><span className="v9-kicker">02 / WORLDS</span><h2>Different<br/>ways to<br/><em>see.</em></h2><p>Choose a lens. The editorial universe changes with it.</p></div><div>{worlds.map((x,i)=><button key={x}><small>0{i+1}</small><strong>{x}</strong><ArrowUpRight/></button>)}</div></section>
   <section className="v9-social" id="social"><div><span className="v9-kicker">03 / SOCIAL CURRENT</span><h2>See what's<br/><em>moving.</em></h2><p>Our social channels are the live edge of Majang Mejeng. Follow the current, then come back for the deeper story.</p></div><div className="v9-social-links"><a href="https://www.instagram.com/majangmejeng_/" target="_blank" rel="noreferrer"><small>INSTAGRAM</small><strong>@majangmejeng_</strong><ArrowUpRight/></a><a href="https://www.tiktok.com/@majangmejeng_?lang=id-ID" target="_blank" rel="noreferrer"><small>TIKTOK</small><strong>@majangmejeng_</strong><ArrowUpRight/></a></div></section>
   <section className="v9-collab" id="collaborate"><span className="v9-kicker">04 / COLLABORATE</span><h2>Have a story<br/>worth <em>showing?</em></h2><div><p>Send us the signal. Stories, people, places, events and collaborations are welcome.</p><a href="mailto:majangmejeng@gmail.com">Start a conversation <ArrowRight/></a></div></section>
  </main>
  <footer className="v9-footer"><span>© 2026 MAJANG MEJENG</span><span>PEOPLE / PLACES / CULTURE</span><a href="https://www.instagram.com/majangmejeng_/" target="_blank" rel="noreferrer">INSTAGRAM ↗</a></footer>
 </div>
}

function ArrowUpRight(){return <ArrowRight className="v9-arrow"/>}
