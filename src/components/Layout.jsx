function Layout({ children }) {
  return (
    <div className="min-h-screen flex justify-center px-4 py-6">
      <div className="w-full max-w-4xl">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Habiti</h1>
            <p className="text-sm text-zinc-400">
              Crea hábitos simples, construye cambios grandes.
            </p>
          </div>
        </header>

        <main className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-lg shadow-black/40">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
