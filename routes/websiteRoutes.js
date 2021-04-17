const homePage = (req, res) => {
  res.render('pages/index', { data: 'working' });
};

module.exports = {
  homePage,
};
