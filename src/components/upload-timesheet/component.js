import ko from 'knockout';
import htmlContent from './component.html';

function readLines(file) {
    return new Promise(function (resolve, reject) {
	const fr = new FileReader();
	fr.onloadended = () => {
	    resolve(fr.result);
	};
	fr.onerror = () => {
	    reject(fr.error);
	};
	fr.readAsText(file);
    });
}

class ViewModel {
    constructor(params) {
	this.uploadLinesCode = params.uploadLinesCode;
	if (typeof this.uploadLinesCode !== 'function') {
	    this.uploadLinesCode = ko.observable(this.uploadLinesCode);
	}
	this.takeFile = this.takeFile.bind(this);
	this.upload = this.upload.bind(this);
    }

    takeFile(file) {
	console.log(file);
	readLines(file).then(lines => {
	    console.log(lines);
	});
    }

    upload() {
	console.log('uploading');
	return false;
    }
}

export default {
    viewModel: ViewModel,
    template: htmlContent
};
