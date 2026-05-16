/* Prestige Properties — App */

const { useState, useEffect, useRef } = React;

/* ---- Icons (inline SVG, minimal) ---- */
const Icon = {
  Arrow: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  ),
  Home: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12L12 4l9 8"/><path d="M5 10v10h14V10"/></svg>
  ),
  Bed: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 18V8h7a4 4 0 014 4v0h7v6"/><path d="M3 18h18"/></svg>
  ),
  Bath: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 12h16v3a4 4 0 01-4 4H8a4 4 0 01-4-4v-3z"/><path d="M6 12V6a2 2 0 014 0"/><path d="M5 19l-1 2M19 19l1 2"/></svg>
  ),
  Area: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="4" y="4" width="16" height="16" rx="1"/><path d="M4 9h16M9 4v16"/></svg>
  ),
  Chat: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
  ),
  X: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  Whatsapp: (p) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.86 9.86 0 004.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.825 9.825 0 0012.04 2zm0 18.13h-.01c-1.49 0-2.95-.4-4.22-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.14 8.14 0 01-1.24-4.33c0-4.5 3.67-8.17 8.18-8.17 2.18 0 4.23.85 5.77 2.39a8.13 8.13 0 012.39 5.78c-.01 4.51-3.68 8.18-8.18 8.18zm4.48-6.13c-.25-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.16.25-.63.8-.78.96-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.24-.41.08-.16.04-.31-.02-.43-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.42-.14 0-.31-.02-.47-.02-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.06 0 1.21.88 2.39 1 2.55.12.16 1.74 2.66 4.22 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.45-.59 1.66-1.17.2-.57.2-1.06.14-1.17-.05-.1-.21-.16-.46-.28z"/></svg>
  ),
  Send: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
  ),
};

