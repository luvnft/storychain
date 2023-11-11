## Getting Started

```bash
# Install all dependencies
pnpm install

# Run development server
pnpm dev
```

## Environment Info
This app interacts with Polygon Mumbai chain and several off-chain services. Please create .env files and include the following information:

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

### Other commands

```bash
# Format codes
pnpm format
```