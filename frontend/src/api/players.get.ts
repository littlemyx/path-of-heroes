// frontend/src/api/players.get.ts
import type http from "node:http";

const API_BASE_URL = process.env.SERVER_API_BASE_URL ?? "http://127.0.0.1:3000";

const buildTargetUrl = (req: http.IncomingMessage) => {
  const url = new URL(req.url ?? "", "http://localhost");
  return `${API_BASE_URL}/api/players${url.search}`;
};

export default async (req: http.IncomingMessage, res: http.ServerResponse) => {
  if (req.method && req.method.toUpperCase() !== "GET") {
    res.writeHead(405, "Method Not Allowed");
    res.end(JSON.stringify({ error: "Only GET supported" }));
    return;
  }

  try {
    const targetUrl = buildTargetUrl(req);
    console.log("Proxying request to:", targetUrl);
    const upstream = await fetch(targetUrl, {
      headers: {
        accept: "application/json",
        authorization: req.headers.authorization ?? ""
      }
    });

    const payload = await upstream.text();
    res.writeHead(upstream.status, upstream.statusText, {
      "Content-Type": upstream.headers.get("content-type") ?? "application/json"
    });
    res.end(payload);
  } catch (error) {
    res.writeHead(502, "Bad Gateway", {
      "Content-Type": "application/json"
    });
    res.end(
      JSON.stringify({
        error: "Failed to load players",
        details: error instanceof Error ? error.message : String(error)
      })
    );
  }
};
