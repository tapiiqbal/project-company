// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
var app = require('../../server/server')
module.exports = function(Report) {
	//create path
	Report.remoteMethod(
		'getById',
		{
			description: 'get id  like -> Number',
			accepts: [
				{arg: 'Id', type: 'string'}
			],
			returns: {
				arg: 'res',type: 'object', root: true		
			},
			http: { path: '/getById', verb: 'get'}
		}
	);
//promise untuk menghilangkan asyncronus
//reject, resolve adalah annotation

	Report.getById = function(id, callback){
		new Promise(function(resolve, reject){

			var filter = {
				where : {
					id : {
						like : id
					}
				}
			}
			Report.find(filter, function(err, result){
				if (err) reject (err)
					if (result === null) {
						err = new Error('Cannot find that name')
						err.statusCode = 404
						reject(err)
					}	

					resolve(result)
			})
		}).then(function(res){
			var client = app.models.Client
			
				
			var clientId = res[0].clientId
			
			var filter = {
				where : {
					id : clientId
				}
			}
			// console.log(filter)
			client.find(filter, function(err, resclient){
				if (err) return (err)
				if (resclient === null) {
					err = new Error('Cannot find that name')
					err.statusCode = 404
					return(err)
				}	

				// console.log('2', resclient
				res[0].client = resclient[0]

				return callback(null,res)
			})
		}).catch(function(err){
			callback (err);
		})	
	}
}