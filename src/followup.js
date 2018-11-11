import ko from 'knockout';
import followupRoot from './components/follow-up/component.js';
ko.components.register('follow-up', appRoot);

ko.applyBindings({}, document.getElementsByTagName('main')[0]);
