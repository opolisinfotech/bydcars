var Request = require("request"); 
var Dealers = require.main.require('./models/Dealers');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';    
const controller = 'dealers'; 

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
    const dataList = await Dealers.getAllData();
    res.render('admin/dealers/list',{page_title:" List",data:dataList,LoginUser:LoginUser,controller:controller,action:action});    
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
    var dealersDetail = {}; 
    var errorData = {};
	LoginUser = req.session ;	
    if(req.params.id){
        var sn_id =  String("'"+req.params.id+"'");   
        dealersDetail = await Dealers.getRecordByid(sn_id); 
        if(dealersDetail.length == 0){ 
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/dealers/list'); 
        }   
        if (req.method == "POST") { 
            var input = JSON.parse(JSON.stringify(req.body));
			if (req.files && req.files.myfile !== "undefined") {
				let images = req.files.myfile; 
				var timestamp = new Date().getTime();
				if(images){
					filename =  timestamp+"_"+images.name;
					input['myfile']  =  filename ;
					images.mv("public/uploads/dealers/"+filename, function(err) {
						if (err){    
							console.log(err);
						}else{
							console.log(images);
						}  
					});
				} 
            }else {
			   delete input['myfile'] ;
			}				
            req.checkBody('name', 'Name is required').notEmpty();
			req.checkBody('address', 'Address is required').notEmpty();
			req.checkBody('state', 'State is required').notEmpty();
			req.checkBody('city', 'City is required').notEmpty();
			req.checkBody('phoneno', 'Phone No is required').notEmpty();
			req.checkBody('email', 'Please enter an email address!').isEmail();	 
            var errors = req.validationErrors();    
            if(errors){	  
                if(errors.length > 0){
                    errors.forEach(function (errors1) {
                        var field1 = String(errors1.param); 
                        var msg = errors1.msg; 
                        errorData[field1] = msg;   
                        dealersDetail[0].field1 = req.field1;
                    }); 
                } 
                   
            }else{  
                var saveResult = ''; 
				var msg =  'Dealers updated successfully.'; 
                var saveResult = await Dealers.updateData(input);  
                req.flash('success', msg)   
                res.locals.message = req.flash(); 
                if(saveResult){  
                    res.set('content-type' , 'text/html; charset=mycharset');  
                    return res.redirect(nodeAdminUrl+'/Dealers/list');     
                }     
            } 
        } 
    }else{ 
        req.flash('error', 'Invalid url.');  
        return res.redirect(nodeAdminUrl+'/dealers/list');     
    } 
    res.render('admin/dealers/edit',{page_title:" Edit",data:dealersDetail,LoginUser:LoginUser,errorData:errorData,controller:controller,action:action});    
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
    var dealersDetail = {};  
    var action = 'add'; 
    var errorData = {};
	LoginUser = req.session ;   
    if (req.method == "POST") {
        
        var input = JSON.parse(JSON.stringify(req.body));
       
        if (req.files && req.files.myfile !== "undefined") {
            let images = req.files.myfile; 
            var timestamp = new Date().getTime();
            if(images){
                filename =  timestamp+"_"+images.name;
                input['myfile']  =  filename ;
                images.mv("public/uploads/dealers/"+filename, function(err) {
                    if (err){    
                        console.log(err);
                    }else{
                        console.log(images);
                    }  
                });
            } 
        }else {
			delete input['myfile'] ;
		}
        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('address', 'Address is required').notEmpty();
		req.checkBody('state', 'State is required').notEmpty();
        req.checkBody('city', 'City is required').notEmpty();
		req.checkBody('phoneno', 'Phone No is required').notEmpty();
        req.checkBody('email', 'Please enter an email address!').isEmail();	
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
            var msg =  'Dealers added successfully.'; 
            var saveResult = await Dealers.saveData(input);   
            req.flash('success', msg)   
            res.locals.message = req.flash();  
            if(saveResult){  
                res.set('content-type' , 'text/html; charset=mycharset');  
                return res.redirect(nodeAdminUrl+'/dealers/list');     
            }     
        } 
    }  
    res.render('admin/dealers/add',{page_title:page_title,data:data,LoginUser:LoginUser,errorData:errorData,controller:controller,action:action});    
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
   
    var dealersDetail = {}; 
    if(req.params.id){
        var id =  String("'"+req.params.id+"'");    
        dealersDetail = await Dealers.deleteRecord(id);  
        if(dealersDetail.length == 0){  
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/Dealers/list'); 
        }else{
            req.flash('success', 'Record deleted succesfully.');    
            return res.redirect(nodeAdminUrl+'/Dealers/list');  
        }   
    }else{ 
        req.flash('error', 'Invalid url.');   
        return res.redirect(nodeAdminUrl+'/dealers/list');      
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
        careersDetail = await Dealers.deactivateRecord(cat_id);  
        if(careersDetail.length == 0){  
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/dealers/list'); 
        }else{
            req.flash('success', 'Record deleted succesfully.');    
            return res.redirect(nodeAdminUrl+'/dealers/list');  
        }   
    }else{ 
        req.flash('error', 'Invalid url.');   
        return res.redirect(nodeAdminUrl+'/dealers/list');      
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
        careersDetail = await Dealers.activateRecord(cat_id);  
        if(careersDetail.length == 0){  
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/dealers/list'); 
        }else{
            req.flash('success', 'Record deleted succesfully.');    
            return res.redirect(nodeAdminUrl+'/dealers/list');  
        }   
    }else{ 
        req.flash('error', 'Invalid url.');   
        return res.redirect(nodeAdminUrl+'/dealers/list');      
    }    
};          
exports.activateRecord = activateRecord; 