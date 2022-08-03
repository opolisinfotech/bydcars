var Request = require("request"); 
var Events = require.main.require('./models/Events');
var Media = require.main.require('./models/Media');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';    
const controller = 'events'; 

/** 
 *  list
 *  Purpose: This function is used to show listing of all arecord
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json   
*/

async function list(req, res) { 
    res.set('content-type' , 'text/html; charset=mycharset'); 
    data = {};    
    action = 'list';
	LoginUser = req.session ;	
    const dataList = await Events.getAllData();
    res.render('admin/events/list',{page_title:" List",data:dataList,LoginUser:LoginUser,controller:controller,action:action});    
};       
exports.list = list;

/** 
 *  Edit
 *  Purpose: This function is used to get constructor List
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json  
*/
async function edit(req, res) { 
   
    res.set('content-type' , 'text/html; charset=mycharset'); 
    var action = 'edit';
    var eventsDetail = {}; 
    var errorData = {};
	LoginUser = req.session ;	
    if(req.params.id){
        var sn_id =  String("'"+req.params.id+"'");   
        eventsDetail = await Events.getRecordByid(sn_id); 
        if(eventsDetail.length == 0){ 
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/events/list'); 
        }   
        if (req.method == "POST") { 
            var input = JSON.parse(JSON.stringify(req.body)); 
			
			if (req.files && req.files.myfile !== "undefined") {
            let images = req.files.myfile; 
            var timestamp = new Date().getTime();
            if(images){
                filename =  timestamp+"_"+images.name;
				delete input['myfile'] ;
                input['image_url']  =  filename ;
                images.mv("public/uploads/"+filename, function(err) {
                    if (err){    
                        console.log(images);
                    }else{
                        console.log(images);
                    }  
                });
            } 
           }else {
		       delete input['myfile'] ;
		   }
		
            req.checkBody('title', 'Title is required').notEmpty();
			req.checkBody('events_date', 'Event date is required').notEmpty();	 
            var errors = req.validationErrors();    
            if(errors){	  
                if(errors.length > 0){
                    errors.forEach(function (errors1) {
                        var field1 = String(errors1.param); 
                        var msg = errors1.msg; 
                        errorData[field1] = msg;   
                        eventsDetail[0].field1 = req.field1;
                    }); 
                } 
                   
            }else{  
                var saveResult = ''; 
				var msg =  'Events updated successfully.'; 
                var saveResult = await Events.updateData(input);  
                req.flash('success', msg)   
                res.locals.message = req.flash(); 
                if(saveResult){  
                    res.set('content-type' , 'text/html; charset=mycharset');  
                    return res.redirect(nodeAdminUrl+'/Events/list');     
                }     
            } 
        } 
    }else{ 
        req.flash('error', 'Invalid url.');  
        return res.redirect(nodeAdminUrl+'/events/list');     
    } 
    res.render('admin/events/edit',{page_title:" Edit",data:eventsDetail,LoginUser:LoginUser,errorData:errorData,controller:controller,action:action});    
};         
exports.edit = edit;  

