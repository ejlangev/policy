var _ = require('lodash');

Base = {
  init: function() {},

  allowed: function() {
    throw new Error('Must define allowed yourself');
  },
}

module.exports = {
  extend: function(data) {
    if (!data.allowed) {
      throw new Error('You must provide an allowed key');
    }

    var klass = _.create(Base)

    var allowed = function() {
      var obj = create();

      return obj.allowed.apply(obj, arguments);
    };

    var create = function() {
      var obj = _.create(_.extend(klass, data));
      obj.init.apply(obj, arguments);

      return obj;
    };

    return {
      create: create,
      allowed: allowed
    };
  }
};
