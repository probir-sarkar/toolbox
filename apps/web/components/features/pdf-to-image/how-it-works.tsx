export function HowItWorks() {
  const steps = [
    {
      title: "Add your PDF",
      desc: "Choose any PDF from your device. Files never leave your browser.",
      num: "1",
    },
    {
      title: "Render pages",
      desc: "We process each page locally using safe, standards-based rendering.",
      num: "2",
    },
    {
      title: "Save images",
      desc: "Export pages individually or all at once. Great for sharing or archives.",
      num: "3",
    },
  ];
  return (
    <div>
      <h3 className="text-balance text-2xl font-bold tracking-tight text-slate-900 mb-2">How it works</h3>
      <p className="max-w-2xl text-slate-600 mb-8">
        Simple, predictable steps anyone can follow. No accounts, no uploads, no learning curve.
      </p>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.num} className="relative pt-4">
             <div className="absolute top-0 left-0 -ml-1.5 h-3 w-3 rounded-full bg-slate-200 ring-4 ring-white" />
            <div className="flex flex-col gap-2 border-l-2 border-slate-100 pl-6 pb-2">
              <span className="text-4xl font-bold text-slate-100 -ml-1">0{s.num}</span>
              <h4 className="font-semibold text-lg text-slate-900">{s.title}</h4>
              <p className="text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
