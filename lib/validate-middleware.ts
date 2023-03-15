import type { NextApiRequest, NextApiResponse } from "next";

export default function validateMiddleware(
  validations: any,
  validationResult: any
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    await Promise.all(
      validations.map((validation: any) => validation.run(req))
    );
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return;
    }

    res.status(422).json({
      hasError: true,
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  };
}
