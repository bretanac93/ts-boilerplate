import { Request, Response } from "express";

export default [
  {
    path: "/api/v1",
    method: "get",
    handler: [
      async ({ query }: Request, res: Response) => {
        res.send({
          data: query.name ? `Hi ${query.name}!` : "Hello stranger",
        });
      },
    ],
  },
];
