import { VercelRequest, VercelResponse } from "@vercel/node";
import { OAuthApp } from "@octokit/oauth-app";

export default async (req: VercelRequest, res: VercelResponse) => {
  const app = new OAuthApp({
    clientType: "oauth-app",
    clientId: process.env.CLIENT_ID ?? "",
    clientSecret: process.env.CLIENT_SECRET ?? "",
  });

  const {
    authentication: { token },
  } = await app.createToken({
    code: req.query.code as string,
  });

  res.writeHead(302, {
    location: `https://${process.env.EXTENSION_ID}.chromiumapp.org?token=${token}`,
  });

  return res.end();
};
