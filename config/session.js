const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/login");
  }
};

const notLoggedIn = (req, res, next) => {
  if (!req.session.isAuth) {
    next();
  } else {
    res.redirect("/mymessages");
  }
};

module.exports = { isAuth, notLoggedIn };
