/* Prestige Properties — About Page */

(function () {
  const { useEffect } = React;

  function About() {
    return (
      <section className="section" id="about">
        <div className="about">
          <div className="about-photo gs-from-left">
            <div className="stamp">Sophia Kavanagh<small>Principal Agent, Dublin 4</small></div>
          </div>
          <div className="about-body">
            <div className="eyebrow gs-reveal">About Sophia</div>
            <h2 className="display sec-title gs-reveal" style={{ marginBottom: 24 }}>
              Fourteen years inside Dublin's most discreet market
            </h2>
            <p className="lede gs-reveal">
              I grew up between Ranelagh and Sandymount, studied architecture at UCD, and have spent the last decade helping families, founders, and returning Dubliners find the right address — quietly, and on their own terms.
            </p>
            <p className="gs-reveal">
              My clients come back because the process is calm: clear pricing, photography that flatters but never lies, viewings tailored to your schedule, and negotiations handled with a steady hand. Most of my listings never make it to the public portals.
            </p>
            <div className="about-actions gs-reveal">
              <a href="tel:+35316770000" className="pill pill-green">Call +353 1 677 0000 <Icon.Arrow /></a>
              <a href="https://wa.me/353877770000" className="pill pill-ghost">
                <Icon.Whatsapp style={{ width: 16, height: 16 }} /> WhatsApp
              </a>
            </div>
          </div>
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
        <SiteNav />
        <PageBanner
          image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
          eyebrow="Our Story"
          title="About<br/>Sophia"
          subtitle="Fourteen years inside Dublin's most discreet property market."
        />
        <About />
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
