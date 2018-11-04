import appRoot from './component.js';

const runTests = () => {
    describe('the app root component', function () {
	it('is an object', function () {
	    expect(appRoot).toEqual(jasmine.any(Object));
	});
    });
};

export default runTests;
