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
    
    return cells;
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

    let i = 0;
    for (const line of lines) {
	if (i > 10) {
	    break;
	}
	console.log(line);
	i += 1;
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
