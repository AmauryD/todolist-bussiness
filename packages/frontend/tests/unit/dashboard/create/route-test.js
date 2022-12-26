import { module, test } from 'qunit';
import { setupTest } from 'ember-boilerplate/tests/helpers';

module('Unit | Route | dashboard/create', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:dashboard/create');
    assert.ok(route);
  });
});
