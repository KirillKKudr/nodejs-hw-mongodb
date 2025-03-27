import pkg from 'http-errors';
const { BadRequest } = pkg;

export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(BadRequest(error.details[0].message));
    } else {
      next();
    }
  };
};
