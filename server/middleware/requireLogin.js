const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('User');
//const router = require('../routes/user')

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // authorization === Bearer ewefwegwrherhe
  if (!authorization) {
    return res.status(401).json({ error: 'you must be logged in' });
  }
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: 'you must be logged in' });
    }
    const { _id } = payload;
    User.findById(_id).then(
      (userdata) => {
        req.user = userdata;
        next();
      },
      { new: true },
      (err, (reslut) => {})
    );
  });
};

// router.put('follow', requireLogin,(req,res) => {
//   User.findByIdAndUpdate(req.body.followId, {
//     $push: {followers: req.user._id}

//   }, {
//     new: true
//   }, (err, result) => {
//     if (err) {
//       return res.status(422).json({error: err})
//     }
//     User.findByIdAndUpdate(req.user._id, {
//       $push: {following: req.body.followId}
//     }, {new:true}).then(result => {
//       res.json(result)
//     }).catch(err => {
//       return res.status(422).json({error: err})
//     })
//   }
//   )
// })

// router.put('unfollow', requireLogin,(req,res) => {
//   User.findByIdAndUpdate(req.body.unfollowId, {
//     $pull: {followers: req.user._id}

//   }, {
//     new: true
//   }, (err, result) => {
//     if (err) {
//       return res.status(422).json({error: err})
//     }
//     User.findByIdAndUpdate(req.user._id, {
//       $pull: {following: req.body.unfollowId}
//     }, {new:true}).then(result => {
//       res.json(result)
//     }).catch(err => {
//       return res.status(422).json({error: err})
//     })
//   }
//   )
// })
