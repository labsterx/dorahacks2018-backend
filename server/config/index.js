'use strict';

var mongo_uri = 'mongodb://dorahacks:dorahacks2018@ds117489.mlab.com:17489/dorahacks2018';

module.exports = {
	port: 5000,
	mongo: {
		uri: mongo_uri
	},
	jwt: {
		secret: 'hogcPFihYMXbPVttIl0Bra6UQj1jN4L8'
	},
	users: [
		{
			id: 1,
			username: 'dorahacks',
			password: '$2a$10$NBORuOJQO7duO8.yNdvUxe6g3UGBu/48I4E15lNtqHnETDXQGGTw.',
			role: 'superadmin'
		}
	]
};
