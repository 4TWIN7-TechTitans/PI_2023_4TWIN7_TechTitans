const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/signup', userController.signup_post);
router.post('/login', userController.login_post);
router.get('/logout', userController.logout_get);

const EMAIL_SECRET = 'asdf1093KMnzxcvnkljvasdu09123nlasdasdf';
router.get('/confirmation/:token', async (req, res) => {
    try {
      const { user: { id } } = jwt.verify(req.params.token, EMAIL_SECRET);
      await models.User.update({ confirmed: true }, { where: { id } });
      
    } catch (e) {
      return res.redirect("/login");
    }
    return res.redirect("error");
  });



module.exports = router;