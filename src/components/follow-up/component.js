import ko from 'knockout';
import htmlContent from './component.html';

class ViewModel {
    constructor(params) {
	this.followUpCode = ko.observable();
        if (document && document.location) {
            let sps = (new URL(document.location)).searchParams;
            let followUpCode = sps.get('followUpCode');
            this.followupCode(followUpCode);
	    console.log('Follow up code is ' + this.followUpCode());
        }
    }
}

export default {
    viewModel: ViewModel,
    template: htmlContent
};
