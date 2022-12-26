import { module, test } from 'qunit';
import { setupTest } from 'ember-boilerplate/tests/helpers';

module('Unit | Route | dashboard/view', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:dashboard/view');
    assert.ok(route);
  });
});
