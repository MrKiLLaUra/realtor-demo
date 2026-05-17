/* Prestige Properties — Blog Post Page */

(function () {
  const { useEffect, useState } = React;

  function getPost() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug");
    return window.BLOG_POSTS.find((p) => p.slug === slug) || null;
  }

  function RelatedPosts({ current }) {
    const related = window.BLOG_POSTS.filter((p) => p.slug !== current.slug).slice(0, 3);
    return (
      <section className="section">
        <header className="sec-header gs-reveal">
          <div>
            <div className="eyebrow">Keep Reading</div>
            <h2 className="display sec-title">More from the blog</h2>
          </div>
          <a href="blog.html" className="pill pill-ghost">All Articles <Icon.Arrow /></a>
        </header>
        <div className="blog-grid gs-stagger">
          {related.map((p) => (
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

  function PostContent({ post: p }) {
    return (
      <>
        {/* Hero */}
        <div className="post-hero" style={{ backgroundImage: `url('${p.image}')` }}>
          <div className="post-hero-overlay"></div>
          <div className="post-hero-content">
            <a href="blog.html" className="prop-back"><Icon.Arrow style={{ transform: "rotate(180deg)" }} /> Back to Blog</a>
            <span className="blog-cat" style={{ alignSelf: "flex-start" }}>{p.category}</span>
            <h1 className="display post-title">{p.title}</h1>
            <div className="post-byline">By Sophia Kavanagh &nbsp;·&nbsp; {p.date} &nbsp;·&nbsp; {p.readTime}</div>
          </div>
        </div>

        {/* Article body */}
        <div className="section post-layout">
          <article className="post-article gs-from-left">
            <p className="post-lede">{p.excerpt}</p>
            {p.content.map((section, i) => (
              <div key={i} className="post-section">
                <h2 className="post-section-h">{section.heading}</h2>
                <p>{section.body}</p>
              </div>
            ))}
            <div className="post-cta-block gs-reveal">
              <div className="eyebrow" style={{ color: "var(--green)", marginBottom: 12 }}>Ready to take the next step?</div>
              <h3 className="display" style={{ fontSize: "clamp(32px,4vw,56px)", marginBottom: 20 }}>Talk to Sophia</h3>
              <p style={{ color: "var(--ink-2)", marginBottom: 24, fontSize: 16 }}>Whether you're buying, selling, or simply exploring your options, a private conversation costs nothing and clarifies everything.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="contact.html" className="pill pill-green">Get in Touch <Icon.Arrow /></a>
                <a href="properties.html" className="pill pill-ghost">Browse Properties <Icon.Arrow /></a>
              </div>
            </div>
          </article>

          <aside className="post-sidebar">
            <div className="post-author-card" data-aos="fade-up">
              <div className="post-author-photo"></div>
              <div className="eyebrow" style={{ marginBottom: 4 }}>Written by</div>
              <div style={{ fontWeight: 600, fontSize: 16 }}>Sophia Kavanagh</div>
              <div style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 4 }}>Principal Agent at Prestige Properties. 14 years inside Dublin's most discreet property market.</div>
              <a href="contact.html" className="pill pill-green" style={{ marginTop: 18, justifyContent: "center" }}>Contact Sophia <Icon.Arrow /></a>
            </div>
            <div className="post-more" data-aos="fade-up" data-aos-delay="100">
              <div className="eyebrow" style={{ marginBottom: 16 }}>More Articles</div>
              {window.BLOG_POSTS.filter((b) => b.slug !== p.slug).slice(0, 3).map((b) => (
                <a href={`blog-post.html?slug=${b.slug}`} key={b.slug} className="post-more-item">
                  <div className="post-more-img" style={{ backgroundImage: `url('${b.image}')` }}></div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3 }}>{b.title}</div>
                    <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 4 }}>{b.readTime}</div>
                  </div>
                </a>
              ))}
            </div>
          </aside>
        </div>

        <RelatedPosts current={p} />
      </>
    );
  }

  function NotFound() {
    return (
      <div style={{ textAlign: "center", padding: "160px 40px" }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>Article Not Found</div>
        <a href="blog.html" className="pill pill-green" style={{ marginTop: 24 }}>Back to Blog <Icon.Arrow /></a>
      </div>
    );
  }

  function App() {
    const [post] = useState(getPost);

    useEffect(() => {
      window.initLibs && window.initLibs();
      if (post) document.title = `${post.title} — Prestige Properties`;
    }, []);

    return (
      <>
        <SiteNav />
        {post ? <PostContent post={post} /> : <NotFound />}
        <SiteFooter />
        <ChatWidget />
      </>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
