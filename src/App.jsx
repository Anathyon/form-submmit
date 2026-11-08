import React, { useState, useEffect } from 'react'
import { Mail, Settings, BookOpen, Send, Sparkles } from 'lucide-react'
import EmailForm from './components/EmailForm'
import ConfigTab from './components/ConfigTab'
import StepByStepGuide from './components/StepByStepGuide'

export default function App() {
  const [activeTab, setActiveTab] = useState('sender') // 'sender' | 'config' | 'guide'

  // Carrega credenciais do localStorage ou das variáveis de ambiente .env
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('emailjs_config')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Falha ao analisar credenciais salvas:', e)
      }
    }
    return {
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
    }
  })

  const handleSaveConfig = (newConfig) => {
    setConfig(newConfig)
    localStorage.setItem('emailjs_config', JSON.stringify(newConfig))
  }

  const isConfigured = Boolean(config.serviceId && config.templateId && config.publicKey)

  return (
    <div className="app-container">
      <header>
        <div className="badge">
          <Sparkles size={16} />
          <span>Vite + React + EmailJS</span>
        </div>
        <h1>Disparador de E-mail</h1>
        <p>
          Configure e estilize seu template completo no painel do provedor de e-mail e envie com apenas um clique aqui!
        </p>
      </header>

      <div className="card">
        {/* Navegação entre as abas */}
        <nav className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'sender' ? 'active' : ''}`}
            onClick={() => setActiveTab('sender')}
          >
            <Send size={18} />
            <span>Disparar E-mail</span>
          </button>

          <button
            className={`nav-tab ${activeTab === 'guide' ? 'active' : ''}`}
            onClick={() => setActiveTab('guide')}
          >
            <BookOpen size={18} />
            <span>Como Configurar no EmailJS</span>
          </button>

          <button
            className={`nav-tab ${activeTab === 'config' ? 'active' : ''}`}
            onClick={() => setActiveTab('config')}
          >
            <Settings size={18} />
            <span>Configurações {!isConfigured && '⚠️'}</span>
          </button>
        </nav>

        {/* Conteúdo da aba selecionada */}
        {activeTab === 'sender' && (
          <EmailForm
            config={config}
            onNavigateToConfig={() => setActiveTab('config')}
          />
        )}

        {activeTab === 'guide' && (
          <StepByStepGuide />
        )}

        {activeTab === 'config' && (
          <ConfigTab
            config={config}
            onSaveConfig={handleSaveConfig}
          />
        )}
      </div>

      <footer style={{ textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
        Projeto Vite + React construído com <a href="https://www.emailjs.com/" target="_blank" rel="noreferrer" style={{ color: '#38bdf8', textDecoration: 'none' }}>EmailJS</a>.
      </footer>
    </div>
  )
}

