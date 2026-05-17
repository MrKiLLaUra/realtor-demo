/* Prestige Properties — Neighbourhoods Page */

(function () {
  const { useEffect } = React;

  function NeighborhoodGrid() {
    return (
      <section className="section">
        <header className="sec-header gs-reveal">
          <div>
            <div className="eyebrow">Dublin's Finest Areas</div>
            <h2 className="display sec-title">Find your neighbourhood</h2>
          </div>
        </header>
        <div className="nbhd-grid gs-stagger">
          {window.NEIGHBORHOODS.map((n) => (
            <div className="nbhd-card gs-item" key={n.id}>
              <div className="nbhd-photo" style={{ backgroundImage: `url('${n.image}')` }}>
                <div className="nbhd-photo-overlay"></div>
                <div className="nbhd-district">{n.district}</div>
              </div>
              <div className="nbhd-body">
                <h3 className="nbhd-name">{n.name}</h3>
                <p className="nbhd-tagline">{n.tagline}</p>
                <p className="nbhd-desc">{n.description}</p>
                <div className="nbhd-highlights">
                  {n.highlights.map((h) => <span className="tag" key={h}>{h}</span>)}
                </div>
                <div className="nbhd-meta">
                  <div><span className="k">Avg. Price</span><span className="v">{n.avgSale}</span></div>
                  <div><span className="k">Property Type</span><span className="v">{n.type}</span></div>
                </div>
                <a href={`properties.html?area=${encodeURIComponent(n.name)}`} className="pill pill-green nbhd-cta">
                  View Properties <Icon.Arrow />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  function AreaMap() {
    return (
      <div className="area-map-section gs-reveal">
        <div className="section" style={{ paddingTop: 0 }}>
          <header className="sec-header" style={{ marginBottom: 40 }}>
            <div>
              <div className="eyebrow">Coverage</div>
              <h2 className="display sec-title">Where we operate</h2>
            </div>
            <p className="sec-desc">We focus exclusively on premium residential property across Dublin's southside and key northside addresses.</p>
          </header>
          <div className="area-map-placeholder">
            <div className="area-map-inner">
              <div className="display" style={{ fontSize: "clamp(32px,5vw,64px)", marginBottom: 16, opacity: 0.4 }}>Dublin</div>
              <p style={{ color: "var(--ink-2)", fontSize: 15, maxWidth: "40ch", textAlign: "center" }}>
                Ballsbridge · Ranelagh · Sandymount · Grand Canal Dock · Portobello · Foxrock · Clontarf · Dún Laoghaire · Killiney and beyond
              </p>
              <a href="contact.html" className="pill pill-green" style={{ marginTop: 24 }}>Discuss Your Area <Icon.Arrow /></a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function App() {
    useEffect(() => {
      window.initLibs && window.initLibs();
    }, []);

    return (
      <>
        <SiteNav />
        <PageBanner
          image="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2000&q=80"
          eyebrow="Dublin Neighbourhoods"
          title="Find Your<br/>Perfect Area"
          subtitle="Detailed guides to Dublin's most sought-after residential neighbourhoods."
        />
        <NeighborhoodGrid />
        <AreaMap />
        <StatsStrip />
        <SiteFooter />
        <ChatWidget />
      </>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
