/* Prestige Properties — Properties Page */

(function () {
  const { useState, useEffect } = React;

  function Listings() {
    const [filter, setFilter] = useState("All");
    const all = window.LISTINGS;
    const shown = filter === "All" ? all : all.filter((l) => l.status === filter);

    return (
      <section className="section">
        <header className="sec-header gs-reveal">
          <div>
            <div className="eyebrow">Our Portfolio</div>
            <h2 className="display sec-title">A curated portfolio of Dublin homes</h2>
          </div>
          <div className="filters" role="tablist">
            {["All", "For Sale", "For Rent"].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={filter === f ? "on" : ""}>{f}</button>
            ))}
          </div>
        </header>
        <div className="grid gs-stagger" key={filter}>
          {shown.map((l) => <ListingCard key={l.id} l={l} />)}
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
          image="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2000&q=80"
          eyebrow="Our Portfolio"
          title="Dublin's Finest<br/>Residences"
          subtitle="Browse our curated collection of homes across Dublin's most sought-after addresses."
        />
        <Listings />
        <StatsStrip />
        <SiteFooter />
        <ChatWidget />
      </>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
