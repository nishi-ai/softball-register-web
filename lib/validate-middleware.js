export default function validateMiddleware(validations, validationResult) {
  return async (req, res, next) => {
    console.log("validateMiddleware");
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res
      .status(422)
      .json({
        hasError: true,
        errorMessage: errors.array()[0].msg,
        validationErrors: errors.array(),
      });
  };
}
