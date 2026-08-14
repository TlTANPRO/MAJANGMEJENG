import { useEffect, useState, type FormEvent } from 'react';
import logoAsset from '@assets/IMG_1920_1786731585196.png';
import {
  ArrowDownRight,
  ArrowUpRight,
  Instagram,
  Menu,
  Search,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const logo = logoAsset;

type Story = {
  id: string;
  category: string;
  title: string;
  dek: string;
  image: string;
};

const stories: Story[] = [
  { id: '01', category: 'Kota', title: 'Di balik riuhnya Pasar Santa, ada kota yang sedang belajar mendengar', dek: 'Ruang kecil, suara besar. Menyusuri tempat-tempat yang membuat Jakarta terasa punya nadi.', image: '/editorial-portrait.jpg' },
  { id: '02', category: 'Orang', title: 'Mereka yang memilih pulang, lalu membuat rumahnya sendiri', dek: 'Empat percakapan tentang pulang, tumbuh, dan keberanian untuk memulai lagi.', image: '/coastline.jpg' },
  { id: '03', category: 'Karya', title: 'Zine, stiker, dan hal-hal kecil yang menolak hilang', dek: 'Catatan dari meja kerja para pembuat gambar di kota yang tidak pernah benar-benar tidur.', image: '/studio-table.jpg' },
];

const creators = [
  { name: 'Rara Sekar', role: 'Musisi · Yogyakarta', quote: '“Yang lokal bukan batas. Ia adalah bahasa pertama.”', mark: 'RS' },
  { name: 'Jalu Kancana', role: 'Fotografer · Bandung', quote: '“Saya memotret apa yang biasanya dilewati.”', mark: 'JK' },
  { name: 'Nana Kautsar', role: 'Perupa · Makassar', quote: '“Bikin karya itu seperti bikin ruang untuk bernapas.”', mark: 'NK' },
];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function Router() {
  const [location] = useLocation();
  return (
    <ErrorBoundary resetKey={location}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

function Header({ onSearch }: { onSearch: () => void }) {
  const [open, setOpen] = useState(false);
  const nav = [
    ['Stories', '#stories'],
    ['People', '#people'],
    ['Studio', '#studio'],
    ['About', '#about'],
  ];
  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <header className="absolute left-0 right-0 top-0 z-40 text-[#f5f0e7]">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-10 md:py-7">
        <button onClick={() => go('#top')} className="flex items-center" data-testid="button-brand-home" aria-label="Kembali ke atas">
          <img src={logo} alt="Majang Mejeng" className="h-[54px] w-[54px] object-cover md:h-[68px] md:w-[68px]" />
          <span className="sr-only">Majang Mejeng</span>
        </button>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map(([label, href]) => <button key={href} onClick={() => go(href)} className="font-mono-custom text-[11px] uppercase tracking-[.16em] text-[#ded6ca] transition-colors hover:text-[#ff5600]" data-testid={`link-nav-${label.toLowerCase()}`}>{label}</button>)}
        </nav>
        <div className="flex items-center gap-4">
          <button onClick={onSearch} className="flex items-center gap-2 font-mono-custom text-[11px] uppercase tracking-[.16em] text-[#ded6ca] transition-colors hover:text-[#ff5600]" data-testid="button-open-search"><Search size={16} strokeWidth={1.5} /><span className="hidden sm:inline">Cari</span></button>
          <button onClick={() => setOpen(!open)} className="border border-[#f5f0e7]/50 p-2 md:hidden" data-testid="button-mobile-menu" aria-label="Buka menu"><Menu size={19} /></button>
          <button onClick={() => go('#contact')} className="hidden border border-[#ff5600] px-4 py-2 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[#ff5600] transition-colors hover:bg-[#ff5600] hover:text-[#15120f] sm:block" data-testid="button-header-collaborate">Kolaborasi</button>
        </div>
      </div>
      {open && <div className="border-t border-[#f5f0e7]/20 bg-[#15120f] px-5 py-5 md:hidden">
        <nav className="grid gap-4">
          {nav.map(([label, href]) => <button key={href} onClick={() => go(href)} className="flex items-center justify-between border-b border-[#f5f0e7]/15 pb-3 text-left font-display text-2xl" data-testid={`link-mobile-${label.toLowerCase()}`}>{label}<ArrowUpRight size={18} className="text-[#ff5600]" /></button>)}
          <button onClick={() => go('#contact')} className="mt-2 bg-[#ff5600] px-4 py-3 text-left font-mono-custom text-xs uppercase tracking-widest text-[#15120f]" data-testid="button-mobile-collaborate">Mulai kolaborasi <ArrowUpRight className="inline" size={15} /></button>
        </nav>
      </div>}
    </header>
  );
}

function SearchPanel({ query, setQuery, onClose }: { query: string; setQuery: (v: string) => void; onClose: () => void }) {
  const found = stories.filter((story) => `${story.title} ${story.category}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="fixed inset-0 z-50 flex items-start justify-center bg-[#15120f]/95 px-5 pt-[20vh] text-[#f5f0e7]">
    <div className="w-full max-w-3xl">
      <div className="mb-5 flex items-center justify-between"><span className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#ff5600]">Pencarian Majang</span><button onClick={onClose} data-testid="button-close-search" aria-label="Tutup pencarian"><X /></button></div>
      <div className="flex items-center gap-4 border-b-2 border-[#f5f0e7] pb-4"><Search size={28} className="text-[#ff5600]" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari cerita, orang, atau kota..." className="w-full bg-transparent font-display text-3xl outline-none placeholder:text-[#f5f0e7]/35 md:text-5xl" data-testid="input-search" /></div>
      <div className="mt-8 grid gap-2">{query && (found.length ? found.map((story) => <button key={story.id} onClick={() => { onClose(); document.querySelector('#stories')?.scrollIntoView({ behavior: 'smooth' }); }} className="flex items-center justify-between border-b border-[#f5f0e7]/20 py-4 text-left hover:text-[#ff5600]" data-testid={`result-search-${story.id}`}><span><span className="mr-4 font-mono-custom text-[10px] uppercase text-[#ff5600]">{story.category}</span>{story.title}</span><ArrowUpRight size={17} /></button>) : <p className="font-mono-custom text-xs text-[#f5f0e7]/55">Belum ada cerita dengan kata itu.</p>)}</div>
    </div>
  </div>;
}

function StoryCard({ story, onOpen }: { story: Story; onOpen: (story: Story) => void }) {
  return <button onClick={() => onOpen(story)} className="story-link group relative block w-full text-left" data-testid={`card-story-${story.id}`}>
    <div className="image-reveal relative aspect-[4/3] overflow-hidden border border-[#15120f]">
      <img src={story.image} alt={story.title} className="h-full w-full object-cover" />
      <span className="absolute left-3 top-3 bg-[#ff5600] px-2 py-1 font-mono-custom text-[9px] uppercase tracking-[.12em] text-[#15120f]">{story.category}</span>
      <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f0e7] text-[#15120f]"><ArrowUpRight size={16} className="story-arrow" /></span>
    </div>
    <div className="border-x border-b border-[#15120f] px-4 pb-5 pt-4 md:px-5">
      <span className="font-mono-custom text-[10px] text-current/60">CERITA / {story.id}</span>
      <h3 className="mt-3 font-display text-[24px] font-semibold leading-[1.02] md:text-[29px]">{story.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-current/65">{story.dek}</p>
    </div>
  </button>;
}

function Home() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = 'Majang Mejeng — Yang menarik, kami pajang.';
  }, []);

  const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  const submitEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.trim()) setSent(true);
  };

  return <main id="top" className="page-shell noise bg-[#f5f0e7]">
    <Header onSearch={() => setSearchOpen(true)} />
    {searchOpen && <SearchPanel query={query} setQuery={setQuery} onClose={() => { setSearchOpen(false); setQuery(''); }} />}

    <section className="relative min-h-[720px] overflow-hidden bg-[#15120f] text-[#f5f0e7] md:min-h-[860px]">
      <div className="absolute right-[-12vw] top-[20%] h-[58vw] w-[58vw] max-h-[780px] max-w-[780px] rounded-full bg-[#ff5600] md:right-[-8vw] md:top-[13%]" />
      <div className="absolute bottom-0 left-0 right-0 z-10 h-24 bg-gradient-to-t from-[#15120f] to-transparent" />
      <div className="relative z-20 mx-auto grid max-w-[1440px] gap-8 px-5 pb-16 pt-40 md:grid-cols-[1.1fr_.9fr] md:px-10 md:pb-24 md:pt-52">
        <div className="reveal max-w-[760px]">
          <div className="mb-7 flex items-center gap-3 font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#ff5600]"><span className="orange-rule" /> Media & creative platform / Indonesia</div>
          <h1 className="font-display text-[clamp(4rem,11vw,10.5rem)] font-semibold leading-[.82] tracking-[-.075em]">Yang<br /><em className="not-italic text-[#ff5600]">menarik,</em><br />kami pajang.</h1>
          <p className="mt-9 max-w-md text-base leading-relaxed text-[#f5f0e7]/70 md:ml-2 md:text-lg">Cerita, orang, budaya, dan momen yang layak dilihat dua kali. Dari sini, untuk siapa saja yang penasaran.</p>
        </div>
        <div className="relative mt-4 flex items-end justify-end md:mt-20">
          <div className="reveal reveal-delay-2 relative w-[82%] max-w-[420px]">
            <div className="image-reveal aspect-[4/5] overflow-hidden border-2 border-[#15120f] bg-[#dfd2bc]">
              <img src="/editorial-portrait.jpg" alt="Potret editorial Majang Mejeng" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#15120f] bg-[#f5f0e7] text-center font-mono-custom text-[9px] uppercase leading-tight text-[#15120f] md:-left-12 md:h-28 md:w-28">Scroll<br />pelan-pelan<br /><ArrowDownRight size={17} className="mx-auto mt-1" /></div>
            <p className="absolute -right-5 top-4 font-mono-custom text-[9px] uppercase tracking-[.14em] text-[#15120f] [writing-mode:vertical-rl]">Vol. 01 — Jakarta & sekitarnya</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-5 z-20 font-mono-custom text-[10px] uppercase tracking-[.17em] text-[#f5f0e7]/50 md:left-10">01 / 08 — Selamat datang di meja kami</div>
    </section>

    <div className="overflow-hidden border-b border-[#15120f] bg-[#ff5600] py-4 text-[#15120f]">
      <div className="marquee-track flex items-center gap-8 font-display text-2xl font-semibold uppercase tracking-[-.03em] md:text-4xl">{Array.from({ length: 2 }).map((_, i) => <span key={i} className="flex items-center gap-8">Orang menarik <span className="text-[#f5f0e7]">+</span> Tempat yang punya cerita <span className="text-[#f5f0e7]">+</span> Karya yang bikin berhenti <span className="text-[#f5f0e7]">+</span></span>)}</div>
    </div>

    <section id="about" className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-[.65fr_1fr] md:px-10 md:py-36">
      <div><span className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#ff5600]">02 / Cara kami melihat</span><div className="orange-rule mt-5" /></div>
      <div className="max-w-3xl"><h2 className="font-display text-[clamp(2.7rem,6vw,6.4rem)] font-semibold leading-[.9] tracking-[-.07em]">Dunia terlalu penuh untuk dilewati begitu saja<span className="text-[#ff5600]">.</span></h2><p className="mt-9 max-w-xl text-lg leading-relaxed text-[#15120f]/65">Majang Mejeng adalah rumah media dan creative platform untuk hal-hal yang sering luput dari headline. Kami bertemu dengan pembuat, penjelajah, dan penggerak; lalu membawa ceritanya lebih dekat.</p><button onClick={() => scroll('#stories')} className="mt-10 inline-flex items-center gap-3 border-b border-[#15120f] pb-2 font-mono-custom text-[11px] uppercase tracking-[.14em] transition-colors hover:border-[#ff5600] hover:text-[#ff5600]" data-testid="button-explore-stories">Lihat cerita pilihan <ArrowDownRight size={16} /></button></div>
    </section>

    <section id="stories" className="bg-[#dfd2bc] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-5"><div><span className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#ff5600]">03 / Pilihan redaksi</span><h2 className="mt-4 font-display text-5xl font-semibold tracking-[-.06em] md:text-7xl">Yang sedang <em className="not-italic text-[#ff5600]">dipajang.</em></h2></div><span className="max-w-[180px] font-mono-custom text-[10px] uppercase leading-relaxed tracking-[.1em] text-[#15120f]/55">Cerita baru, perspektif lama yang dibaca dengan cara berbeda.</span></div>
        <div className="grid gap-6 md:grid-cols-3">{stories.map((story) => <StoryCard key={story.id} story={story} onOpen={setActiveStory} />)}</div>
      </div>
    </section>

    <section id="people" className="bg-[#193c3b] px-5 py-20 text-[#f5f0e7] md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 md:grid-cols-[.7fr_1.3fr]"><div><span className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#ff5600]">04 / Orang-orangnya</span><h2 className="mt-5 max-w-xs font-display text-5xl font-semibold leading-[.9] tracking-[-.06em] md:text-7xl">Bukan cuma nama di bio<span className="text-[#ff5600]">.</span></h2></div><p className="max-w-md self-end text-base leading-relaxed text-[#f5f0e7]/65">Di balik setiap karya, ada kepala, tangan, dan kegelisahan. Kenalan dengan beberapa orang yang sedang menggeser percakapan.</p></div>
        <div className="mt-16 grid border-t border-[#f5f0e7]/30 md:grid-cols-3">{creators.map((creator, index) => <button key={creator.name} className="group border-b border-[#f5f0e7]/30 py-7 text-left transition-colors hover:bg-[#ff5600] hover:text-[#15120f] md:border-r md:px-6 md:first:pl-0 md:last:border-r-0" data-testid={`card-creator-${index}`}><div className="flex items-start justify-between"><span className="flex h-14 w-14 items-center justify-center rounded-full border border-current font-display text-xl">{creator.mark}</span><span className="font-mono-custom text-[10px] opacity-60">0{index + 1}</span></div><h3 className="mt-12 font-display text-3xl font-semibold">{creator.name}</h3><p className="mt-1 font-mono-custom text-[10px] uppercase tracking-[.1em] opacity-55">{creator.role}</p><p className="mt-7 max-w-[270px] text-lg leading-snug opacity-75">{creator.quote}</p><span className="mt-8 flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[.12em] opacity-70">Baca profil <ArrowUpRight size={14} /></span></button>)}</div>
      </div>
    </section>

    <section className="grid bg-[#15120f] text-[#f5f0e7] md:grid-cols-[1.1fr_.9fr]">
      <div className="dot-grid min-h-[360px] border-b border-[#f5f0e7]/15 p-5 md:border-b-0 md:border-r md:p-10"><div className="flex h-full min-h-[320px] flex-col justify-between border border-[#ff5600] p-5 md:p-8"><span className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#ff5600]">05 / Surat dari jalan</span><p className="max-w-lg font-display text-[clamp(2.4rem,5vw,5.5rem)] font-semibold leading-[.88] tracking-[-.06em]">“Punya cerita yang harus dipajang?”</p><button onClick={() => scroll('#contact')} className="flex items-center gap-3 self-start border-b border-[#ff5600] pb-2 font-mono-custom text-[10px] uppercase tracking-[.15em] text-[#ff5600]" data-testid="button-send-story">Kirim ke meja redaksi <ArrowUpRight size={15} /></button></div></div>
      <div className="image-reveal aspect-[1.3/1] overflow-hidden md:aspect-auto"><img src="/coastline.jpg" alt="Pemandangan pesisir saat fajar" className="h-full w-full object-cover opacity-90" /></div>
    </section>

    <section id="studio" className="bg-[#ff5600] px-5 py-20 text-[#15120f] md:px-10 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 md:grid-cols-[.8fr_1.2fr]"><div><span className="font-mono-custom text-[10px] uppercase tracking-[.2em]">06 / Majang Mejeng Studio</span><div className="mt-5 h-1 w-14 bg-[#15120f]" /></div><div><h2 className="max-w-4xl font-display text-[clamp(3rem,7vw,8rem)] font-semibold leading-[.84] tracking-[-.075em]">Bikin sesuatu yang ingin dilihat orang.</h2><p className="mt-9 max-w-lg text-lg leading-relaxed text-[#15120f]/70">Dari campaign yang punya denyut sampai format konten yang terasa seperti percakapan, kami bantu brand dan komunitas menemukan cara tampil yang jujur.</p></div></div>
        <div className="mt-16 grid gap-0 border-y border-[#15120f] md:grid-cols-4">{['Editorial campaign', 'Social storytelling', 'Visual direction', 'Event & experience'].map((item, i) => <div key={item} className="group flex items-center justify-between border-b border-[#15120f] py-5 md:border-b-0 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0"><span className="font-display text-xl font-semibold">{item}</span><span className="font-mono-custom text-[10px] opacity-50">0{i + 1}</span></div>)}</div>
        <button onClick={() => scroll('#contact')} className="mt-10 flex items-center gap-3 bg-[#15120f] px-5 py-4 font-mono-custom text-[11px] uppercase tracking-[.14em] text-[#f5f0e7] transition-transform hover:-translate-y-1" data-testid="button-studio-contact">Bawa ide kamu ke sini <ArrowUpRight size={17} /></button>
      </div>
    </section>

    <section className="bg-[#f5f0e7] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-end justify-between border-b border-[#15120f] pb-5"><div><span className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#ff5600]">07 / Dari @majangmejeng_</span><h2 className="mt-4 font-display text-5xl font-semibold tracking-[-.06em] md:text-7xl">Temui kami di <span className="text-[#ff5600]">sana.</span></h2></div><a href="https://www.instagram.com/majangmejeng_/" target="_blank" rel="noreferrer" className="hidden items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[.13em] hover:text-[#ff5600] sm:flex" data-testid="link-instagram-desktop">Instagram <ArrowUpRight size={15} /></a></div>
        <div className="mt-7 grid grid-cols-2 gap-2 md:grid-cols-4">{['/editorial-portrait.jpg', '/studio-table.jpg', '/coastline.jpg', '/editorial-portrait.jpg'].map((src, i) => <a href="https://www.instagram.com/majangmejeng_/" target="_blank" rel="noreferrer" key={`${src}-${i}`} className={`image-reveal group relative overflow-hidden border border-[#15120f] ${i === 1 ? 'md:mt-12' : i === 3 ? 'md:-mt-10' : ''}`} data-testid={`link-instagram-tile-${i}`}><img src={src} alt="Cuplikan Instagram Majang Mejeng" className="aspect-square h-full w-full object-cover" /><span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#ff5600] text-[#15120f] opacity-0 transition-opacity group-hover:opacity-100"><Instagram size={15} /></span></a>)}</div>
        <a href="https://www.instagram.com/majangmejeng_/" target="_blank" rel="noreferrer" className="mt-6 flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[.13em] hover:text-[#ff5600] sm:hidden" data-testid="link-instagram-mobile"><Instagram size={15} /> @majangmejeng_ <ArrowUpRight size={15} /></a>
      </div>
    </section>

    <section id="contact" className="bg-[#15120f] px-5 py-20 text-[#f5f0e7] md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-14 md:grid-cols-[1.1fr_.9fr]">
        <div><span className="font-mono-custom text-[10px] uppercase tracking-[.2em] text-[#ff5600]">08 / Mari bicara</span><h2 className="mt-6 max-w-3xl font-display text-[clamp(3.4rem,8vw,8.5rem)] font-semibold leading-[.82] tracking-[-.08em]">Punya ide?<br /><span className="text-[#ff5600]">Pajang</span> di sini.</h2></div>
        <div className="self-end"><p className="max-w-md text-lg leading-relaxed text-[#f5f0e7]/65">Kolaborasi, kirim cerita, atau sekadar say hi. Meja kami selalu punya satu kursi kosong.</p><form onSubmit={submitEmail} className="mt-10 flex border-b border-[#f5f0e7]/60 pb-3"><input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email kamu" className="min-w-0 flex-1 bg-transparent font-display text-xl outline-none placeholder:text-[#f5f0e7]/35" data-testid="input-contact-email" /><button type="submit" className="flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[.14em] text-[#ff5600] hover:text-[#f5f0e7]" data-testid="button-contact-submit">{sent ? 'Terkirim' : 'Kirim'} <ArrowUpRight size={15} /></button></form><p className="mt-3 font-mono-custom text-[9px] uppercase tracking-[.1em] text-[#f5f0e7]/35">Kami akan membalas secepatnya · demo contact form</p></div>
      </div>
    </section>

    <footer className="bg-[#15120f] px-5 pb-7 text-[#f5f0e7] md:px-10">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 border-t border-[#f5f0e7]/20 pt-7 md:flex-row md:items-end"><div><img src={logo} alt="Majang Mejeng" className="h-16 w-16 object-cover" /><p className="mt-4 max-w-[220px] font-mono-custom text-[9px] uppercase leading-relaxed tracking-[.12em] text-[#f5f0e7]/45">Media & creative platform<br />Jakarta · Indonesia</p></div><div className="flex flex-wrap gap-x-6 gap-y-3 font-mono-custom text-[10px] uppercase tracking-[.12em] text-[#f5f0e7]/55"><button onClick={() => scroll('#top')} className="hover:text-[#ff5600]" data-testid="button-footer-top">Kembali ke atas</button><a href="https://www.instagram.com/majangmejeng_/" target="_blank" rel="noreferrer" className="hover:text-[#ff5600]" data-testid="link-footer-instagram">Instagram</a><span>© {new Date().getFullYear()} Majang Mejeng</span></div></div>
    </footer>

    {activeStory && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#15120f]/90 p-5" role="dialog" aria-modal="true"><div className="relative max-h-[90vh] w-full max-w-3xl overflow-auto bg-[#f5f0e7] text-[#15120f]"><button onClick={() => setActiveStory(null)} className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center bg-[#ff5600]" data-testid="button-close-story" aria-label="Tutup cerita"><X size={18} /></button><div className="grid md:grid-cols-2"><img src={activeStory.image} alt={activeStory.title} className="aspect-square h-full w-full object-cover" /><div className="p-7 md:p-10"><span className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-[#ff5600]">{activeStory.category} / Cerita demo</span><h2 className="mt-5 font-display text-4xl font-semibold leading-[.92] tracking-[-.06em]">{activeStory.title}</h2><p className="mt-7 text-base leading-relaxed text-[#15120f]/65">{activeStory.dek}</p><div className="mt-10 border-t border-[#15120f] pt-4 font-mono-custom text-[10px] uppercase leading-relaxed tracking-[.1em] text-[#15120f]/55">Sample editorial content — ditampilkan untuk demo pengalaman Majang Mejeng.</div></div></div></div></div>}
  </main>;
}

export default App;