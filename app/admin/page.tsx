// app/admin/page.tsx

'use client'

import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Título */}
      <h1 className="text-4xl font-bold mb-8 text-center md:text-left">
        Panel de Administración - ConnekFly
      </h1>

      {/* Saludo */}
      <div className="mb-12">
        <p className="text-2xl">
          ¡Bienvenido, Admin!
        </p>
        <p className="text-gray-400 mt-2">
          Aquí gestionas todo: CRM, alertas LIA, usuarios, etc.
        </p>
      </div>

      {/* Tarjetas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Alertas CRM */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition">
          <h2 className="text-xl font-semibold mb-4">Alertas CRM</h2>
          <p className="text-gray-400 mb-6">
            Cambios importantes detectados por LIA.
          </p>
          <Link 
            href="/crm/alerts"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg inline-block"
          >
            Ver Alertas →
          </Link>
        </div>

        {/* Contactos CRM */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition">
          <h2 className="text-xl font-semibold mb-4">Contactos CRM</h2>
          <p className="text-gray-400 mb-6">
            Gestiona leads y clientes.
          </p>
          <button 
            disabled
            className="bg-gray-700 text-gray-400 px-6 py-3 rounded-lg cursor-not-allowed"
          >
            Próximamente...
          </button>
        </div>

        {/* Logout */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-red-500 transition flex items-center justify-center">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  )
}