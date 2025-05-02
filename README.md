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
NEXT_PUBLIC_BASE_URL=
NEXTAUTH_URL=$NEXT_PUBLIC_BASE_URL # Do not modify
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
```

External service configuration instructions:
- GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET, see [OAuth Google](https://developers.google.com/identity/protocols/oauth2?hl=pt-br)
- STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET and STRIPE_PRICE_ID, see [Build a subscriptions integration](https://docs.stripe.com/billing/subscriptions/build-subscriptions?platform=web&ui=stripe-hosted#provision-and-monitor)
  - For this project, I used only three webhook events: **invoice.paid, invoice.payment_failed and customer.subscription.deleted**.
- AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY and AWS_REGION, see [The Complete Guide to AWS Identity and Access Management](https://www.datacamp.com/tutorial/aws-identity-and-access-management-iam-guide)

### 4. Start in development mode

```bash
yarn dev
# or
npm run dev
```

