/* Prestige Properties — Shared Components & Lib Init */

(function () {
  const { useState, useEffect, useRef } = React;

  /* ---- Icons ---- */
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
    Menu: (p) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    ),
  };
  window.Icon = Icon;

  /* ---- TiltCard ---- */
  function TiltCard({ children, className = "", max = 10, ...rest }) {
    const ref = useRef(null);
    const onMove = (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const ry = (x - 0.5) * 2 * max;
      const rx = -(y - 0.5) * 2 * max;
      const sx = (x - 0.5) * 24;
      const sy = (y - 0.5) * 24;
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
  window.TiltCard = TiltCard;

  /* ---- SiteNav (fixed, for interior pages) ---- */
  function SiteNav() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const path = window.location.pathname;

    useEffect(() => {
      const h = () => setScrolled(window.scrollY > 30);
      window.addEventListener("scroll", h, { passive: true });
      return () => window.removeEventListener("scroll", h);
    }, []);

    const isActive = (name) => path.includes(name);

    return (
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <a className="nav-logo site-nav-logo" href="index.html">
          <span className="dot"></span> Prestige Properties
        </a>
        <div className={`site-nav-links${open ? " mobile-open" : ""}`}>
          <a href="properties.html" className={isActive("properties") ? "active" : ""}>Properties</a>
          <a href="about.html" className={isActive("about") ? "active" : ""}>About</a>
          <a href="contact.html" className={isActive("contact") ? "active" : ""}>Contact</a>
        </div>
        <div className="site-nav-right">
          <a href="contact.html" className="pill pill-green">Book a Viewing <Icon.Arrow /></a>
          <button className="nav-menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <Icon.X /> : <Icon.Menu />}
          </button>
        </div>
      </header>
    );
  }
  window.SiteNav = SiteNav;

  /* ---- Footer ---- */
  function SiteFooter() {
    return (
      <footer className="footer">
        <div className="foot-grid">
          <div data-aos="fade-up" data-aos-delay="0">
            <div className="foot-logo"><span className="dot"></span> Prestige Properties</div>
            <p className="foot-tag">A boutique Dublin estate agency. Discreet representation, off-market access, and a process built around the lives our clients actually lead.</p>
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <h4 className="foot-h">Quick Links</h4>
            <ul className="foot-list">
              <li><a href="properties.html">Properties</a></li>
              <li><a href="about.html">About Sophia</a></li>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="contact.html">Request a Valuation</a></li>
            </ul>
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <h4 className="foot-h">Contact</h4>
            <ul className="foot-list">
              <li><a href="tel:+35316770000">+353 1 677 0000</a></li>
              <li><a href="mailto:sophia@prestigeproperties.ie">sophia@prestigeproperties.ie</a></li>
              <li>12 Merrion Square North<br />Dublin 2, D02 KH53</li>
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
  window.SiteFooter = SiteFooter;

  /* ---- ChatWidget ---- */
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
              {typing && <div className="typing"><span></span><span></span><span></span></div>}
            </div>
            <div className="chat-foot">
              <button className="quick-reply" onClick={() => reply("Send me the Ballsbridge details, please.")}>Yes, send details</button>
              <button className="quick-reply" onClick={() => reply("Can we schedule a call this week?")}>Schedule a call</button>
              <button className="quick-reply" onClick={() => reply("Anything around €800K?")}>Lower budget?</button>
            </div>
          </div>
        )}
        <button className={`chat-toggle${open ? "" : " closed"}`} onClick={() => setOpen((o) => !o)} aria-label="Open chat">
          {open ? <Icon.X /> : <Icon.Chat />}
        </button>
        <a className="wa" href="https://wa.me/353877770000" aria-label="WhatsApp"><Icon.Whatsapp /></a>
      </>
    );
  }
  window.ChatWidget = ChatWidget;

  /* ---- Listing Card ---- */
  function ListingCard({ l }) {
    return (
      <article className="flip gs-item" tabIndex={0}>
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
              <a href="contact.html" className="pill pill-green">Book a Viewing <Icon.Arrow /></a>
              <a href="https://wa.me/353877770000" className="pill pill-wa"><Icon.Whatsapp style={{ width: 14, height: 14 }} /> WhatsApp</a>
            </div>
          </div>
        </div>
      </article>
    );
  }
  window.ListingCard = ListingCard;

  /* ---- Stats Strip (anime.js counter) ---- */
  function StatsStrip() {
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
            <StatCounter key={i} run={run} target={s.value} suffix={s.suffix} label={s.label} delay={i * 150} aosDelay={i * 100} />
          ))}
        </div>
      </div>
    );
  }
  window.StatsStrip = StatsStrip;

  function StatCounter({ run, target, suffix, label, delay, aosDelay }) {
    const [n, setN] = useState(0);
    useEffect(() => {
      if (!run) return;
      if (window.anime) {
        const obj = { val: 0 };
        anime({
          targets: obj,
          val: target,
          duration: 1600,
          delay,
          easing: "easeOutExpo",
          update() { setN(Math.round(obj.val)); },
        });
      } else {
        let raf, start;
        const dur = 1400;
        const t0 = performance.now() + delay;
        const tick = (now) => {
          if (now < t0) { raf = requestAnimationFrame(tick); return; }
          if (!start) start = now;
          const p = Math.min(1, (now - start) / dur);
          setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
      }
    }, [run, target, delay]);

    return (
      <div className="stat-item" data-aos="fade-up" data-aos-delay={aosDelay}>
        <div className="num">{n}{suffix}</div>
        <div className="lbl">{label}</div>
      </div>
    );
  }

  /* ---- Testimonials Swiper ---- */
  function TestimonialsSwiper() {
    const swiperEl = useRef(null);
    useEffect(() => {
      if (!window.Swiper || !swiperEl.current) return;
      new window.Swiper(swiperEl.current, {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        speed: 700,
        breakpoints: {
          768: { slidesPerView: 2 },
          1100: { slidesPerView: 3 },
        },
        pagination: { el: swiperEl.current.querySelector(".swiper-pagination"), clickable: true },
      });
    }, []);

    return (
      <div className="swiper" ref={swiperEl}>
        <div className="swiper-wrapper">
          {window.TESTIMONIALS.map((t, i) => {
            const initials = t.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
            return (
              <div className="swiper-slide" key={i}>
                <article className="tcard">
                  <div className="stars">{"★".repeat(t.rating)}</div>
                  <q>"{t.quote}"</q>
                  <div className="who-row">
                    <div className="avatar">{initials}</div>
                    <div className="who">{t.name}<small>{t.detail}</small></div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    );
  }
  window.TestimonialsSwiper = TestimonialsSwiper;

  /* ---- Marquee ---- */
  function Marquee() {
    const items = window.MARQUEE_ITEMS;
    const row = (
      <span>
        {items.map((t, i) => (
          <React.Fragment key={i}>
            {t}<span className="sep" aria-hidden="true"></span>
          </React.Fragment>
        ))}
      </span>
    );
    return (
      <div className="marquee">
        <div className="marquee-track">{row}{row}{row}{row}</div>
      </div>
    );
  }
  window.Marquee = Marquee;

  /* ---- Page Banner (interior pages) ---- */
  function PageBanner({ image, eyebrow, title, subtitle, small }) {
    useEffect(() => {
      if (!window.anime) return;
      anime({
        targets: ".page-banner-content > *",
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 900,
        delay: anime.stagger(120, { start: 250 }),
        easing: "easeOutCubic",
      });
    }, []);

    return (
      <div className={`page-banner${small ? " page-banner-sm" : ""}`}>
        <div className="page-banner-photo" style={{ backgroundImage: `url('${image}')` }}></div>
        <div className="page-banner-overlay"></div>
        <div className="page-banner-content">
          <div className="eyebrow pb-eyebrow">{eyebrow}</div>
          <h1 className="display page-banner-title" dangerouslySetInnerHTML={{ __html: title }}></h1>
          {subtitle && <p className="page-banner-sub">{subtitle}</p>}
        </div>
      </div>
    );
  }
  window.PageBanner = PageBanner;

  /* ---- GSAP + Lenis + AOS init ---- */
  window.initLibs = function () {
    /* Lenis smooth scroll wired into GSAP ticker */
    if (window.gsap && window.ScrollTrigger && window.Lenis) {
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      /* Fade-up reveals */
      gsap.utils.toArray(".gs-reveal").forEach((el) => {
        gsap.fromTo(el,
          { autoAlpha: 0, y: 55 },
          { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } }
        );
      });

      /* Stagger card grids */
      gsap.utils.toArray(".gs-stagger").forEach((container) => {
        const items = container.querySelectorAll(".gs-item");
        if (!items.length) return;
        gsap.fromTo(items,
          { autoAlpha: 0, y: 70, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.85, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: container, start: "top 82%" } }
        );
      });

      /* Slide from left */
      gsap.utils.toArray(".gs-from-left").forEach((el) => {
        gsap.fromTo(el,
          { autoAlpha: 0, x: -70 },
          { autoAlpha: 1, x: 0, duration: 1.1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%" } }
        );
      });

      /* Slide from right */
      gsap.utils.toArray(".gs-from-right").forEach((el) => {
        gsap.fromTo(el,
          { autoAlpha: 0, x: 70 },
          { autoAlpha: 1, x: 0, duration: 1.1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%" } }
        );
      });
    }

    /* AOS for smaller inline elements */
    if (window.AOS) {
      AOS.init({ duration: 850, easing: "ease-out-cubic", once: true, offset: 60 });
    }

    /* Anime.js — pill button ripple */
    if (window.anime) {
      document.querySelectorAll(".pill-green, .pill-white").forEach((btn) => {
        btn.addEventListener("click", function (e) {
          const ripple = document.createElement("span");
          ripple.className = "pill-ripple";
          const rect = this.getBoundingClientRect();
          ripple.style.cssText = `left:${e.clientX - rect.left}px;top:${e.clientY - rect.top}px`;
          this.appendChild(ripple);
          anime({
            targets: ripple,
            scale: [0, 5],
            opacity: [0.35, 0],
            duration: 650,
            easing: "easeOutExpo",
            complete: () => ripple.remove(),
          });
        });
      });
    }
  };

  /* ---- Three.js hero particles ---- */
  window.initHeroCanvas = function () {
    const canvas = document.getElementById("hero-canvas");
    if (!canvas || !window.THREE) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    const scene = new THREE.Scene();
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.z = 6;
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const N = 750;
    const positions = new Float32Array(N * 3);
    const speeds = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      speeds[i] = 0.003 + Math.random() * 0.005;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05, transparent: true, opacity: 0.2, sizeAttenuation: true });
    const pts = new THREE.Points(geo, mat);
    scene.add(pts);

    const tick = () => {
      requestAnimationFrame(tick);
      const arr = geo.attributes.position.array;
      for (let i = 0; i < N; i++) {
        arr[i * 3 + 1] += speeds[i];
        if (arr[i * 3 + 1] > 9) arr[i * 3 + 1] = -9;
      }
      geo.attributes.position.needsUpdate = true;
      pts.rotation.y += 0.0003;
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      if (!W || !H) return;
      renderer.setSize(W, H);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);
  };

})();
