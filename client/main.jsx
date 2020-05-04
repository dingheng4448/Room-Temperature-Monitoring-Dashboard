import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/App';

Meteor.startup(() => {
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker
			.register('/sw.js')
			.then(() => console.info('Service worker is registered!'))
			.catch(error => { 
				console.log('ServiceWorker registration failed: ', error)
		});
	}
	render(<App/>, document.getElementById('react-target'));
});

Notification.requestPermission(result =>  {
	console.log("Push notifications permissions " + result);
	// Uncomment the following code to test notifications
	if (result === 'granted' && 'Notification' in window) {
		navigator.serviceWorker.ready.then(registration => {
			registration.showNotification('Temperature Dashboard', {
				body: 'Welcome!',
				tag: 'welcome'
			});
		});
	}
});