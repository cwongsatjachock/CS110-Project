require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("./models/User.js");
const Comment = require("./models/Comment.js");
const VotingRoutes = require("./VotingRoutes.js");
const admin = require('./firebaseAdmin');

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors({
  origin: `http://localhost:3000`,
  credentials: true,
}));

app.use(VotingRoutes);

function getUserFromToken(token) {
  const userInfo = jwt.verify(token, process.env.SECRET);
  return User.findById(userInfo.id);
}

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true,useUnifiedTopology:true,}).then(() => {
  const db = mongoose.connection;
  db.on('error', console.log);
});

const authenticateFirebaseToken = async (req, res, next) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(403).send('Unauthorized');
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Attach user data to request object
    //console.log(req.user);
    next();
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    res.status(403).send('Unauthorized');
  }
};

app.get('/', (req, res) => {
  res.send('ok');
});

app.post('/register', (req, res) => {
  const {email,username} = req.body;
  const password = bcrypt.hashSync(req.body.password, 10);
  const user = new User({email,username,password});
  user.save().then(user => {
    jwt.sign({id:user._id}, process.env.SECRET, (err, token) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(201).cookie('token', token).send();
      }
    });
  }).catch(e => {
    console.log(e);
    res.sendStatus(500);
  });
});

app.get('/user', (req, res) => {
  const token = req.cookies.token;

  getUserFromToken(token)
    .then(user => {
      res.json({username:user.username});
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });

});

app.post('/login', (req, res) => {
  const {username, password} = req.body;
  User.findOne({username}).then(user => {
    if (user && user.username) {
      const passOk = bcrypt.compareSync(password, user.password);
      if (passOk) {
        jwt.sign({id:user._id}, process.env.SECRET, (err, token) => {
          res.cookie('token', token).send();
        });
      } else {
        res.status(422).json('Invalid username or password');
      }
    } else {
      res.status(422).json('Invalid username or password');
    }
  });
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').send();
});

app.get('/comments', (req, res) => {
  const search = req.query.search;
  const filters = search
    ? {
        $or: [
          { title: { $regex: '.*' + search + '.*', $options: 'i' } }
        ]
      }
    : { rootId: null };
  Comment.find(filters)
    .sort({ postedAt: -1 })
    .then(comments => {
      res.json(comments);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.get('/comments/root/:rootId', (req, res) => {
  Comment.find({rootId:req.params.rootId}).sort({postedAt: -1}).then(comments => {
    res.json(comments);
  });
});

app.get('/comments/:id', (req, res) => {
  Comment.findById(req.params.id).then(comment => {
    res.json(comment);
  });
});

app.post('/comments', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.sendStatus(401);
    return;
  }
  getUserFromToken(token)
    .then(userInfo => {
      const {title,body,parentId,rootId} = req.body;
      const comment = new Comment({
        title,
        body,
        author:userInfo.username,
        postedAt:new Date(),
        parentId,
        rootId,
      });
      comment.save().then(savedComment => {
        res.json(savedComment);
      }).catch(console.log);
    })
    .catch(() => {
      res.sendStatus(401);
    });
});

app.get('/profile', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  getUserFromToken(token)
    .then(user => {
      res.json({
        email: user.email,
        username: user.username,
      });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.put('/profile/username', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  const { newUsername } = req.body;

  getUserFromToken(token)
    .then(user => {
      user.username = newUsername;
      return user.save();
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

// Add this route to your Express server
app.get('/profile/view/:username', (req, res) => {
  const username = req.params.username;

  // Here you should fetch the user profile data from your database
  // For example:
  User.findOne({ username })
    .then(user => {
      if (!user) {
        // If user is not found, send 404
        res.status(404).send('User not found');
        return;
      }
      // If user is found, send the user profile data
      res.json({
        username: user.username,
        email: user.email
        // Add any other profile data you want to send
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
});


// New endpoint to fetch user's posts
app.get('/user/:username/posts', (req, res) => {
  const username = req.params.username;

  Comment.find({ author: username })
    .sort({ postedAt: -1 })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

// Route to handle Firebase token authentication
app.post('/authenticate', authenticateFirebaseToken, async (req, res) => {
  try {
    //console.log(req.user);
    const { name, uid, email } = req.user;
    console.log({ name, uid, email });
    
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      // User exists, authenticate the user
      const passOk = bcrypt.compareSync(uid, existingUser.password); // Assuming UID is stored as password
      if (passOk) {
        const token = jwt.sign({ id: existingUser._id }, process.env.SECRET);
        res.cookie('token', token).send();
      } else {
        res.status(422).json('Invalid username or password');
      }
    } else {
      // User doesn't exist, create a new user
      const password = bcrypt.hashSync(uid, 10); // Hash UID as password
      const username = name;
      
      const newUser = new User({ email, username, password });
      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.SECRET);
      res.cookie('token', token).send();
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/profile', authenticateFirebaseToken, (req, res) => {
  res.json({
    email: req.user.email,
    username: req.user.name, // Assuming the user object has a name field
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

