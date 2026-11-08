# Disparador de E-mail com Vite, React e EmailJS

Este projeto foi construído para permitir o envio de e-mails diretamente de uma aplicação frontend em **React (Vite)**, utilizando o **EmailJS** como serviço terceiro para criar, estilizar e configurar 100% do layout do e-mail no painel deles (WYSIWYG ou HTML/CSS), bastando acionar o botão de submit na aplicação para disparar.

---

## 🚀 Como Executar o Projeto

1. Instale as dependências (já instaladas):
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Abra no navegador (por padrão em `http://localhost:5173`).

---

## ⚙️ Como Funciona o Serviço Terceiro (EmailJS)

O **EmailJS** resolve exatamente o que você pediu:
- **Você escreve e estiliza o e-mail no painel do EmailJS:** você pode usar o editor visual deles ou colar seu próprio código HTML/CSS estilizado, colocar logos, cores, botões e imagens.
- **Variáveis dinâmicas:** no corpo e no assunto do e-mail lá no EmailJS, você insere tags como `{{to_name}}`, `{{to_email}}`, `{{subject}}`, `{{message}}` ou qualquer variável extra.
- **No React:** a aplicação envia esses valores para a API pública do EmailJS quando o botão de submit é pressionado. O EmailJS injeta as variáveis no seu template estilizado e faz a entrega.

---

## 🔑 Configuração das Credenciais

Você pode configurar as chaves de duas formas:
1. **Pela interface da aplicação:** vá na aba **Configurações** e cole seu `Service ID`, `Template ID` e `Public Key` (elas ficam salvas no `localStorage`).
2. **Via `.env`:** copie `.env.example` para `.env` e defina:
   ```env
   VITE_EMAILJS_SERVICE_ID=seu_service_id
   VITE_EMAILJS_TEMPLATE_ID=seu_template_id
   VITE_EMAILJS_PUBLIC_KEY=sua_public_key
   ```

### Passo a Passo no EmailJS:
1. Cadastre-se gratuitamente em [emailjs.com](https://www.emailjs.com/).
2. Em **Email Services**, adicione seu provedor (Gmail, Outlook, etc.) e copie o **Service ID**.
3. Em **Email Templates**, crie e estilize seu template. No campo **To Email**, coloque `{{to_email}}`. Salve e copie o **Template ID**.
4. Em **Account** > **API Keys**, copie a sua **Public Key**.

