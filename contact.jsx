/* Prestige Properties — Contact Page */

(function () {
  const { useState, useEffect } = React;

  function Contact() {
    const [sent, setSent] = useState(false);
    return (
      <section className="section" id="contact">
        <div className="contact-grid">
          <div className="cinfo gs-from-left">
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
              <span className="v">12 Merrion Square North<br />Dublin 2, D02 KH53</span>
            </div>
            <div className="row">
              <span className="k">Hours</span>
              <span className="v">Mon–Fri 9–7 · Sat 10–4</span>
            </div>
            <a href="https://wa.me/353877770000" className="pill pill-green" style={{ alignSelf: "flex-start" }}>
              <Icon.Whatsapp style={{ width: 16, height: 16 }} /> Message on WhatsApp
            </a>
          </div>

          <div className="form gs-from-right">
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

  function App() {
    useEffect(() => {
      window.initLibs && window.initLibs();
    }, []);

    return (
      <>
        <SiteNav />
        <PageBanner
          image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
          eyebrow="Get In Touch"
          title="Let's find your<br/>next address"
          subtitle="Reach out for a private valuation, an off-market introduction, or simply a conversation."
          small
        />
        <Contact />
        <SiteFooter />
        <ChatWidget />
      </>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
