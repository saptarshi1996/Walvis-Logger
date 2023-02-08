module.exports = (req, res, next) => {
  const {
    protocol,
    method,
    headers: {
      host,
    }
  } = req;
  const path = req.originalUrl;

  const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  console.log(`${datetime} | ${protocol}://${host}${path} | ${method}`);

  next();
};
