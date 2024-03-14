import { VercelRequest, VercelResponse } from "@vercel/node";
import { OAuthApp } from "@octokit/oauth-app";

export default async (_req: VercelRequest, res: VercelResponse) => {
  const app = new OAuthApp({
    clientType: "oauth-app",
    clientId: process.env.CLIENT_ID ?? "",
    clientSecret: process.env.CLIENT_SECRET ?? "",
  });

  const { url } = await app.getWebFlowAuthorizationUrl({
    scopes: [process.env.SCOPES ?? "public_repo"],
  });

  res.writeHead(302, { location: url });

  return res.end();
};
