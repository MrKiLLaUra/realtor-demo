/* Prestige Properties — Services Page */

(function () {
  const { useEffect } = React;

  function ServicesGrid() {
    return (
      <section className="section">
        <header className="sec-header gs-reveal">
          <div>
            <div className="eyebrow">What We Do</div>
            <h2 className="display sec-title">Every aspect of your property journey</h2>
          </div>
        </header>
        <div className="services-grid gs-stagger">
          {window.SERVICES.map((s, i) => (
            <div className="service-card gs-item" key={i}>
              <div className="service-icon">{s.icon}</div>
              <div className="service-body">
                <div className="eyebrow" style={{ marginBottom: 6 }}>{s.subtitle}</div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.description}</p>
                <a href="contact.html" className="service-cta">{s.cta} <Icon.Arrow /></a>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  function ProcessSection() {
    const steps = [
      { n: "01", title: "Initial Consultation", body: "A private, obligation-free conversation about your goals, timeline, and any constraints. We listen before we advise." },
      { n: "02", title: "Strategy & Preparation", body: "For sellers: valuation, styling guidance, and marketing plan. For buyers: brief, search criteria, and market orientation." },
      { n: "03", title: "Active Representation", body: "We handle every element — viewings, negotiations, due diligence, legal coordination — so you don't have to." },
      { n: "04", title: "Completion & Beyond", body: "We stay involved through closing and remain available for any questions after the keys are exchanged." },
    ];
    return (
      <div className="process-strip">
        <div className="section" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <header className="sec-header gs-reveal" style={{ marginBottom: 48 }}>
            <div>
              <div className="eyebrow">How It Works</div>
              <h2 className="display sec-title">Our process, simplified</h2>
            </div>
          </header>
          <div className="process-grid gs-stagger">
            {steps.map((s) => (
              <div className="process-step gs-item" key={s.n}>
                <div className="process-n">{s.n}</div>
                <h4 className="process-title">{s.title}</h4>
                <p className="process-body">{s.body}</p>
              </div>
            ))}
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
          image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
          eyebrow="Our Services"
          title="What We<br/>Do For You"
          subtitle="Comprehensive, discreet representation at every stage of the property journey."
        />
        <ServicesGrid />
        <ProcessSection />
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
