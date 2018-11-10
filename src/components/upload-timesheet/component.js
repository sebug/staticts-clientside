import ko from 'knockout';
import htmlContent from './component.html';

class ViewModel {
    constructor(params) {
	this.uploadLinesCode = params.uploadLinesCode;
	if (typeof this.uploadLinesCode !== 'function') {
	    this.uploadLinesCode = ko.observable(this.uploadLinesCode);
	}
	this.takeFile = this.takeFile.bind(this);
    }

    takeFile(file) {
	console.log('taking file');
	console.log(this.uploadLinesCode());
    }
}

export default {
    viewModel: ViewModel,
    template: htmlContent
};
