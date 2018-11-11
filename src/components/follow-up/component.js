import ko from 'knockout';
import htmlContent from './component.html';

class ViewModel {
    constructor(params) {
	this.followUpCode = ko.observable();
	this.getData = this.getData.bind(this);
	this.followUp = ko.observable();
        if (document && document.location) {
            let sps = (new URL(document.location)).searchParams;
            let followUpCode = sps.get('followUpCode');
            this.followUpCode(followUpCode);
	    console.log('Follow up code is ' + this.followUpCode());
	    this.getData();
        }
    }

    async getData() {
	const followUpResult = await fetch('/api/FollowUpTrigger?code=' + this.followUpCode());
	const followUp = await followUpResult.json();
	if (followUp && followUp.FollowUpLines) {
	    for (let line of followUp.FollowUpLines) {
		line.RemainingWork = Math.max(0, ((line.BaseLine || 0) - line.TotalTimeSpent));
                line.Variance = line.TotalTimeSpent + line.RemainingWork - (line.BaseLine || 0);
	    }
	}
	this.followUp(followUp);
    }
}

export default {
    viewModel: ViewModel,
    template: htmlContent
};
