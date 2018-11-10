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
    });
}

function getTimesheetEntryWorksheet(timesheetEntryWorkSheet) {
    for (let i = 0; i < timesheetEntryWorkSheet.length; i += 1) {
	const ws = timesheetEntryWorkSheet[i];
	const title = ws.attributes["ss:Name"];
	if (title && title.value &&
	    title.value.indexOf('Timesheet Entry') >= 0) {
	    return ws;
	}
    }
}

function cellsAsArray(cells) {
    let result = [];
    for (let i = 0; i < cells.length; i += 1) {
	const data = cells[i].getElementsByTagName('Data');
	if (!data.length) {
	    result.push('');
	} else {
	    result.push(data[0].textContent);
	}
    }
    return result;
}

function readRow(row) {
    const cells = cellsAsArray(row.getElementsByTagName('Cell'));
    
    return {
	lineNumber: cells[0],
	startDate: cells[1],
	endDate: cells[2],
	jobNumber: cells[3],
	jobName: cells[4],
	clientNumber: cells[5],
	clientName: cells[6],
	taskNumber: cells[7],
	taskDescription: cells[8],
	siteCode: cells[9],
	workTypeCode: cells[10],
	workTypeDescription: cells[11],
	quantityWorked: cells[12],
	invoiceQuantity: cells[13]
    };
}

function* readRows(rows) {
    // skip first two rows
    for (let i = 2; i < rows.length; i += 1) {
	yield readRow(rows[i]);
    }
}

async function readLines(file) {
    const txt = await readText(file);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(txt, "text/xml");
    const worksheets = xmlDoc.getElementsByTagName('Worksheet');
    const timesheetEntryWorksheet = getTimesheetEntryWorksheet(worksheets);
    if (!timesheetEntryWorksheet) {
	throw new Error("Could not find timesheet entry worksheet");
    }
    const rows = timesheetEntryWorksheet.getElementsByTagName('Row');
    const lines = readRows(rows);
    
    return Array.from(lines);
}



class ViewModel {
    constructor(params) {
	this.uploadLinesCode = params.uploadLinesCode;
	if (typeof this.uploadLinesCode !== 'function') {
	    this.uploadLinesCode = ko.observable(this.uploadLinesCode);
	}
	this.takeFile = this.takeFile.bind(this);
	this.upload = this.upload.bind(this);
	this.uploadLines = this.uploadLines.bind(this);
	this.mostRecentLines = ko.observableArray([]);
	this.allLines = ko.observableArray([]);
	this.canUpload = ko.pureComputed(() => {
	    return this.allLines() && this.allLines().length;
	});
    }

    takeFile(file) {
	readLines(file).then(lines => {
	    this.allLines(lines);
	    let mostRecent = lines.slice(lines.length - 10);
	    mostRecent.reverse();
	    this.mostRecentLines(mostRecent);
	});
    }

    async uploadLines(lines) {
	const uploadResult = await fetch('/api/UploadLinesTrigger?code=' +
					 this.uploadLinesCode(),
					 {
					     method: 'POST',
					     credentials: 'same-origin',
					     headers: {
						 "Content-Type": "application/json; charset=utf-8",
					     },
					     body: JSON.stringify(lines)
					 });
	return true;
    }

    upload() {
	this.uploadLines(this.allLines()).then(() => {
	    console.log('uploaded lines');
	});
	console.log('uploading');
	return false;
    }
}

export default {
    viewModel: ViewModel,
    template: htmlContent
};
