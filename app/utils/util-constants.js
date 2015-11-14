module.exports = {
  INTERNAL_HOST: (process.env.NODE_ENV === 'production') ? 'onpitch.herokuapp.com' : 'localhost',
  INTERNAL_PORT: (process.env.NODE_ENV === 'production') ? '' : (process.env.PORT || 5050),

  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST'
};
