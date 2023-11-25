## Send-ence

### What It Does

'Send-ence' is a social networking service (SNS) that enables users to share short messages and collaboratively create stories with generative AI. Stories crafted by multiple users are recorded on the blockchain, ensuring security. Additionally, we have adopted account abstraction to simplify wallet creation and management for users.

### The Problem It Solves

Office workers in Marunouchi, Tokyo Station, belong to communities centered around 'work' defined by corporate boundaries, leading to limited external connections. To make TOKYO TORCH a gathering and connecting hub, we propose a service that fosters connections through creative activities.

### Technologies Used

- Frontend: React/Next.js
- Database: PostgreSQL (Vercel)
- Blockchain: Polygon
- Generative AI: OpenAI
- Web3 Services: web3auth, Alchemy Account Abstraction Kit, Ethereum Attestation Service

## Getting Started

```bash
# Install all dependencies
pnpm install

# Run development server
pnpm dev
```

## Environment Info

This app interacts with Polygon Mumbai chain and several off-chain services. Please create a .env file and include the following information:

```bash
# OpenAI
NEXT_PUBLIC_OPENAI_API_KEY=<Your OpenAI API Key>

# EOA
NEXT_PUBLIC_EOA_PRIVATE_KEY=<Your EOA Private Key>

# AA by Alchemy
NEXT_PUBLIC_GAS_MANAGER_POLICY_ID_MUMBAI=<Your Alchemy Gas Manager Policy ID>

# Alchemy
NEXT_PUBLIC_ALCHEMY_API_KEY_MUMBAI=<Your Alchemy API Key>

# Web3Auth
NEXT_PUBLIC_WEB3AUTH_CLIENT_ID_MUMBAI=<Your Web3Auth Client ID>
```

Additionally, this app utilizes Vercel PostgreSQL. Therefore, you need to include the following information in your .env file to connect to this database:

```bash
# Vercel PostgreSQL
POSTGRES_DATABASE="verceldb"
POSTGRES_HOST=<Your DB host name>
POSTGRES_PASSWORD=<Your DB password>
POSTGRES_URL=<Your DB URLe>
```

### Other available commands

```bash
# Format codes
pnpm format
```