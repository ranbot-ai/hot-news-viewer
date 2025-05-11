import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;
  if (!url || typeof url !== "string") {
    res.status(400).send("Missing url parameter");
    return;
  }
  const IMAGE_PROXY_REFERER = process.env.IMAGE_PROXY_REFERER;
  if (!IMAGE_PROXY_REFERER) {
    throw new Error(
      "Missing required IMAGE_PROXY_REFERER environment variable."
    );
  }
  try {
    const response = await axios.get(url, {
      responseType: "stream",
      headers: {
        Referer: IMAGE_PROXY_REFERER,
        "User-Agent": "Mozilla/5.0",
      },
    });
    res.setHeader(
      "Content-Type",
      response.headers["content-type"] || "image/jpeg"
    );
    response.data.pipe(res);
  } catch (err) {
    res.status(500).send("Failed to fetch image");
  }
}
