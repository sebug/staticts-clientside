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

function readTaskLines(sheet) {
    if (!sheet) {
	return [];
    }
    let result = [];
    for (let i = 0; sheet['A' + i] && sheet['A' + i].v; i += 1) {
	const taskNumber = sheet['A' + i].v;
	const taskDescription = sheet['B' + i] && sheet['B' + i].v;
	result.push({
	    taskNumber: taskNumber,
	    taskDescription: taskDescription
	});
    }

    return result;
}

async function readJob(file) {
    const ab = await readAsArrayBuffer(file);
    const data = new Uint8Array(ab);
    const workbook = XLSX.read(data, {type:"array"});
    console.log(workbook.Sheets);
    const taskLines = readTaskLines(workbook.Sheets.Sheet1);
    return taskLines;
}

class ViewModel {
    constructor(params) {
	this.takeJob = this.takeJob.bind(this);
        this.upload = this.upload.bind(this);
	this.canUpload = ko.observable(true);
    }

    takeJob(file) {
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
