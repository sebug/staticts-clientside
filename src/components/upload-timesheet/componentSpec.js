import uploadTimesheetComponent from './component.js';

const runTests = () => {
    describe('The timesheet upload component', function () {
	it('is an object', function () {
	    expect(uploadTimesheetComponent).toEqual(jasmine.any(Object));
	});

	describe('its view model instantiated', function () {
	    let instance;
	    beforeEach(function () {
		instance = new uploadTimesheetComponent.viewModel({
		    uploadLinesCode: 'ABC'
		});
	    });

	    it('has a takeFile function', function () {
		expect(instance.takeFile).toEqual(jasmine.any(Function));
	    });

	    it('has an uploadLinesCode', function () {
		expect(instance.uploadLinesCode()).toEqual(jasmine.any(String));
	    });
	});
    });
};

export default runTests;

