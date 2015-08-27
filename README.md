# Policy

Helper for a standardized form of Policy Object inspired by the
[Code Climate Blog](http://blog.codeclimate.com/blog/2012/10/17/7-ways-to-decompose-fat-activerecord-models/). Designed to be used in the Node environment.

## Usage

```js
var ActiveUserPolicy = BasePolicy.extend({
  allowed: function(user) {
    return user.emailConfirmed? && 
      user.lastLoggedInAt > moment().subtract(14, 'days');
  }
});

function emailAllowedUsers(users, policy) {
  users.forEach(function(user) {
    if (policy.allowed(user)) {
      sendEmail(user);
    }
  });
};

emailAllowedUsers(users, ActiveUserPolicy.create());

```

It can also work at the 'class' level:

```js
var ActiveUserPolicy = BasePolicy.extend({
  allowed: function(user) {
    return user.emailConfirmed? && 
      user.lastLoggedInAt > moment().subtract(14, 'days');
  }
});

ActiveUserPolicy.allowed(user) // => true or false

```

It also accepts arguments in the constructor:

```js
var ActiveUserPolicy = BasePolicy.extend({
  init: function(daysAgo) {
    this.daysAgo = daysAgo;
  },

  allowed: function(user) {
    return user.emailConfirmed? && 
      user.lastLoggedInAt > moment().subtract(this.daysAgo, 'days');
  }
});
```
