import ko from 'knockout';
import htmlContent from './component.html';

class ViewModel {
    constructor(params) {
	this.takeFile = this.takeFile.bind(this);
    }

    takeFile(file) {
	console.log('taking file');
    }
}

export default {
    viewModel: ViewModel,
    template: htmlContent
};
