import React from 'react';
import { Link } from 'react-router-dom';

const values = [
  {
    title: 'Show the working',
    body: 'A result without its steps is a claim, not an argument. Every node keeps the operation that produced it.',
  },
  {
    title: 'Disagree by branching',
    body: 'Nobody has to be overwritten to be corrected. Alternative paths live side by side.',
  },
  {
    title: 'Readable by default',
    body: 'Discussions are open to read without an account. Understanding shouldn’t need a signup form.',
  },
];

const stats = [
  { value: '4', label: 'Operations supported' },
  { value: '∞', label: 'Branches per thread' },
  { value: '0', label: 'Steps hidden from you' },
];

const About: React.FC = () => {
  return (
    <div>
      {/* Intro */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-hover border border-border text-sm text-secondary">
          About us
        </span>
        <h1 className="mt-6 text-4xl md:text-5xl font-bold text-primary tracking-tight">
          We build tools for thinking out loud
        </h1>
        <p className="mt-6 text-lg text-secondary leading-relaxed">
          Discussions started from a small frustration: math conversations kept
          happening in places that couldn’t hold them. Chat threads flatten the
          structure. Documents hide the history. Whiteboards get erased.
        </p>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-2xl border border-border shadow-sm p-8 md:p-10">
          <h2 className="text-2xl font-bold text-primary">Our story</h2>
          <div className="mt-5 space-y-4 text-secondary leading-relaxed">
            <p>
              A calculation is rarely one straight line. Someone proposes a
              step, someone else questions it, and a third person takes the
              whole thing in a different direction. That shape is a tree — so we
              built the tool as a tree.
            </p>
            <p>
              Each contribution stores the operation, the number applied, and
              the result it produced. Nothing is recomputed behind your back and
              nothing is thrown away. You can always walk back up a branch and
              see exactly how a value came to be.
            </p>
            <p>
              We keep the product deliberately small. Four operations, one
              account, no dashboards to configure. The interesting complexity
              should live in the conversation, not the interface.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-hover border-y border-border">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-primary text-center">What we value</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="bg-white p-7 rounded-2xl border border-border">
                <h3 className="text-lg font-bold text-primary">{v.title}</h3>
                <p className="mt-3 text-secondary leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid gap-8 sm:grid-cols-3 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-5xl font-bold text-blue">{s.value}</div>
              <div className="mt-2 text-secondary">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-primary">Want to see it in practice?</h2>
          <Link
            to="/discussions"
            className="inline-block mt-6 px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-colors shadow-sm"
          >
            Open a discussion
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
