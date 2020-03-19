import { Meteor } from 'meteor/meteor';

import { TimeseriesCollection } from '/imports/api/timeseries';

Meteor.startup(() => {
	// If the TimeseriesCollection collection is empty, populate it with data from room-temperatures.csv.
	if (TimeseriesCollection.find().count() === 0) {
		// Read csv and dump into TimeseriesCollection
	}
});

//import { LinksCollection } from '/imports/api/links';

/*function insertLink({ title, url }) {
  LinksCollection.insert({title, url, createdAt: new Date()});
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (LinksCollection.find().count() === 0) {
    insertLink({
      title: 'Do the Tutorial',
      url: 'https://www.meteor.com/tutorials/react/creating-an-app'
    });

    insertLink({
      title: 'Follow the Guide',
      url: 'http://guide.meteor.com'
    });

    insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com'
    });

    insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com'
    });
  }
});*/
