var expect = require('chai').expect;
var BasePolicy = require('../index');

describe('Multiple Instance', function() {
  var policy = BasePolicy.extend({
    init: function(arg) {
      this.arg = arg;
    },

    allowed: function(override) {
      if (!override) {
        return this.arg;
      }

      return override;
    }
  });

  var instance1;
  var instance2;

  beforeEach(function() {
    instance1 = policy.create(true);
    instance2 = policy.create(false);
  });

  it('has the correct behavior', function() {
    expect(instance1.allowed()).to.be.true;
    expect(instance2.allowed()).to.be.false;
  });

  it('allows overriding', function() {
    expect(instance2.allowed(true)).to.be.true;
  });
});
