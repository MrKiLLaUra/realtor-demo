/* Prestige Properties — Blog Listing Page */

(function () {
  const { useEffect } = React;

  function BlogGrid() {
    const posts = window.BLOG_POSTS;
    return (
      <section className="section">
        <header className="sec-header gs-reveal">
          <div>
            <div className="eyebrow">Insights & Guides</div>
            <h2 className="display sec-title">From the Prestige Properties desk</h2>
          </div>
        </header>
        <div className="blog-grid gs-stagger">
          {posts.map((p, i) => (
            <a href={`blog-post.html?slug=${p.slug}`} className="blog-card gs-item" key={p.slug}>
              <div className="blog-card-img" style={{ backgroundImage: `url('${p.image}')` }}>
                <span className="blog-cat">{p.category}</span>
              </div>
              <div className="blog-card-body">
                <div className="blog-meta">{p.date} · {p.readTime}</div>
                <h3 className="blog-title">{p.title}</h3>
                <p className="blog-excerpt">{p.excerpt}</p>
                <span className="blog-read">Read Article <Icon.Arrow /></span>
              </div>
            </a>
          ))}
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
          image="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80"
          eyebrow="Insights & Guides"
          title="The Prestige<br/>Properties Blog"
          subtitle="Market reports, buying guides, and neighbourhood insights from Sophia's desk."
        />
        <BlogGrid />
        <SiteFooter />
        <ChatWidget />
      </>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
