/* Prestige Properties — Home Page */

(function () {
  const { useEffect } = React;

  function BottomRightCorner() {
    return (
      <div className="br-cutout fade-right d-3">
        <svg className="mask-top" width="56" height="56" viewBox="0 0 56 56" fill="none"><path d="M56 56V0C56 30.9279 30.9279 56 0 56H56Z" fill="#f0f0f0"/></svg>
        <svg className="mask-left" width="56" height="56" viewBox="0 0 56 56" fill="none"><path d="M56 56H0C30.9279 56 56 30.9279 56 0V56Z" fill="#f0f0f0"/></svg>
        <div className="ic"><Icon.Home /></div>
        <div className="name">Sophia Kavanagh<small>Lead Agent · Dublin</small></div>
        <a href="properties.html" className="view-all">View All Listings <Icon.Arrow /></a>
      </div>
    );
  }

  function Hero() {
    useEffect(() => {
      window.initHeroCanvas && window.initHeroCanvas();
    }, []);

    return (
      <div className="hero-wrap">
        <div className="hero">
          <div className="hero-photo"></div>
          <canvas id="hero-canvas" className="hero-canvas"></canvas>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <nav className="nav fade-up">
              <a className="nav-logo" href="index.html">
                <span className="dot"></span> Prestige Properties
              </a>
              <div className="nav-links">
                <a href="properties.html">Properties</a>
                <a href="about.html">About</a>
                <a href="contact.html">Contact</a>
              </div>
              <div className="nav-right">
                <a href="contact.html" className="pill pill-green">Book a Viewing <Icon.Arrow /></a>
              </div>
            </nav>

            <div className="hero-headline">
              <span className="glass-badge fade-up d-2"><span className="dot"></span> Premium Dublin Estate Agency</span>
              <h1 className="display hero-h1 fade-up d-3">
                Discover the home<br />
                <span className="outline">you truly</span> belong in
              </h1>
              <p className="hero-sub fade-up d-4">
                Hand-selected residences across Dublin's most sought-after addresses. Discreet representation, off-market access, and a process built around the lives our clients actually lead.
              </p>
              <a href="properties.html" className="pill pill-green fade-up d-5">Browse Listings <Icon.Arrow /></a>
            </div>
          </div>

          <TiltCard className="bl-card fade-left d-3" max={10}>
            <div className="bl-inner">
              <div>
                <div className="num">340+</div>
                <div className="lbl-wrap"><div className="lbl">Homes Sold</div></div>
              </div>
              <a href="contact.html" className="pill pill-white">Book a Viewing <Icon.Arrow /></a>
            </div>
          </TiltCard>

          <BottomRightCorner />
        </div>
      </div>
    );
  }

  function FeaturedListings() {
    const featured = window.LISTINGS.slice(0, 3);
    return (
      <section className="section">
        <header className="sec-header gs-reveal">
          <div>
            <div className="eyebrow">Featured Properties</div>
            <h2 className="display sec-title">Handpicked Dublin residences</h2>
          </div>
          <a href="properties.html" className="pill pill-ghost">View All <Icon.Arrow /></a>
        </header>
        <div className="grid gs-stagger">
          {featured.map((l) => <ListingCard key={l.id} l={l} />)}
        </div>
      </section>
    );
  }

  function App() {
    useEffect(() => {
      window.initLibs && window.initLibs();
    }, []);

    return (
      <>
        <Hero />
        <Marquee />
        <FeaturedListings />
        <StatsStrip />
        <section className="section">
          <header className="sec-header gs-reveal">
            <div>
              <div className="eyebrow">Client Voices</div>
              <h2 className="display sec-title">What buyers &amp; sellers say</h2>
            </div>
          </header>
          <TestimonialsSwiper />
        </section>
        <SiteFooter />
        <ChatWidget />
      </>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
