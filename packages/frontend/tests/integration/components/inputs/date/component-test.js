import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-boilerplate/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | inputs/date', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Inputs::Date />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <Inputs::Date>
        template block text
      </Inputs::Date>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
