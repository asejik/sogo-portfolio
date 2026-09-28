import { Link } from 'react-router-dom';
import { getArticles } from '../../utils/articleLoader';

const formatDate = (d: string) => {
  const date = new Date(d);
  return isNaN(date.getTime())
    ? d
    : date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

const Writing = () => {
  const articles = getArticles();

  return (
    <section id="writing" className="py-24 md:py-32 border-t border-line">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10">
        <div className="md:col-span-5">
          <h2 className="font-display text-ivory text-4xl md:text-6xl font-medium tracking-[-0.02em]">Writing</h2>
          <p className="mt-5 text-lg text-stone max-w-sm">
            Notes on building with AI, engineering, growth and faith.
          </p>
        </div>

        <ul className="md:col-span-7 border-t border-line">
          {articles.map((a) => {
            const preview = a.excerpt || a.content.replace(/[#*`>_[\]()]/g, '').trim().slice(0, 150) + '...';
            return (
              <li key={a.slug} className="border-b border-line">
                <Link to={`/garden/${a.slug}`} className="group block py-7">
                  <p className="text-sm text-stone">
                    {formatDate(a.date)}, {a.readTime}
                  </p>
                  <h3 className="mt-2 font-display text-ivory text-2xl font-medium leading-snug group-hover:text-gold-400 transition-colors">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-sanctum-300 leading-relaxed">{preview}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Writing;
