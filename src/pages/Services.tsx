import React from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Collaborative threads',
    body: 'Open a discussion around a starting value and let a team branch it. Every step is attributed to whoever added it.',
    points: ['Unlimited branches', 'Author on every node', 'Read without an account'],
  },
  {
    title: 'Classroom mode',
    body: 'Give a cohort one shared problem and watch the approaches diverge. Wrong turns stay visible — that’s the teaching material.',
    points: ['One link per problem', 'Compare parallel attempts', 'No student setup'],
  },
  {
    title: 'Review & audit',
    body: 'Walk any result back to its root. Because operations are stored rather than flattened, a number can always be justified.',
    points: ['Full step history', 'Traceable results', 'Nothing overwritten'],
  },
];

const plans = [
  {
    name: 'Free',
    price: '$0',
    note: 'For individuals trying things out',
    features: ['Unlimited public discussions', 'All four operations', 'Read-only sharing'],
    cta: 'Get started',
    to: '/login',
    highlight: false,
  },
  {
    name: 'Team',
    price: '$12',
    note: 'Per user, per month',
    features: ['Everything in Free', 'Private discussions', 'Shared workspace', 'Priority support'],
    cta: 'Start free trial',
    to: '/login',
    highlight: true,
  },
  {
    name: 'Institution',
    price: 'Custom',
    note: 'For schools and departments',
    features: ['Everything in Team', 'Cohort management', 'SSO', 'Onboarding support'],
    cta: 'Contact us',
    to: '/about',
    highlight: false,
  },
];

const Services: React.FC = () => {
  return (
    <div>
      {/* Intro */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-hover border border-border text-sm text-secondary">
          Services
        </span>
        <h1 className="mt-6 text-4xl md:text-5xl font-bold text-primary tracking-tight">
          One tree, several ways to use it
        </h1>
        <p className="mt-6 text-lg text-secondary leading-relaxed">
          The core is always the same — a branching calculation everyone can
          read. What changes is who you open it with.
        </p>
      </section>

      {/* Service cards */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white p-7 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <h3 className="text-lg font-bold text-primary">{s.title}</h3>
              <p className="mt-3 text-secondary leading-relaxed flex-1">{s.body}</p>
              <ul className="mt-5 space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-secondary">
                    <span className="text-green font-bold leading-5">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-hover border-y border-border">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-primary text-center">Simple pricing</h2>
          <p className="mt-3 text-secondary text-center">
            Start free. Upgrade when your discussions need to stay private.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3 items-start">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl border p-8 bg-white ${
                  p.highlight ? 'border-blue shadow-md md:-mt-4' : 'border-border shadow-sm'
                }`}
              >
                {p.highlight && (
                  <span className="inline-block mb-4 px-3 py-1 rounded-full bg-blue text-white text-xs font-bold">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-bold text-primary">{p.name}</h3>
                <div className="mt-3 text-4xl font-bold text-primary">{p.price}</div>
                <p className="mt-1 text-sm text-secondary">{p.note}</p>

                <ul className="mt-6 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-secondary">
                      <span className="text-green font-bold leading-5">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={p.to}
                  className={`block mt-8 text-center px-6 py-3 rounded-full font-bold transition-colors ${
                    p.highlight
                      ? 'bg-blue text-white hover:bg-blue-hover'
                      : 'border border-gray-300 text-primary hover:bg-hover'
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-primary">Not sure which fits?</h2>
        <p className="mt-3 text-secondary max-w-lg mx-auto">
          Open a public discussion and try the whole thing before deciding.
        </p>
        <Link
          to="/discussions"
          className="inline-block mt-8 px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-colors shadow-sm"
        >
          Browse discussions
        </Link>
      </section>
    </div>
  );
};

export default Services;
