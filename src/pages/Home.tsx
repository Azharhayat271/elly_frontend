import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const features = [
  {
    title: 'Branching calculations',
    body: 'Every reply is an operation on the number above it. Threads grow into a tree you can actually follow.',
  },
  {
    title: 'Shared by default',
    body: 'Anyone can read a discussion. Sign in when you want to add a branch of your own.',
  },
  {
    title: 'Nothing to set up',
    body: 'No spreadsheets, no whiteboard, no screen share. Open a link and start from the last result.',
  },
];

const steps = [
  { n: '01', title: 'Start with a number', body: 'Any discussion begins with a single value — the root of the tree.' },
  { n: '02', title: 'Apply an operation', body: 'Add, subtract, multiply or divide. Each reply carries its own result.' },
  { n: '03', title: 'Branch freely', body: 'Disagree with a step? Branch from it instead of overwriting it.' },
];

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-hover border border-border text-sm text-secondary">
          Collaborative mathematics
        </span>
        <h1 className="mt-6 text-4xl md:text-6xl font-bold text-primary tracking-tight leading-tight">
          Think through the math,
          <br />
          <span className="text-blue">together.</span>
        </h1>
        <p className="mt-6 text-lg text-secondary max-w-2xl mx-auto">
          Discussions turns a calculation into a conversation. Start from a
          number, branch into operations, and let every step keep its own
          history.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/discussions"
            className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-colors shadow-sm"
          >
            Browse discussions
          </Link>
          {!isAuthenticated && (
            <Link
              to="/login"
              className="px-8 py-3 border border-gray-300 rounded-full font-semibold text-primary hover:bg-hover transition-colors"
            >
              Create an account
            </Link>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white p-7 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-bold text-primary">{f.title}</h3>
              <p className="mt-3 text-secondary leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-hover border-y border-border">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-primary text-center">How it works</h2>
          <p className="mt-3 text-secondary text-center max-w-xl mx-auto">
            Three steps, and the tree does the bookkeeping for you.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n}>
                <span className="text-4xl font-bold text-blue/30">{s.n}</span>
                <h3 className="mt-3 text-lg font-bold text-primary">{s.title}</h3>
                <p className="mt-2 text-secondary leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-primary rounded-3xl px-8 py-14 text-center">
          <h2 className="text-3xl font-bold text-white">Start your first thread</h2>
          <p className="mt-3 text-white/70 max-w-lg mx-auto">
            Reading is open to everyone. Sign in when you're ready to add a branch.
          </p>
          <Link
            to={isAuthenticated ? '/discussions' : '/login'}
            className="inline-block mt-8 px-8 py-3 bg-white text-primary rounded-full font-bold hover:bg-white/90 transition-colors"
          >
            {isAuthenticated ? 'Go to discussions' : 'Get started — it’s free'}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