/** 
 *  Edit
 *  Purpose: This function is used to get constructor List
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json  
*/
async function add(req, res) { 
   
    //CheckPermission();   
    res.set('content-type' , 'text/html; charset=mycharset'); 
    var page_title = 'Add'; 
    var errorData = {}; 
    var data = {};
    var eventsDetail = {};  
    var action = 'add'; 
    var errorData = {};
	var imageArra = [];
	LoginUser = req.session ;   
    if (req.method == "POST") {
        
        var input = JSON.parse(JSON.stringify(req.body));
        req.checkBody('title', 'Title is required').notEmpty();
		req.checkBody('events_date', 'Event date is required').notEmpty();	
        var errors = req.validationErrors();    
        if(errors){	  
            if(errors.length > 0){
                errors.forEach(function (errors1) {
                    var field1 = String(errors1.param); 
                    var msg = errors1.msg; 
                    errorData[field1] = msg;   
                    data.field1 = req.field1; 
                }); 
            }    
        }else{ 
            var msg =  'Events added successfully.';
            delete input['mainFile'];
			delete input['myfile'];			
            var saveResult = await Events.saveData(input);
			console.log(saveResult);
			
			if (req.files && req.files.myfile !== "undefined") {
            let images = req.files.myfile ;
            let isDefault = 0 ;			
			console.log(images);
            var timestamp = new Date().getTime();
            if(images && images.length > 0){    
                images.forEach(function (item, key) {				  
					filename =  timestamp+"_"+item.name;
					if(key == 0) {
						input['main_image'] = filename ;
						isDefault = 1 ;
					}
					item.mv("public/uploads/events/"+filename, function(err) {
                        if (err){    
                            console.log(err);    
                        }else{
                            var imagedata = {  
                                product_id : saveResult['insertId'],    
                                myfile :   timestamp+"_"+item.name, 
                                media_type :  'Évents',
                                media_title:  input['title'],
                                isDefault: isDefault,								
                            };   
                            imageArra.push(imagedata);
							input['sn'] = saveResult['insertId'] ;
							Events.updateData(input); 		
                            Media.saveDataCallback(imagedata,function(result){ 
                                if(result){

                                }
                            });
                        }  
                    });
				});
            } 
           }
		   
            req.flash('success', msg)   
            res.locals.message = req.flash();  
            if(saveResult){  
                res.set('content-type' , 'text/html; charset=mycharset');  
                return res.redirect(nodeAdminUrl+'/events/list');     
            }     
        } 
    }  
    res.render('admin/events/add',{page_title:page_title,data:data,LoginUser:LoginUser,errorData:errorData,controller:controller,action:action});    
};          
exports.add = add; 

/** 
 *  delete
 *  Purpose: This function is used to get constructor delete
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json  
*/
async function deleteRecord(req, res) { 
   
    var eventsDetail = {}; 
    if(req.params.id){
        var cat_id =  String("'"+req.params.id+"'");    
        eventsDetail = await Events.deleteRecord(cat_id);  
        if(eventsDetail.length == 0){  
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/Events/list'); 
        }else{
            req.flash('success', 'Record deleted succesfully.');    
            return res.redirect(nodeAdminUrl+'/Events/list');  
        }   
    }else{ 
        req.flash('error', 'Invalid url.');   
        return res.redirect(nodeAdminUrl+'/Events/list');      
    }    
};          
exports.deleteRecord = deleteRecord; 


/** 
 *  deactivate
 *  Purpose: This function is used to get constructor delete
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json  
*/
async function deactivateRecord(req, res) { 
   
    var careersDetail = {}; 
    if(req.params.id){
        var cat_id =  String("'"+req.params.id+"'");    
        careersDetail = await Events.deactivateRecord(cat_id);  
        if(careersDetail.length == 0){  
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/Events/list'); 
        }else{
            req.flash('success', 'Record deleted succesfully.');    
            return res.redirect(nodeAdminUrl+'/Events/list');  
        }   
    }else{ 
        req.flash('error', 'Invalid url.');   
        return res.redirect(nodeAdminUrl+'/Events/list');      
    }    
};          
exports.deactivateRecord = deactivateRecord; 

/** 
 *  activate
 *  Purpose: This function is used to get constructor delete
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json  
*/
async function activateRecord(req, res) { 
   
    var careersDetail = {}; 
    if(req.params.id){
        var cat_id =  String("'"+req.params.id+"'");    
        careersDetail = await Events.activateRecord(cat_id);  
        if(careersDetail.length == 0){  
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/Events/list'); 
        }else{
            req.flash('success', 'Record deleted succesfully.');    
            return res.redirect(nodeAdminUrl+'/Events/list');  
        }   
    }else{ 
        req.flash('error', 'Invalid url.');   
        return res.redirect(nodeAdminUrl+'/Events/list');      
    }    
};          
exports.activateRecord = activateRecord; 