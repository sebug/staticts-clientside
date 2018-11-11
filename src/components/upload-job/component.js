import ko from 'knockout';
import htmlContent from './component.html';
import XLSX from 'xlsx';

function readAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
	const fr = new FileReader();
        fr.onload = e => {
            resolve(e.target.result);
        };
        fr.onerror = () => {
            reject(fr.error);
        };
        fr.readAsArrayBuffer(file);
    });
}

async function readJob(file) {
    const ab = readAsArrayBuffer(file);
    return ab;
}

class ViewModel {
    constructor(params) {
	this.takeFile = this.takeFile.bind(this);
        this.upload = this.upload.bind(this);
	this.canUpload = ko.observable(true);
    }

    takeFile(file) {
	console.log(file);
	readJob(file).then(job => {
	    console.log(job);
	});
    }

    upload() {
    }
}

export default {
    viewModel: ViewModel,
    template: htmlContent
};
