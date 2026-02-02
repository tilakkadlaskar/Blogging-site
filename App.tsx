import React from 'react';
import { HashRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import { Layout } from './components/Layout';
import { BLOG_POSTS } from './constants';
import { MathBlock } from './components/MathBlock';
import { ResearchAssistant } from './components/ResearchAssistant';
import { BlogPost } from './types';

// --- Page Components ---

const BlogList: React.FC = () => {
  return (
    <div className="space-y-16">
      <header className="border-b border-academic-border pb-8 mb-12">
        <h2 className="text-3xl md:text-4xl font-serif text-ink mb-4">Index of Thoughts</h2>
        <p className="text-lg text-gray-400 font-light max-w-xl leading-relaxed">
          A collection of notes, concepts, and explanations from across tech and engineering.
        </p>
      </header>

      <div className="grid gap-12">
        {BLOG_POSTS.map(post => (
          <article key={post.id} className="group cursor-pointer">
            <Link to={`/post/${post.id}`} className="block">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                <h3 className="text-2xl font-serif text-ink group-hover:text-academic-blue transition-colors duration-200">
                  {post.title}
                </h3>
                <span className="font-mono text-xs text-gray-500 mt-1 md:mt-0 whitespace-nowrap">{post.date}</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-3 font-light">
                {post.abstract}
              </p>
              <div className="flex gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="inline-block text-[10px] uppercase tracking-widest font-mono text-gray-600 border border-academic-border px-2 py-0.5 rounded-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </article>
        ))}
      </div>
      <ResearchAssistant currentPost={null} />
    </div>
  );
};

const BlogPostView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-2xl font-serif text-gray-500 italic">404: Hypothesis Rejected</h2>
        <Link to="/" className="mt-4 text-academic-blue hover:underline font-mono text-sm">Return to Index</Link>
      </div>
    );
  }

  const copyCitation = () => {
    const bibtex = `@misc{${post.citationKey},
  title={${post.title}},
  author={Kadlaskar, Tilak},
  year={${new Date(post.date).getFullYear()}},
  url={https://blogs.tilakkadlaskr.me/#/post/${post.id}}
}`;
    navigator.clipboard.writeText(bibtex);
    alert("BibTeX copied to clipboard");
  };

  return (
    <article className="animate-fade-in">
      <header className="mb-12 border-b border-academic-border pb-8">
        <div className="font-mono text-xs text-gray-500 mb-4 flex items-center gap-2">
          <Link to="/" className="hover:text-academic-blue">Index</Link> 
          <span>/</span>
          <span>{post.id}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif text-ink leading-tight mb-6">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          <button 
            onClick={copyCitation}
            className="text-xs uppercase tracking-widest border border-academic-border px-3 py-1 hover:bg-academic-surface hover:text-academic-blue transition-colors"
          >
            Cite
          </button>
        </div>
      </header>

      {/* prose-invert flips typography colors for dark mode */}
      <div className="prose prose-invert prose-lg max-w-none font-serif text-gray-300">
        <div className="bg-academic-surface p-6 mb-10 rounded-sm border-l-4 border-academic-border italic text-gray-400">
          <strong className="not-italic font-mono text-xs text-gray-500 block mb-2 uppercase tracking-widest">Abstract</strong>
          {post.abstract}
        </div>

        {post.content.map((section, idx) => (
          <section key={idx} className="mb-10">
            {section.title && (
              <h2 className="text-2xl font-semibold text-ink mt-8 mb-4">{section.title}</h2>
            )}
            
            <p className="mb-4 leading-loose text-lg">
              {section.content}
            </p>

            {section.mathEq && (
              <MathBlock equation={section.mathEq} />
            )}

            {section.codeBlock && (
              <pre className="bg-[#1e1e1e] text-gray-200 p-4 rounded-sm overflow-x-auto text-sm font-mono my-6 border border-academic-border shadow-sm">
                <code>{section.codeBlock}</code>
              </pre>
            )}
          </section>
        ))}
      </div>

      <footer className="mt-20 pt-10 border-t border-academic-border">
        <div className="flex justify-between items-center">
          <Link to="/" className="font-mono text-sm text-gray-500 hover:text-academic-blue">← Back to Index</Link>
          <div className="font-serif italic text-gray-600">Q.E.D.</div>
        </div>
      </footer>

      <ResearchAssistant currentPost={post} />
    </article>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/post/:id" element={<BlogPostView />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;