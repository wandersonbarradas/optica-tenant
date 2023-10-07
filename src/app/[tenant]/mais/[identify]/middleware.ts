// pages/post/[pid]/middleware.ts
import { NextApiResponse, NextApiRequest } from "next";

export default function middleware(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader("Cache-Control", "no-store, max-age=0");
    // your server-side logic here
}
