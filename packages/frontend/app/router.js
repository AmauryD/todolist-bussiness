import config from 'ember-boilerplate/config/environment';
import EmberRouter from '@embroider/router';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('404', { path: '/*path' });
  this.route('login');

  this.route('index', function () {});
  this.route('dashboard', function () {
    this.route('create');
    this.route('view');
  });
});