/* ---- Tilted card (mouse-tracked 3D tilt) ---- */
function TiltCard({ children, className = "", max = 10, ...rest }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const ry = (x - 0.5) * 2 * max;       // rotateY
    const rx = -(y - 0.5) * 2 * max;      // rotateX (invert)
    const sx = (x - 0.5) * 24;            // shadow x
    const sy = (y - 0.5) * 24;            // shadow y
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    el.style.boxShadow = `${-sx}px ${14 - sy}px 36px -10px rgba(20,40,28,0.28)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
    el.style.boxShadow = "";
  };
  return (
    <div ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave} {...rest}>
      {children}
    </div>
  );
}

/* ---- Hero ---- */
function Hero() {
  return (
    <div className="hero-wrap">
      <div className="hero">
        <div className="hero-photo"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <nav className="nav fade-up">
            <a className="nav-logo" href="#">
              <span className="dot"></span>
              Prestige Properties
            </a>
            <div className="nav-links">
              <a href="#listings">Properties</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="nav-right">
              <a href="#contact" className="pill pill-green">Book a Viewing <Icon.Arrow /></a>
            </div>
          </nav>

          <div className="hero-headline">
            <span className="glass-badge fade-up d-2"><span className="dot"></span> Premium Dublin Estate Agency</span>
            <h1 className="display hero-h1 fade-up d-3">
              Discover the home<br/>
              <span className="outline">you truly</span> belong in
            </h1>
            <p className="hero-sub fade-up d-4">
              Hand-selected residences across Dublin's most sought-after addresses. Discreet representation, off-market access, and a process built around the lives our clients actually lead.
            </p>
            <a href="#listings" className="pill pill-green fade-up d-5">Browse Listings <Icon.Arrow /></a>
          </div>
        </div>

        <TiltCard className="bl-card fade-left d-3" max={10}>
          <div className="bl-inner">
            <div>
              <div className="num">340+</div>
              <div className="lbl-wrap"><div className="lbl">Homes Sold</div></div>
            </div>
            <a href="#contact" className="pill pill-white">Book a Viewing <Icon.Arrow /></a>
          </div>
        </TiltCard>

        <BottomRightCorner />
      </div>
    </div>
  );
}

function BottomRightCorner() {
  return (
    <div className="br-cutout fade-right d-3">
      <svg className="mask-top" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M56 56V0C56 30.9279 30.9279 56 0 56H56Z" fill="#f0f0f0"/>
      </svg>
      <svg className="mask-left" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M56 56H0C30.9279 56 56 30.9279 56 0V56Z" fill="#f0f0f0"/>
      </svg>
      <div className="ic"><Icon.Home /></div>
      <div className="name">
        Sophia Kavanagh
        <small>Lead Agent · Dublin</small>
      </div>
      <a href="#listings" className="view-all">View All Listings <Icon.Arrow /></a>
    </div>
  );
}

/* ---- Marquee ---- */
function Marquee() {
  const items = window.MARQUEE_ITEMS;
  const row = (
    <span>
      {items.map((t, i) => (
        <React.Fragment key={i}>
          {t}
          <span className="sep" aria-hidden="true"></span>
        </React.Fragment>
      ))}
    </span>
  );
  return (
    <div className="marquee">
      <div className="marquee-track">
        {row}{row}{row}{row}
      </div>
    </div>
  );
}

/* ---- Listings ---- */
function Listings() {
  const [filter, setFilter] = useState("All");
  const all = window.LISTINGS;
  const shown = filter === "All" ? all : all.filter((l) => l.status === filter);

  return (
    <section className="section" id="listings">
      <header className="sec-header">
        <div>
          <div className="eyebrow">Featured Listings</div>
          <h2 className="display sec-title">A curated portfolio of Dublin homes</h2>
        </div>
        <div className="filters" role="tablist">
          {["All", "For Sale", "For Rent"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={filter === f ? "on" : ""}>{f}</button>
          ))}
        </div>
      </header>

      <div className="grid">
        {shown.map((l) => (
          <article className="flip" key={l.id} tabIndex={0}>
            <div className="flip-inner">
              <div className="flip-face front">
                <div className="card-photo" style={{ backgroundImage: `url("${l.image}")` }}>
                  <span className="card-badge">{l.status}</span>
                </div>
                <div className="card-body">
                  <div className="card-price">{l.price}</div>
                  <p className="card-addr">{l.address}</p>
                  <div className="card-stats">
                    <span><Icon.Bed /> {l.beds} beds</span>
                    <span><Icon.Bath /> {l.baths} baths</span>
                    <span><Icon.Area /> {l.sqm} m²</span>
                  </div>
                  <div className="tags">
                    {l.tags.slice(0, 3).map((t) => <span className="tag" key={t}>{t}</span>)}
                  </div>
                </div>
              </div>

              <div className="flip-face back">
                <div className="back-agent">{l.status} · {l.agent}</div>
                <h3 className="back-title">{l.title}</h3>
                <p className="back-desc">{l.description}</p>
                <div className="back-stats">
                  <span><Icon.Bed /> {l.beds} beds</span>
                  <span><Icon.Bath /> {l.baths} baths</span>
                  <span><Icon.Area /> {l.sqm} m²</span>
                </div>
                <div className="back-ctas">
                  <a href="#contact" className="pill pill-green">Book a Viewing <Icon.Arrow /></a>
                  <a href="https://wa.me/353877770000" className="pill pill-wa"><Icon.Whatsapp style={{ width: 14, height: 14 }} /> WhatsApp</a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---- Stats with count-up ---- */
function Stats() {
  const ref = useRef(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setRun(true); obs.disconnect(); } }),
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="stats-strip" ref={ref}>
      <div className="stats-grid">
        {window.STATS.map((s, i) => (
          <Counter key={i} run={run} target={s.value} suffix={s.suffix} label={s.label} delay={i * 120} />
        ))}
      </div>
    </div>
  );
}
function Counter({ run, target, suffix, label, delay }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf, start;
    const dur = 1400;
    const t0 = performance.now() + delay;
    const tick = (now) => {
      if (now < t0) { raf = requestAnimationFrame(tick); return; }
      if (!start) start = now;
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, delay]);
  return (
    <div className="stat-item">
      <div className="num">{n}{suffix}</div>
      <div className="lbl">{label}</div>
    </div>
  );
}

/* ---- About ---- */
function About() {
  return (
    <section className="section" id="about">
      <div className="about">
        <div className="about-photo">
          <div className="stamp">Sophia Kavanagh<small>Principal Agent, Dublin 4</small></div>
        </div>
        <div className="about-body">
          <div className="eyebrow">About Sophia</div>
          <h2 className="display sec-title" style={{ marginBottom: 24 }}>Fourteen years inside Dublin's most discreet market</h2>
          <p className="lede">I grew up between Ranelagh and Sandymount, studied architecture at UCD, and have spent the last decade helping families, founders, and returning Dubliners find the right address — quietly, and on their own terms.</p>
          <p>My clients come back because the process is calm: clear pricing, photography that flatters but never lies, viewings tailored to your schedule, and negotiations handled with a steady hand. Most of my listings never make it to the public portals.</p>
          <div className="about-actions">
            <a href="tel:+35316770000" className="pill pill-green">Call +353 1 677 0000 <Icon.Arrow /></a>
            <a href="https://wa.me/353877770000" className="pill pill-ghost"><Icon.Whatsapp style={{ width: 16, height: 16 }} /> WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Testimonials ---- */
function Testimonials() {
  return (
    <section className="section">
      <header className="sec-header">
        <div>
          <div className="eyebrow">Client Voices</div>
          <h2 className="display sec-title">What buyers and sellers say</h2>
        </div>
      </header>
      <div className="tgrid">
        {window.TESTIMONIALS.map((t, i) => {
          const initials = t.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
          return (
            <article className="tcard" key={i}>
              <div className="stars">{"★".repeat(t.rating)}</div>
              <q>"{t.quote}"</q>
              <div className="who-row">
                <div className="avatar">{initials}</div>
                <div className="who">{t.name}<small>{t.detail}</small></div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ---- Contact ---- */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section className="section" id="contact">
      <header className="sec-header">
        <div>
          <div className="eyebrow">Get In Touch</div>
          <h2 className="display sec-title">Let's find your next address</h2>
        </div>
        <p className="sec-desc">Reach out for a private valuation, an off-market introduction, or simply a conversation about what you're hoping to find.</p>
      </header>
      <div className="contact-grid">
        <div className="cinfo">
          <div className="row">
            <span className="k">Phone</span>
            <span className="v">+353 1 677 0000</span>
          </div>
          <div className="row">
            <span className="k">Email</span>
            <span className="v">sophia@prestigeproperties.ie</span>
          </div>
          <div className="row">
            <span className="k">Office</span>
            <span className="v">12 Merrion Square North<br/>Dublin 2, D02 KH53</span>
          </div>
          <div className="row">
            <span className="k">Hours</span>
            <span className="v">Mon–Fri 9–7 · Sat 10–4</span>
          </div>
          <a href="https://wa.me/353877770000" className="pill pill-green" style={{ alignSelf: "flex-start" }}>
            <Icon.Whatsapp style={{ width: 16, height: 16 }} /> Message on WhatsApp
          </a>
        </div>

        <div className="form">
          {sent ? (
            <div className="thanks">
              <div className="eyebrow" style={{ color: "var(--green)" }}>Message Received</div>
              <div className="display">Thank you</div>
              <p style={{ color: "var(--ink-2)", maxWidth: "36ch", margin: "0 auto" }}>
                Sophia will be in touch within one working day. For anything urgent, please call or WhatsApp directly.
              </p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="form-grid">
                <label>Name<input required type="text" placeholder="Your full name" /></label>
                <label>Email<input required type="email" placeholder="you@example.com" /></label>
                <label>Phone<input type="tel" placeholder="+353 …" /></label>
                <label>Interest
                  <select defaultValue="">
                    <option value="" disabled>Select…</option>
                    <option>Buying</option>
                    <option>Selling</option>
                    <option>Renting</option>
                    <option>Valuation</option>
                    <option>Other</option>
                  </select>
                </label>
                <label className="full">Message<textarea placeholder="Tell Sophia what you're looking for…"></textarea></label>
              </div>
              <div className="form-foot">
                <p>We respond within one working day. Your details stay private.</p>
                <button type="submit" className="pill pill-green">Send Enquiry <Icon.Arrow /></button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---- Chat widget ---- */
function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState(window.CHAT_SCRIPT.slice(0, 1));

  useEffect(() => {
    if (!open) return;
    if (messages.length >= window.CHAT_SCRIPT.length) return;
    setTyping(true);
    const t = setTimeout(() => {
      setMessages((m) => [...m, window.CHAT_SCRIPT[m.length]]);
      setTyping(false);
    }, 1400);
    return () => clearTimeout(t);
  }, [open, messages.length]);

  const reply = (text) => setMessages((m) => [...m, { from: "user", text }]);

  return (
    <>
      {open && (
        <div className="chat-panel">
          <div className="chat-head">
            <div className="av">SK</div>
            <div className="nm">Sophia Kavanagh<small>Replies in minutes · WhatsApp</small></div>
            <button onClick={() => setOpen(false)} style={{ marginLeft: "auto" }} aria-label="Close"><Icon.X /></button>
          </div>
          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`bubble ${m.from}`}>{m.text}</div>
            ))}
            {typing && (
              <div className="typing"><span></span><span></span><span></span></div>
            )}
          </div>
          <div className="chat-foot">
            <button className="quick-reply" onClick={() => reply("Send me the Ballsbridge details, please.")}>Yes, send details</button>
            <button className="quick-reply" onClick={() => reply("Can we schedule a call this week?")}>Schedule a call</button>
            <button className="quick-reply" onClick={() => reply("Anything around €800K?")}>Lower budget?</button>
          </div>
        </div>
      )}
      <button
        className={`chat-toggle ${open ? "" : "closed"}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat"
      >
        {open ? <Icon.X /> : <Icon.Chat />}
      </button>
      <a className="wa" href="https://wa.me/353877770000" aria-label="WhatsApp"><Icon.Whatsapp /></a>
    </>
  );
}

