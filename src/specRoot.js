import appRoot from './components/app-root/component.js';

describe('the app root component', function () {
    it('is an object', function () {
	expect(appRoot).toEqual(jasmine.any(Number));
    });
});
