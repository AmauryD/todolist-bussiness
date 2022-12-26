import { module, test } from 'qunit';
import { setupTest } from 'ember-boilerplate/tests/helpers';

module('Unit | Service | changesets/todo-list', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:changesets/todo-list');
    assert.ok(service);
  });
});
