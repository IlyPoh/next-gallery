namespace NodeJS {
  interface ProcessEnv {
    ITEMS_PER_PAGE: number;

    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;

    GITHUB_ID: string;
    GITHUB_SECRET: string;

    MONGODB_URI: string;
  }
}
