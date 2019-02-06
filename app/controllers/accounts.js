'use strict';
const User = require('../models/user');

const Accounts = {
  index: {
    auth: false,
    handler: function(request, h) {
      return h.view('main', { title: 'Welcome to Donations' });
    }
  },
  showSignup: {
    auth: false,
    handler: function(request, h) {
      return h.view('signup', { title: 'Sign up for Donations' });
    }
  },

  signup: {
    auth: false,
    handler: async function(request, h) {
      const payload = request.payload;
      const newUser = new User({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password
      });
      const user = await newUser.save();
      request.cookieAuth.set({ id: user.id });
      return h.redirect('/home');
    }
  },
  showLogin: {
    auth: false,
    handler: function(request, h) {
      return h.view('login', { title: 'Login to Donations' });
    }
  },

  login: {
    auth: false,
    handler: async function(request, h) {
      const { email, password } = request.payload;
      try {
        let user = await User.findByEmail(email);
        if (!user) {
          const message = 'Email address is not registered';
          throw new Boom(message);
        }
        user.comparePassword(password);
        request.cookieAuth.set({ id: user.id });
        return h.redirect('/home');
      } catch (err) {
        return h.view('login', { errors: [{ message: err.message }] });
      }
    }
  },

  logout: {
    handler: function(request, h) {
      request.cookieAuth.clear();
      return h.redirect('/');
    }
  },

  settings: {
    handler: function(request, h) {
      return h.view('settings', { title: 'Settings' });
    }
  },

  settingsUpdate: {
    handler: function(request, h) {
      this.users[user.firstName] = user;
      return h.view('/home',);
    }
  }
};

module.exports = Accounts;