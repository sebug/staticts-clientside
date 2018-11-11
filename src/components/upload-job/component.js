import ko from 'knockout';
import htmlContent from './component.html';

class ViewModel {
    constructor(params) {
	this.takeFile = this.takeFile.bind(this);
        this.upload = this.upload.bind(this);
    }

    takeFile(file) {
	console.log(file);
    }

    upload() {
    }
}

export default {
    viewModel: ViewModel,
    template: htmlContent
};
