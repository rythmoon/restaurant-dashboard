// En la sección de Navigation Tabs, reemplaza con:
<div className="mb-8">
  <div className="glass-card rounded-2xl p-2 w-fit mx-auto">
    <nav className="flex space-x-1">
      {[
        { id: 'reception', name: '🎯 Recepción', icon: 'Phone' },
        { id: 'dashboard', name: '📊 Dashboard', icon: 'Layout' },
        { id: 'orders', name: '📋 Órdenes', icon: 'Clipboard' },
        { id: 'menu', name: '🍽️ Menú', icon: 'BookOpen' },
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
            activeTab === tab.id
              ? 'warm-gradient text-white shadow-medium'
              : 'text-warm-600 hover:text-primary-600 hover:bg-white/50'
          }`}
        >
          {tab.name}
        </button>
      ))}
    </nav>
  </div>
</div>
