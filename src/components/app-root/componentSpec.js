import appRoot from './component.js';

class MockURL {
    constructor(href) {
	this.searchParams = {
	    get: function () {
		return 'ABC123'
	    }
	};
    }
}

const runTests = () => {
    describe('the app root component', function () {
	it('is an object', function () {
	    expect(appRoot).toEqual(jasmine.any(Object));
	});

	describe('its viewmodel instantiated', function () {
	    let instance;
	    let documentBefore;
	    let urlBefore;

	    beforeEach(function () {
		documentBefore = global.document;
		urlBefore = global.URL;
		global.document = {
		    location: 'http://localhost/?uploadLinesCode=ABC123'
		};
		global.URL = MockURL;
		instance = new appRoot.viewModel({});
	    });

	    afterEach(function () {
		global.document = documentBefore;
		global.URL = urlBefore;
	    });

	    it('has an uploadLinesCode property', function () {
		expect(instance.uploadLinesCode).toEqual(jasmine.any(Function));
		expect(instance.uploadLinesCode()).toEqual('ABC123');
	    });
	});
    });
};

export default runTests;
