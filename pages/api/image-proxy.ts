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
  try {
    const response = await axios.get(url, {
      responseType: "stream",
      headers: {
        Referer: "https://www.bilibili.com",
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
