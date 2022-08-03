/** 
 *  getUserByid
 *  Purpose: This function is used to getUserByid
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: void 
*/
async function getRecordByid(sn) {	  
	try { 
		if(sn){ 
			var sql='select * from byd_media where sn = '+ sn;   
			return new Promise((resolve,reject)=>{
				connectPool.query(sql, (err, result) => {
					if (err) { 
						reject(err)
					} else { 
						resolve(result)
					}
				})
			})
		}else{
			return null;
		}
	} finally {
	 
	} 
} 
/** 
 *  deleteRecord
 *  Purpose: This function is used to deleteRecord
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: void 
*/
async function deleteRecord(sn) {	  
	try { 
		if(sn){ 
			var sql='delete  from byd_media where sn = '+ sn;   
			return new Promise((resolve,reject)=>{
				connectPool.query(sql, (err, result) => {
					if (err) { 
						reject(err)
					} else { 
						resolve(result)
					}
				})
			})
		}else{
			return null;
		}
	} finally {
	 
	} 
} 

/** 
 *  deactivateRecord
 *  Purpose: This function is used to deleteRecord
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: void 
*/
async function deactivateRecord(sn) {	  
	try { 
		if(sn){ 
			var sql='update byd_media set status=0 where sn = '+ sn;   
			return new Promise((resolve,reject)=>{
				connectPool.query(sql, (err, result) => {
					if (err) { 
						reject(err)
					} else { 
						resolve(result)
					}
				})
			})
		}else{
			return null;
		}
	} finally {
	 
	} 
} 

/** 
 *  activateRecord
 *  Purpose: This function is used to deleteRecord
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: void 
*/
async function activateRecord(sn) {	  
	try { 
		if(sn){ 
			var sql='update byd_media set status=1 where sn = '+ sn;   
			return new Promise((resolve,reject)=>{
				connectPool.query(sql, (err, result) => {
					if (err) { 
						reject(err)
					} else { 
						resolve(result)
					}
				})
			})
		}else{
			return null;
		}
	} finally {
	 
	} 
} 
/** 
 *  getAllData
 *  Purpose: This function is used to getAllData
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: void 
*/
async function getAllData() {	  
	try {   
			var sql='select * from byd_media where 1= 1 ORDER BY sn DESC';    
			return new Promise((resolve,reject)=>{
				connectPool.query(sql, (err, result) => {
					if (err) { 
						reject(err)
					} else { 
						resolve(result)
					}
				})
			})
		 
	} finally {
	 
	} 
} 
/** 
 *  saveData
 *  Purpose: This function is used to saveData
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json 
*/
async function saveData(data) { 
	try { 
		if(data){   
			var sql='INSERT INTO byd_media set ? ';
			return new Promise((resolve,reject)=>{
				connectPool.query(sql,data, (err, result) => {
					if (err) { 
						console.log(data);
						reject(err)
					} else { 
						resolve(result)
					}
				})
			}) 
		}else{ 
			return null;
		}
	} finally {
		//if (connectPool && connectPool.end) connectPool.end();
	}  
} 


function saveDataCallback(data,callback)
{	
	 
	var sql='INSERT INTO byd_media set ? ';    
	connectPool.query(sql,data,function(error,result){
		if (error) { 
			console.log(error);
			callback(false); 
		}  
		else 
		{	 
			if(result.length==0 || result==null){
				callback(false);
			}else{
				callback(result);
			} 
			//callback(result);
		} 
	});  
}
exports.saveDataCallback = saveDataCallback; 
/** 
 *  updateData
 *  Purpose: This function is used to updateData
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json 
*/
async function updateData(data) {	  
	
	try { 
		if(data){   
			var sql = "UPDATE byd_media set ? WHERE sn = ?";   
			return new Promise((resolve,reject)=>{
				connectPool.query(sql,[data, data.sn], (err, result) => {
					if (err) { 
						console.log(data); 
						reject(err)
					} else {  
						resolve(result)
					}
				})
			}) 
		}else{
			return null;
		}
	} catch (err) {
        return err; 
    } finally {
		//if (connectPool && connectPool.end) connectPool.end();
	}   
} 

module.exports={
	saveData,
	saveDataCallback,
	updateData,
	getRecordByid,   
	getAllData,
	deleteRecord,
	activateRecord,
	deactivateRecord,
	InitSequel:function(sequelize, type)
	{	
        var Product = sequelize.define('byd_media', {
              sn: { 
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
              }, 
							product_id : { type: type.INTEGER }, 
							media_type : { type: type.STRING }, 
							myfile : { type: type.STRING },
							media_title : { type: type.STRING },
                            modified_date : { type: type.STRING },	
                            creation_date : { type: type.STRING },	  							
							status : { type: type.INTEGER },    
          },   
          {
            tableName: 'byd_media',
            timestamps: false
          }  
      ); 
      return Product;
  }, 
}; 
