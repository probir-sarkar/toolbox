export function HowItWorks() {
    const steps = [
        {
            title: "Add your Images",
            desc: "Drag & drop your photos. We support JPG, PNG, WebP, and more.",
            num: "1",
        },
        {
            title: "Choose Settings",
            desc: "Select your target format, quality, and optimization preferences.",
            num: "2",
        },
        {
            title: "Convert & Save",
            desc: "Images are processed locally. Download them individually or as a ZIP.",
            num: "3",
        },
    ];
    return (
        <div>
            <h3 className="text-balance text-2xl font-bold tracking-tight text-slate-900 mb-2">How it works</h3>
            <p className="max-w-2xl text-slate-600 mb-8">
                Optimize and transform your images in three simple steps. Fast, secure, and purely client-side.
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

