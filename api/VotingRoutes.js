const express = require('express');
const { getUserFromToken } = require("./UserFunctions.js");
const Vote = require("./models/Vote.js");

const router = express.Router();

router.get('/vote/:commentId/:direction', (req, res) => {
  getUserFromToken(req.cookies.token)
    .then(userInfo => {

      // Removing existing votes
      Vote.deleteOne({ commentId: req.params.commentId, author: userInfo.username })
        .then(() => {

          if (['up', 'down'].indexOf(req.params.direction) === -1) {
            res.json(true);
            return;
          }

          // Creating new vote
          const vote = new Vote({
            author: userInfo.username,
            direction: req.params.direction === 'up' ? 1 : -1,
            commentId: req.params.commentId,
          });
          vote.save().then(() => {
            res.json(true);
          });

        });
    })
});

router.post('/votes', (req, res) => {
  const { commentsIds } = req.body;

  getUserFromToken(req.cookies.token).then(userInfo => {

    Vote.find({ commentId: { '$in': commentsIds } })
      .then(votes => {
        let commentsTotals = {};
        votes.forEach(vote => {
          if (typeof commentsTotals[vote.commentId] === 'undefined') {
            commentsTotals[vote.commentId] = 0;
          }
          commentsTotals[vote.commentId] += vote.direction;
        });

        let userVotes = {};
        votes.forEach(vote => {
          if (vote.author === userInfo.username) {
            userVotes[vote.commentId] = vote.direction;
          }
        });

        res.json({ commentsTotals, userVotes });
      });

  });

});

module.exports = router;
