import uploadTimesheetComponent from './component.js';

const runTests = () => {
    describe('The timesheet upload component', function () {
	it('is an object', function () {
	    expect(uploadTimesheetComponent).toEqual(jasmine.any(Object));
	});
    });
};

export default runTests;

