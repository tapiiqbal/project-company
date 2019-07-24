// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = function(Employee) {
	//create path
	Employee.remoteMethod(
		'getByFirstName',
		{
			description: 'get firsname like -> Muhammad',
			accepts: [
				{arg: 'First Name', type: 'string'}
			],
			returns: {
				arg: 'res',type: 'object', root: true		
			},
			http: { path: '/getByFirstName', verb: 'get'}
		}
	);
//promise untuk menghilangkan asyncronus
//reject, resolve adalah annotation

	Employee.getByFirstName = function(first_name, callback){
		new Promise(function(resolve, reject){

			var filter = {
				where : {
					first_name : {
						like : first_name
					}
				}
			}
			Employee.find(filter, function(err, result){
				if (err) reject (err)
					if (result === null) {
						err = new Error('Cannot find that name')
						err.statusCode = 404
						reject(err)
					}	

					resolve(result)
			})
		}).then(function(res){
			if (!res) callback (err)
				return callback(null,res)
		}).catch(function(err){
			callback (err);
		})	
	}
//promise untuk menghilangkan asyncronus
//reject, resolve adalah annotation

	Employee.getByFirstId= function(first_name, callback){
		new Promise(function(resolve, reject){

			var filter = {
				where : {
					first_name : {
						like : first_name
					}
				}
			}
			Employee.find(filter, function(err, result){
				if (err) reject (err)
					if (result === null) {
						err = new Error('Cannot find that name')
						err.statusCode = 404
						reject(err)
					}	

					resolve(result)
			})
		}).then(function(res){
			if (!res) callback (err)
				return callback(null,res)
		}).catch(function(err){
			callback (err);
		})	
	}
}


