import React, { useState } from 'react'
import { Save, Check, RefreshCw, Key, ShieldCheck, Info } from 'lucide-react'

export default function ConfigTab({ config, onSaveConfig }) {
  const [formData, setFormData] = useState({
    serviceId: config.serviceId || '',
    templateId: config.templateId || '',
    publicKey: config.publicKey || '',
  })
  const [savedAlert, setSavedAlert] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value.trim() }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSaveConfig(formData)
    setSavedAlert(true)
    setTimeout(() => setSavedAlert(false), 3000)
  }

  const handleReset = () => {
    const resetValues = {
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
    }
    setFormData(resetValues)
    onSaveConfig(resetValues)
  }

  const isConfigured = Boolean(formData.serviceId && formData.templateId && formData.publicKey)

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.4rem', color: '#f8fafc' }}>
          Configurações do EmailJS
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.925rem' }}>
          Insira suas credenciais abaixo. Elas serão salvas no seu navegador para uso imediato sem precisar reiniciar o servidor.
        </p>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.9rem 1.1rem',
        borderRadius: '0.75rem',
        marginBottom: '1.5rem',
        backgroundColor: isConfigured ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
        border: `1px solid ${isConfigured ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
        color: isConfigured ? '#34d399' : '#fbbf24'
      }}>
        {isConfigured ? <ShieldCheck size={22} /> : <Info size={22} />}
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
            {isConfigured ? 'Credenciais Prontas para Envio!' : 'Credenciais Pendentes'}
          </div>
          <div style={{ fontSize: '0.825rem', opacity: 0.9 }}>
            {isConfigured 
              ? 'O formulário de disparo está conectado e pronto para enviar mensagens.'
              : 'Preencha os campos abaixo com os dados da sua conta no painel do EmailJS.'}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="serviceId">
            <span>Service ID</span>
            <span className="hint">Ex: service_xxxxx</span>
          </label>
          <input
            id="serviceId"
            name="serviceId"
            type="text"
            placeholder="service_..."
            value={formData.serviceId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="templateId">
            <span>Template ID</span>
            <span className="hint">Ex: template_xxxxx</span>
          </label>
          <input
            id="templateId"
            name="templateId"
            type="text"
            placeholder="template_..."
            value={formData.templateId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="publicKey">
            <span>Public Key (User ID)</span>
            <span className="hint">Ex: xxxxx_xxxxxxxxxxxx</span>
          </label>
          <input
            id="publicKey"
            name="publicKey"
            type="text"
            placeholder="Sua chave pública..."
            value={formData.publicKey}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button type="submit" className="btn-submit" style={{ marginTop: 0 }}>
            {savedAlert ? <Check size={18} /> : <Save size={18} />}
            {savedAlert ? 'Salvo com sucesso!' : 'Salvar Credenciais'}
          </button>

          <button
            type="button"
            onClick={handleReset}
            style={{
              padding: '0 1.25rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--card-border)',
              borderRadius: '0.75rem',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.9rem',
              fontWeight: 500
            }}
            title="Recarregar valores do .env"
          >
            <RefreshCw size={16} />
            Resetar
          </button>
        </div>
      </form>
    </div>
  )
}

