import appRoot from './components/app-root/component.js';

describe('the root module', function () {
    it('is an object', function () {
	expect(appRoot).toEqual(jasmine.any(Object));
    });
});
