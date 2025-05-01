# ✝️📖 litur-diaria

**Litur-Diaria** is a web app built with [Next.js](https://nextjs.org/) that delivers the **daily Catholic liturgy** along with an **AI-generated reflection** directly to subscribers' emails.

## ✨ Features

- 📖 **Automatically fetches** daily liturgical texts from [Canção Nova](https://liturgia.cancaonova.com/pb/)
- 🤖 **AI-generated meditation** based on the day’s liturgical texts
- 📬 **Automatically sends emails** to subscribed users
- ⏰ **Scheduled to run daily** at 6am (via serverless functions)

## 🛠️ Techs

- [Next.js](https://nextjs.org/) for front-end and some serverless api endpoints
- [OpenAI GPT](https://platform.openai.com/) for meditations generation
- [Mailtrap](https://mailtrap.io/) for email delivery
- [AWS Lambda](https://aws.amazon.com/pt/lambda/) for serverless function

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/litur-diaria.git
cd litur-diaria
```

### 2. Install dependencies

```bash
yarn install
# or
npm install
```

### 3. Set up environment variables

Create a `.env.local` file with the following:

```env
GPT_API_KEY=your_openai_key
EMAIL_HOST=smtp.example.com
EMAIL_USER=your@email.com
EMAIL_PASS=your_password
EMAIL_FROM="Litur Diaria <noreply@example.com>"
```

### 4. Start in development mode

```bash
yarn dev
# or
npm run dev
```

