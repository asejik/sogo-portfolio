const steps = [
  {
    title: 'Plan',
    text: 'Understand the problem and who it is for. Whether you bring a full PRD or just an idea, we agree on what the first version must do.',
  },
  {
    title: 'Design the system',
    text: 'Decide how the pieces fit: the database, the services, what runs where, and what happens when many people use it at once.',
  },
  {
    title: 'Build with AI',
    text: 'I direct AI tools like Claude and Gemini to write the code, and review what they produce. AI is fast. It is not always right.',
  },
  {
    title: 'Lock it down',
    text: 'Sign-in, who can see what, and keeping keys and private data out of reach. This is where rushed apps usually cut corners.',
  },
  {
    title: 'Test and break it',
    text: 'Real phones, slow networks, wrong inputs. I try to break it on purpose before your users do it by accident.',
  },
  {
    title: 'Audit, then ship',
    text: 'Before launch I run my own audits for security, performance and running costs, then deploy and stay around for support.',
  },
];

const Process = () => {
  return (
    <section id="process" className="py-24 md:py-32 bg-ivory text-ink">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-5">
            <h2 className="font-display text-4xl md:text-6xl font-medium tracking-[-0.02em] leading-[1.05]">
              How I build
            </h2>
          </div>
          <div className="md:col-span-7 space-y-5 text-lg leading-relaxed text-[#4a443a]">
            <p>
              People think AI turns one prompt into a finished app. It doesn't. A real product still needs system
              design, security, a database that holds up, and testing.
            </p>
            <p>
              AI makes every one of those steps faster. It doesn't make any of them disappear. Civil engineering taught
              me to respect the parts of a structure nobody sees, and I build software the same way.
            </p>
          </div>
        </div>

        <ol className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t-2 border-ink">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative pt-8 pb-10 pr-8 border-b border-[#d8d0c1] sm:[&:nth-child(odd)]:pr-10 lg:[&:not(:nth-child(3n))]:border-r lg:[&:not(:nth-child(3n+1))]:pl-8"
            >
              <span
                aria-hidden="true"
                className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-ink font-display text-lg font-semibold"
              >
                {i + 1}
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-[17px] leading-relaxed text-[#4a443a] max-w-sm">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
