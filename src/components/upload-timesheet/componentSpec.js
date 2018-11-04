import uploadTimesheetComponent from './component.js';

const runTests = () => {
    describe('The timesheet upload component', function () {
	it('is an object', function () {
	    expect(uploadTimesheetComponent).toEqual(jasmine.any(Object));
	});

	describe('its view model instantiated', function () {
	    let instance;
	    beforeEach(function () {
		instance = new uploadTimesheetComponent.viewModel({});
	    });

	    it('has a takeFile function', function () {
		expect(instance.takeFile).toEqual(jasmine.any(Function));
	    });
	});
    });
};

export default runTests;

