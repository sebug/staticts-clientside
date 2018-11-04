import ko from 'knockout';
import htmlContent from './component.html';
import uploadTimesheet from '../upload-timesheet/component.js';

ko.components.register('upload-timesheet', uploadTimesheet);

class ViewModel {
    constructor(params) {
	this.uploadLinesCode = ko.observable();
	if (document && document.location) {
	    let sps = (new URL(document.location)).searchParams;
	    let uploadLinesCode = sps.get('uploadLinesCode');
	    this.uploadLinesCode(uploadLinesCode);
	}
    }
}

export default {
    viewModel: ViewModel,
    template: htmlContent
};
