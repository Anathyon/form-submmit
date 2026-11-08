import React from 'react'
import { ExternalLink, CheckCircle2, Palette, Sparkles, KeyRound } from 'lucide-react'

export default function StepByStepGuide() {
  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.4rem', color: '#f8fafc' }}>
          Como funciona a integração com o EmailJS
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
          O <strong>EmailJS</strong> permite que você crie, estilize e formate todo o layout do seu e-mail diretamente no painel deles (usando editor visual ou HTML próprio com CSS), e aqui no React você só precisa enviar os dados dinâmicos e apertar o botão!
        </p>
      </div>

      <div className="guide-step">
        <div className="step-num">1</div>
        <div className="step-content">
          <h3>Crie uma conta gratuita no EmailJS</h3>
          <p>
            Acesse o site oficial e crie sua conta gratuita (permite até 200 e-mails por mês no plano free).
          </p>
          <a
            href="https://dashboard.emailjs.com/sign-up"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#38bdf8',
              fontSize: '0.875rem',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            Abrir EmailJS Dashboard <ExternalLink size={14} />
          </a>
        </div>
      </div>

      <div className="guide-step">
        <div className="step-num">2</div>
        <div className="step-content">
          <h3>Conecte seu serviço de e-mail (Email Services)</h3>
          <p>
            No menu lateral esquerdo, vá em <strong>Email Services</strong> &gt; <strong>Add New Service</strong>.
            Escolha seu provedor (ex: <strong>Gmail</strong>, <strong>Outlook</strong>, <strong>Yahoo</strong> ou SMTP customizado).
          </p>
          <p>
            Após conectar, você receberá o seu <span className="code-snippet">Service ID</span> (ex: <code>service_abc123</code>).
          </p>
        </div>
      </div>

      <div className="guide-step">
        <div className="step-num">3</div>
        <div className="step-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Palette size={20} color="#a5b4fc" />
            <h3>Crie e estilize o e-mail no painel deles</h3>
          </div>
          <p>
            No menu lateral, vá em <strong>Email Templates</strong> &gt; <strong>Create New Template</strong>.
          </p>
          <p>
            Aqui você pode:
          </p>
          <ul style={{ paddingLeft: '1.25rem', color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.75rem', lineHeight: '1.6' }}>
            <li>Personalizar o <strong>Assunto</strong> (Subject)</li>
            <li>Escrever e formatar o corpo do e-mail com editor visual ou código HTML completo com CSS inline, logotipo da sua empresa, botões, rodapé, etc.</li>
            <li>
              Inserir variáveis que serão substituídas pelos valores enviados pelo nosso formulário:
            </li>
          </ul>

          <div className="custom-vars-grid">
            <div className="var-tag">
              <strong>{`{{to_name}}`}</strong>
              <span>Nome do destinatário</span>
            </div>
            <div className="var-tag">
              <strong>{`{{to_email}}`}</strong>
              <span>E-mail de destino (To Email)</span>
            </div>
            <div className="var-tag">
              <strong>{`{{message}}`}</strong>
              <span>Mensagem ou corpo dinâmico</span>
            </div>
            <div className="var-tag">
              <strong>{`{{subject}}`}</strong>
              <span>Assunto customizado</span>
            </div>
          </div>
          <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#a5b4fc' }}>
            💡 Dica: no campo <strong>To Email</strong> das configurações do template no EmailJS, defina como <code>{`{{to_email}}`}</code> para que o e-mail vá para quem você preencher no formulário!
          </p>
        </div>
      </div>

      <div className="guide-step">
        <div className="step-num">4</div>
        <div className="step-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <KeyRound size={20} color="#38bdf8" />
            <h3>Pegue suas credenciais e configure aqui</h3>
          </div>
          <p>
            Você precisará de 3 chaves:
          </p>
          <ul style={{ paddingLeft: '1.25rem', color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.75rem', lineHeight: '1.6' }}>
            <li><strong>Service ID:</strong> na aba <i>Email Services</i></li>
            <li><strong>Template ID:</strong> na aba <i>Email Templates</i> &gt; <i>Settings</i> do template</li>
            <li><strong>Public Key:</strong> na aba <i>Account</i> &gt; <i>General</i> &gt; <i>API Keys</i></li>
          </ul>
          <p>
            Você pode colocá-las no arquivo <span className="code-snippet">.env</span> ou preenchê-las diretamente na aba <strong>Configurações</strong> acima!
          </p>
        </div>
      </div>
    </div>
  )
}

