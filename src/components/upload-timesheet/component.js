import ko from 'knockout';
import htmlContent from './component.html';

function readText(file) {
    return new Promise(function (resolve, reject) {
	const fr = new FileReader();
	fr.onload = e => {
	    resolve(e.target.result);
	};
	fr.onerror = () => {
	    reject(fr.error);
	};
	fr.readAsText(file);
	console.log('started read');
    });
}

async function readLines(file) {
    console.log('starting read lines');
    const txt = await readText(file);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(txt, "text/xml");
    const timesheetEntryWorkSheet = xmlDoc.getElementsByTagName('Worksheet');

    for (let i = 0; i < timesheetEntryWorkSheet.length; i += 1) {
	const ws = timesheetEntryWorkSheet[i];
	const title = ws.attributes["ss:Name"];
	console.log(title);
    }
    return xmlDoc;
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
