import ko from 'knockout';
import htmlContent from './component.html';
import uploadTimesheet from '../upload-timesheet/component.js';

ko.components.register('upload-timesheet', uploadTimesheet);

class ViewModel {
    constructor(params) {
    }
}

export default {
    viewModel: ViewModel,
    template: htmlContent
};