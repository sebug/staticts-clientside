import uploadJobComponent from './component.js';

const runTests = () => {
    describe('The job upload component', function () {
	it('is an object', function () {
	    expect(uploadJobComponent).toEqual(jasmine.any(Object));
	});
    });
};

export default runTests;