/* ---- Footer ---- */
function Footer() {
  return (
    <footer className="footer">
      <div className="foot-grid">
        <div>
          <div className="foot-logo"><span className="dot"></span> Prestige Properties</div>
          <p className="foot-tag">A boutique Dublin estate agency. Discreet representation, off-market access, and a process built around the lives our clients actually lead.</p>
        </div>
        <div>
          <h4 className="foot-h">Quick Links</h4>
          <ul className="foot-list">
            <li><a href="#listings">Properties</a></li>
            <li><a href="#about">About Sophia</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#contact">Request a Valuation</a></li>
          </ul>
        </div>
        <div>
          <h4 className="foot-h">Contact</h4>
          <ul className="foot-list">
            <li><a href="tel:+35316770000">+353 1 677 0000</a></li>
            <li><a href="mailto:sophia@prestigeproperties.ie">sophia@prestigeproperties.ie</a></li>
            <li>12 Merrion Square North<br/>Dublin 2, D02 KH53</li>
          </ul>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 Prestige Properties · Licensed PSRA 004781</span>
        <span className="built">Built by Limen Studio.</span>
      </div>
    </footer>
  );
}

/* ---- App ---- */
function App() {
  return (
    <>
      <Hero />
      <Marquee />
      <Listings />
      <Stats />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
      <ChatWidget />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
