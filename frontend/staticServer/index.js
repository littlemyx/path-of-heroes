import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { handler } from "../.stormkit/server/server.mjs";

const app = express();
const distUrl = new URL("../.stormkit/server/", import.meta.url);
const distDir = fileURLToPath(distUrl);
const publicUrl = new URL("../.stormkit/public/", import.meta.url);
const publicDir = fileURLToPath(publicUrl);

app.use("/assets", express.static(path.join(publicDir, "assets")));
app.get("/logo.svg", (req, res) => {
  res.sendFile(path.join(distDir, "logo.svg"));
});

const toLambdaEvent = async req => {
  if (req.method === "GET" || req.method === "HEAD") {
    return {
      url: req.originalUrl || req.url,
      method: req.method,
      headers: req.headers,
      remoteAddress: req.socket.remoteAddress,
      remotePort: req.socket.remotePort
    };
  }

  const chunks = [];
  await new Promise((resolve, reject) => {
    req.on("data", chunk => chunks.push(chunk));
    req.on("end", resolve);
    req.on("error", reject);
  });

  return {
    url: req.originalUrl || req.url,
    method: req.method,
    headers: req.headers,
    remoteAddress: req.socket.remoteAddress,
    remotePort: req.socket.remotePort,
    body: Buffer.concat(chunks).toString()
  };
};

app.use(async (req, res, next) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    next();
    return;
  }

  try {
    const event = await toLambdaEvent(req);
    await new Promise((resolve, reject) => {
      handler(event, {}, (err, result) => {
        if (err) {
          reject(err instanceof Error ? err : new Error(String(err)));
          return;
        }

        if (!result) {
          next();
          resolve();
          return;
        }

        const status = result.status || 200;
        const headers = result.headers || {};
        Object.entries(headers).forEach(([key, value]) => {
          if (typeof value !== "undefined") {
            res.setHeader(key, Array.isArray(value) ? value.join(",") : value);
          }
        });

        const body = result.buffer
          ? Buffer.from(result.buffer, "base64")
          : result.body
          ? Buffer.isBuffer(result.body)
            ? result.body
            : Buffer.from(String(result.body))
          : undefined;

        res.status(status);
        if (body) {
          res.send(body);
        } else {
          res.end();
        }

        resolve();
      });
    });
  } catch (error) {
    next(error);
  }
});

app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
