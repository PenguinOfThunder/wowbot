import { fetch } from "undici";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Readable } from "node:stream";
/**
 * Create a base64-encoded sha256 hash of the name with "wowbot-" prefixed.
 * @param name name to digest
 * @returns The hashed and prefixed name
 */
export const hashName = (name: string): string =>
  "wowbot-" + crypto.createHash("sha256").update(name).digest("base64url");

/**
 * Look for a cached version of the url and if found, return a stream to it.
 * If not found, fetch it and save it to the file, then return a stream to the file.
 * @param url url to fetch
 * @returns a stream of the content, read from the cache file
 */
export const fetchContent = async (url: string): Promise<fs.ReadStream> => {
  const fileName = path.join(os.tmpdir(), hashName(url));
  if (!fs.existsSync(fileName)) {
    // fetch and save to cache
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    if (res.body === null) {
      throw new Error("null body in response");
    }
    const src = Readable.fromWeb(res.body);
    await fs.promises.writeFile(fileName, src);
  }
  // return from file cache
  return fs.createReadStream(fileName);
};
