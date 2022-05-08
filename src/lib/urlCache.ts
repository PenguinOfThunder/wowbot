import fetch from "node-fetch";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import stream from "node:stream";

export const hashName = (name: string) =>
  "wowbot-" + crypto.createHash("sha256").update(name).digest("base64url");

export const fetchContent = async (url: string): Promise<fs.ReadStream> => {
  const fileName = path.join(os.tmpdir(), hashName(url));
  if (!fs.existsSync(fileName)) {
    // fetch and save to cache
    // console.log(`Downloading clip from ${url} to ${fileName}`);
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const outs = await fs.promises.open(fileName, "w", 0o600);
    await stream.promises.pipeline(res.body, outs.createWriteStream());
  }
  // return from file cache
  //   console.log(`Streaming clip from ${fileName}`);
  return fs.createReadStream(fileName);
};
