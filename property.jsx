/* Prestige Properties — Property Detail Page */

(function () {
  const { useEffect, useState } = React;

  function getProperty() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"), 10);
    return window.LISTINGS.find((l) => l.id === id) || null;
  }

  function SimilarProperties({ current }) {
    const similar = window.LISTINGS
      .filter((l) => l.id !== current.id && l.status === current.status)
      .slice(0, 3);
    if (!similar.length) return null;
    return (
      <section className="section prop-similar">
        <div className="sec-header gs-reveal">
          <div>
            <div className="eyebrow">More Properties</div>
            <h2 className="display sec-title">You might also like</h2>
          </div>
          <a href="properties.html" className="pill pill-ghost">View All <Icon.Arrow /></a>
        </div>
        <div className="grid gs-stagger">
          {similar.map((l) => <ListingCard key={l.id} l={l} />)}
        </div>
      </section>
    );
  }

  function EnquiryForm({ property }) {
    const [sent, setSent] = useState(false);
    return (
      <div className="prop-enquiry-form gs-from-right">
        <div className="eyebrow" style={{ marginBottom: 12 }}>Enquire About This Property</div>
        {sent ? (
          <div className="thanks" style={{ padding: "24px 0" }}>
            <div className="eyebrow" style={{ color: "var(--green)" }}>Request Received</div>
            <div className="display" style={{ fontSize: 40, margin: "10px 0 6px" }}>Thank you</div>
            <p style={{ color: "var(--ink-2)", fontSize: 14 }}>Sophia will be in touch within one working day.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <div className="prop-form-grid">
              <label>Name<input required type="text" placeholder="Your full name" /></label>
              <label>Email<input required type="email" placeholder="you@example.com" /></label>
              <label>Phone<input type="tel" placeholder="+353 …" /></label>
              <label>Preferred Date<input type="date" /></label>
            </div>
            <button type="submit" className="pill pill-green" style={{ width: "100%", justifyContent: "center", marginTop: 18 }}>
              Book a Viewing <Icon.Arrow />
            </button>
            <a href={`https://wa.me/353877770000?text=Hi Sophia, I'm interested in ${encodeURIComponent(property.address)}`}
              className="pill pill-wa" style={{ width: "100%", justifyContent: "center", marginTop: 10 }}>
              <Icon.Whatsapp style={{ width: 14, height: 14 }} /> Message on WhatsApp
            </a>
          </form>
        )}
      </div>
    );
  }

  function PropertyDetail({ property: p }) {
    return (
      <>
        {/* Hero */}
        <div className="prop-hero" style={{ backgroundImage: `url('${p.image}')` }}>
          <div className="prop-hero-overlay"></div>
          <div className="prop-hero-content">
            <a href="properties.html" className="prop-back"><Icon.Arrow style={{ transform: "rotate(180deg)" }} /> Back to Properties</a>
            <span className="card-badge" style={{ alignSelf: "flex-start" }}>{p.status}</span>
          </div>
        </div>

        {/* Main content */}
        <div className="section prop-layout">
          {/* Left */}
          <div className="prop-main gs-from-left">
            <div className="prop-price">{p.price}</div>
            <h1 className="display prop-title">{p.title}</h1>
            <p className="prop-address">{p.address}</p>

            <div className="prop-stats-row">
              <div className="prop-stat"><Icon.Bed /><span>{p.beds} Bedrooms</span></div>
              <div className="prop-stat"><Icon.Bath /><span>{p.baths} Bathrooms</span></div>
              <div className="prop-stat"><Icon.Area /><span>{p.sqm} m²</span></div>
            </div>

            <div className="tags" style={{ marginBottom: 28 }}>
              {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
            </div>

            <div className="prop-section-label">About this property</div>
            <p className="prop-desc">{p.description}</p>

            <div className="prop-meta-grid">
              <div><span className="k">Status</span><span className="v">{p.status}</span></div>
              <div><span className="k">Area</span><span className="v">{p.area}</span></div>
              <div><span className="k">Size</span><span className="v">{p.sqm} m²</span></div>
              <div><span className="k">Agent</span><span className="v">{p.agent}</span></div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="prop-sidebar">
            <EnquiryForm property={p} />
            <div className="prop-agent-card" data-aos="fade-up">
              <div className="prop-agent-photo"></div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>Sophia Kavanagh</div>
                <div style={{ fontSize: 12, color: "var(--ink-2)" }}>Principal Agent · Prestige Properties</div>
                <a href="tel:+35316770000" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--green)", marginTop: 8, fontWeight: 500 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.46-.46a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                  +353 1 677 0000
                </a>
              </div>
            </div>
          </div>
        </div>

        <SimilarProperties current={p} />
      </>
    );
  }

  function NotFound() {
    return (
      <div style={{ textAlign: "center", padding: "160px 40px" }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>Property Not Found</div>
        <h1 className="display" style={{ fontSize: "clamp(48px,8vw,96px)", marginBottom: 24 }}>404</h1>
        <a href="properties.html" className="pill pill-green">Browse All Properties <Icon.Arrow /></a>
      </div>
    );
  }

  function App() {
    const [property] = useState(getProperty);

    useEffect(() => {
      window.initLibs && window.initLibs();
      if (property) {
        document.title = `${property.title} — Prestige Properties`;
      }
    }, []);

    return (
      <>
        <SiteNav />
        {property ? <PropertyDetail property={property} /> : <NotFound />}
        <SiteFooter />
        <ChatWidget />
      </>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
