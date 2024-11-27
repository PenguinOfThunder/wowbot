import type { Response } from "undici";

export class WowApiError extends Error {
  public url?: string;
  public status: number;
  public statusText: string;

  constructor(message: string, response: Response) {
    const msg = `${message}\nHTTP ${response.status} ${response.statusText}`;
    super(msg);
    this.status = response.status;
    this.statusText = response.statusText;
    this.url = response.url;
  }
}
