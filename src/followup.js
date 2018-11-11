import ko from 'knockout';
import followupRoot from './components/follow-up/component.js';
ko.components.register('follow-up', followupRoot);

ko.applyBindings({}, document.getElementsByTagName('main')[0]);
