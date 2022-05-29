const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (req.method === "PUT" && !req._body) {
      error.message = "missing fields of body";
    }

    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
};

module.exports = validation;
