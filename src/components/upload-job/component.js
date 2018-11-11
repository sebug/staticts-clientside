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
    for (let i = 4; sheet['A' + i] && sheet['A' + i].v; i += 1) {
	const taskNumber = sheet['A' + i].v;
	const taskDescription = sheet['B' + i] && sheet['B' + i].v;
	result.push({
	    taskNumber: taskNumber || '',
	    taskDescription: taskDescription || ''
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
	this.uploadTasksCode = params.uploadTasksCode;
	if (typeof this.uploadTasksCode !== 'function') {
	    this.uploadTasksCode = ko.observable(this.uploadTasksCode);
	}
	console.log(this.uploadTasksCode());
	this.takeJob = this.takeJob.bind(this);
	this.uploadTasks = this.uploadTasks.bind(this);
        this.upload = this.upload.bind(this);
	this.jobNumber = ko.observable();
	this.taskLines = ko.observableArray([]);
	this.canUpload = ko.pureComputed(() => {
	    return this.jobNumber() && this.taskLines().length;
	});
    }

    takeJob(file) {
	const name = file.name || '';
	const jobNumber = name.replace('.xlsx', '').replace('JOB','')
	    .replace(/^0+/,'');
	this.jobNumber(jobNumber);
	readJob(file).then(taskLines => {
	    this.taskLines(taskLines);
	});
    }

    async uploadTasks(tasks) {
	const uploadResult = await fetch('/api/UploadTasksTrigger?code=' +
					 this.uploadTasksCode(),
					 {
					     method: 'POST',
					     credentials: 'same-origin',
					     headers: {
						 "Content-Type": "application/json; charset=utf-8",
					     },
					     body: JSON.stringify(tasks)
					 });
	return true;
    }

    upload() {
	this.uploadTasks(this.taskLines()).then(() => {
	    console.log('uploaded tasks');
	});
	console.log('uploading');
	return false;
    }
}

export default {
    viewModel: ViewModel,
    template: htmlContent
};
