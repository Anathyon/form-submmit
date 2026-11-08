import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles, Plus, Trash2, Sliders } from 'lucide-react'

export default function EmailForm({ config, onNavigateToConfig }) {
  const [formData, setFormData] = useState({
    to_name: '',
    to_email: '',
    subject: 'Proposta personalizada para você',
    message: 'Olá! Este é um e-mail de teste enviado diretamente da aplicação React, utilizando todo o layout, estilo e formatação que configuramos no EmailJS.',
  })

  // Permite adicionar campos/variáveis extras dinâmicas para enviar ao template
  const [customFields, setCustomFields] = useState([
    { key: 'empresa', value: 'Minha Empresa Tech' },
  ])
  const [showAdvanced, setShowAdvanced] = useState(false)

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null) // { type: 'success' | 'error', message: '', details?: any }

  const isConfigured = Boolean(config.serviceId && config.templateId && config.publicKey)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCustomFieldChange = (index, field, val) => {
    setCustomFields(prev => {
      const updated = [...prev]
      updated[index][field] = val
      return updated
    })
  }

  const addCustomField = () => {
    setCustomFields(prev => [...prev, { key: '', value: '' }])
  }

  const removeCustomField = (index) => {
    setCustomFields(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isConfigured) {
      setStatus({
        type: 'error',
        message: 'Credenciais do EmailJS não configuradas. Vá para a aba "Configurações" ou preencha o arquivo .env.'
      })
      return
    }

    setLoading(true)
    setStatus(null)

    // Monta o payload com todos os campos básicos e dinâmicos
    const templateParams = {
      to_name: formData.to_name,
      to_email: formData.to_email,
      subject: formData.subject,
      message: formData.message,
      sent_time: new Date().toLocaleString('pt-BR'),
    }

    // Adiciona as variáveis personalizadas extras
    customFields.forEach(field => {
      if (field.key.trim()) {
        templateParams[field.key.trim()] = field.value
      }
    })

    try {
      const response = await emailjs.send(
        config.serviceId,
        config.templateId,
        templateParams,
        config.publicKey
      )

      setStatus({
        type: 'success',
        message: `E-mail enviado com sucesso para ${formData.to_email}! O template foi processado pelo EmailJS.`,
        details: `Código de status: ${response.status} - Texto: ${response.text}`
      })
    } catch (err) {
      console.error('Falha ao enviar e-mail via EmailJS:', err)
      let errorMsg = 'Não foi possível enviar o e-mail.'
      if (err?.text) {
        errorMsg += ` Detalhes: ${err.text}`
      } else if (err?.message) {
        errorMsg += ` Detalhes: ${err.message}`
      }
      setStatus({
        type: 'error',
        message: errorMsg,
        details: 'Verifique se o Service ID, Template ID e Public Key estão corretos e se o template existe na sua conta EmailJS.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {!isConfigured && (
        <div className="quick-config-banner">
          <div>
            <strong>Credenciais ausentes:</strong> configure o Service ID, Template ID e Public Key para disparar.
          </div>
          <button type="button" onClick={onNavigateToConfig}>
            Configurar agora
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="to_name">
              <span>Nome do Destinatário</span>
              <span className="hint">variável: {`{{to_name}}`}</span>
            </label>
            <input
              id="to_name"
              name="to_name"
              type="text"
              placeholder="Ex: Carlos Silva"
              value={formData.to_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="to_email">
              <span>E-mail do Destinatário</span>
              <span className="hint">variável: {`{{to_email}}`}</span>
            </label>
            <input
              id="to_email"
              name="to_email"
              type="email"
              placeholder="exemplo@gmail.com"
              value={formData.to_email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="subject">
            <span>Assunto do E-mail</span>
            <span className="hint">variável: {`{{subject}}`}</span>
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="Assunto da mensagem"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">
            <span>Mensagem / Conteúdo Dinâmico</span>
            <span className="hint">variável: {`{{message}}`}</span>
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Escreva a mensagem personalizada que será inserida no template estilizado..."
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        {/* Variáveis Extras Opcionais */}
        <div style={{ marginBottom: '1.25rem' }}>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            style={{
              background: 'none',
              border: 'none',
              color: '#38bdf8',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.25rem 0',
              fontWeight: 500
            }}
          >
            <Sliders size={14} />
            {showAdvanced ? 'Ocultar variáveis adicionais' : 'Adicionar variáveis extras para o template (opcional)'}
          </button>

          {showAdvanced && (
            <div style={{
              marginTop: '0.75rem',
              padding: '1rem',
              background: 'rgba(15, 23, 42, 0.4)',
              borderRadius: '0.75rem',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
                Você pode passar qualquer parâmetro extra que tenha colocado no seu template do EmailJS como {`{{nome_da_variavel}}`}.
              </p>
              
              {customFields.map((field, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder="Chave (ex: empresa)"
                    value={field.key}
                    onChange={(e) => handleCustomFieldChange(idx, 'key', e.target.value)}
                    style={{ flex: 1, padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                  />
                  <input
                    type="text"
                    placeholder="Valor (ex: Acmee Inc)"
                    value={field.value}
                    onChange={(e) => handleCustomFieldChange(idx, 'value', e.target.value)}
                    style={{ flex: 1.5, padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => removeCustomField(idx)}
                    style={{
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      color: '#f87171',
                      borderRadius: '0.5rem',
                      padding: '0 0.6rem',
                      cursor: 'pointer'
                    }}
                    title="Remover variável"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addCustomField}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px dashed rgba(255, 255, 255, 0.2)',
                  color: '#e2e8f0',
                  borderRadius: '0.5rem',
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  marginTop: '0.5rem'
                }}
              >
                <Plus size={14} /> Adicionar Variável
              </button>
            </div>
          )}
        </div>

        {/* Botão de Disparo / Submit */}
        <button
          type="submit"
          className="btn-submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="spinner" size={20} />
              Enviando e-mail...
            </>
          ) : (
            <>
              <Send size={20} />
              Enviar E-mail Personalizado
            </>
          )}
        </button>
      </form>

      {/* Caixa de Notificação de Status */}
      {status && (
        <div className={`status-box ${status.type}`}>
          {status.type === 'success' ? (
            <CheckCircle2 size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
          ) : (
            <AlertCircle size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
          )}
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{status.message}</div>
            {status.details && (
              <div style={{ fontSize: '0.825rem', marginTop: '0.35rem', opacity: 0.85 }}>
                {status.details}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

