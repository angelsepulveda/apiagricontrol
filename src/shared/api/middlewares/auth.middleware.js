const { JwtService } = require('../services');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: req.t('notAuthorized') });
  } else {
    const token = req.headers.authorization.split(' ')[1];
    const jwt = new JwtService();

    const decode = jwt.validate(token);

    if (decode === null) {
      res.status(401).json({ message: req.t('token') });
    } else {
      req.user = decode.data;
      next();
    }
  }
};
