# Next-Gallery readme

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/your-nextjs-product.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-nextjs-product
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### GitHub OAuth Setup

1. Visit [GitHub Developer Settings](https://github.com/settings/developers) and create a new OAuth App.
2. Set the "Authorization callback URL" to `http://localhost:3000/api/auth/callback/github`.
3. Obtain the **Client ID** and **Client Secret**.

### NextAuth.js Setup

1. Copy the `.env.local.example` file to `.env.local`:

   ```bash
   cp .env.local.example .env.local
   ```

2. Open the `.env.local` file and add your GitHub OAuth credentials:

   ```env
   GITHUB_ID=your-github-client-id
   GITHUB_SECRET=your-github-client-secret
   ```

## Running the Application

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` in your browser to see the application running.
