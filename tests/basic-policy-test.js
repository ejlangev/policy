var expect = require('chai').expect;
var BasePolicy = require('../index');

describe('Basic Policy', function() {
  var instance;
  var initCalled;
  var policy = BasePolicy.extend({
    init: function() {
      initCalled = true;
    },
    allowed: function(valid) {
      return valid;
    }
  });

  beforeEach(function() {
    initCalled = false;
  });

  it('returns what you pass in', function() {
    instance = policy.create();
    expect(instance.allowed(true)).to.be.true;
    expect(instance.allowed(false)).to.be.false;
  });

  it('calls the constructor', function() {
    instance = policy.create();
    expect(initCalled).to.be.true;
  });

  context('Constructor Arguments', function() {
    policy2 = BasePolicy.extend({
      init: function(arg) {
        this.arg = arg;
      },
      allowed: function() {
        return this.arg;
      }
    });

    it('passes the arguments to the constructor', function() {
      expect(policy2.create(true).allowed()).to.be.true;
      expect(policy2.create(false).allowed()).to.be.false;
    });
  });

  context('Called at the "class" level', function() {
    it('calls the allowed method', function() {
      expect(initCalled).to.be.false;
      expect(policy.allowed(true)).to.be.true;
      expect(policy.allowed(false)).to.be.false;
      expect(initCalled).to.be.true;
    });
  });

  context('if you do not provide allowed', function() {
    it('raises an error', function() {
      expect(function() {
        BasePolicy.extend({});
      }).to.throw('You must provide an allowed key');
    });
  });
});
