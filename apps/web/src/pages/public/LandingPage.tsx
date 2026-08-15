export function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a
            href="/"
            className="text-xl font-bold tracking-tight text-slate-950"
          >
            CoursePilot AI
          </a>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Sign in
            </button>

            <button
              type="button"
              className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Create account
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-800">
            AI-guided learning grounded in course material
          </div>

          <h1 className="max-w-3xl text-5xl leading-tight font-bold tracking-tight text-slate-950 lg:text-6xl">
            Learn through reasoning, not answer delivery.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            CoursePilot AI helps instructors create structured courses while
            guiding students through lessons, exercises, progressive hints,
            explain-back activities, and source-backed AI tutoring.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <button
              type="button"
              className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Explore courses
            </button>

            <button
              type="button"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:bg-slate-100"
            >
              Create a course
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
          <div className="rounded-2xl bg-slate-950 p-6 text-white">
            <p className="text-sm font-medium text-blue-300">
              Student question
            </p>

            <p className="mt-3 text-lg">
              How should I approach the Two Sum problem?
            </p>
          </div>

          <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <p className="text-sm font-semibold text-blue-800">
              CoursePilot Tutor
            </p>

            <p className="mt-3 leading-7 text-slate-700">
              Before thinking about code, what information would be useful to
              remember while scanning the array?
            </p>

            <div className="mt-5 rounded-xl border border-blue-200 bg-white p-4">
              <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                Source
              </p>

              <p className="mt-1 text-sm font-medium text-slate-800">
                Hash Maps and Sets · Remembering Previously Seen Values
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
