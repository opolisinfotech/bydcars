var Request = require("request"); 
var Media = require.main.require('./models/Media');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';    
const controller = 'media'; 

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
    const dataList = await Media.getAllData();
    res.render('admin/media/list',{page_title:" List",data:dataList,LoginUser:LoginUser,controller:controller,action:action});    
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
    var mediaDetail = {}; 
    var errorData = {};
	LoginUser = req.session ;	
    if(req.params.id){
        var sn_id =  String("'"+req.params.id+"'");   
        mediaDetail = await Media.getRecordByid(sn_id); 
        if(mediaDetail.length == 0){ 
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/media/list'); 
        }   
        if (req.method == "POST") { 
            var input = JSON.parse(JSON.stringify(req.body)); 
			
			if (req.files && req.files.myfile !== "undefined") {
            let images = req.files.myfile; 
            var timestamp = new Date().getTime();
            if(images){
                filename =  timestamp+"_"+images.name;
                input['myfile']  =  filename ;
                images.mv("public/uploads/media/"+filename, function(err) {
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
		
            req.checkBody('media_title', 'Title is required').notEmpty();	 
            var errors = req.validationErrors();    
            if(errors){	  
                if(errors.length > 0){
                    errors.forEach(function (errors1) {
                        var field1 = String(errors1.param); 
                        var msg = errors1.msg; 
                        errorData[field1] = msg;   
                        mediaDetail[0].field1 = req.field1;
                    }); 
                } 
                   
            }else{  
                var saveResult = ''; 
				var msg =  'Media updated successfully.'; 
                var saveResult = await Media.updateData(input);  
                req.flash('success', msg)   
                res.locals.message = req.flash(); 
                if(saveResult){  
                    res.set('content-type' , 'text/html; charset=mycharset');  
                    return res.redirect(nodeAdminUrl+'/Media/list');     
                }     
            } 
        } 
    }else{ 
        req.flash('error', 'Invalid url.');  
        return res.redirect(nodeAdminUrl+'/media/list');     
    } 
    res.render('admin/media/edit',{page_title:" Edit",data:mediaDetail,LoginUser:LoginUser,errorData:errorData,controller:controller,action:action});    
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
    var mediaDetail = {};  
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
                images.mv("public/uploads/media/"+filename, function(err) {
                    if (err){    
                        console.log(images);
                    }else{
                        console.log(images);
                    }  
                });
            } 
        }

        req.checkBody('media_title', 'Title is required').notEmpty();
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
            var msg =  'Media added successfully.'; 
            var saveResult = await Media.saveData(input);   
            req.flash('success', msg)   
            res.locals.message = req.flash();  
            if(saveResult){  
                res.set('content-type' , 'text/html; charset=mycharset');  
                return res.redirect(nodeAdminUrl+'/media/list');     
            }     
        } 
    }  
    res.render('admin/media/add',{page_title:page_title,data:data,LoginUser:LoginUser,errorData:errorData,controller:controller,action:action});    
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
   
    var mediaDetail = {}; 
    if(req.params.id){
        var cat_id =  String("'"+req.params.id+"'");    
        mediaDetail = await Media.deleteRecord(cat_id);  
        if(mediaDetail.length == 0){  
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/media/list'); 
        }else{
            req.flash('success', 'Record deleted succesfully.');    
            return res.redirect(nodeAdminUrl+'/media/list');  
        }   
    }else{ 
        req.flash('error', 'Invalid url.');   
        return res.redirect(nodeAdminUrl+'/media/list');      
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
        careersDetail = await Media.deactivateRecord(cat_id);  
        if(careersDetail.length == 0){  
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/media/list'); 
        }else{
            req.flash('success', 'Record deleted succesfully.');    
            return res.redirect(nodeAdminUrl+'/media/list');  
        }   
    }else{ 
        req.flash('error', 'Invalid url.');   
        return res.redirect(nodeAdminUrl+'/media/list');      
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
        careersDetail = await Media.activateRecord(cat_id);  
        if(careersDetail.length == 0){  
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/media/list'); 
        }else{
            req.flash('success', 'Record deleted succesfully.');    
            return res.redirect(nodeAdminUrl+'/media/list');  
        }   
    }else{ 
        req.flash('error', 'Invalid url.');   
        return res.redirect(nodeAdminUrl+'/nedia/list');      
    }    
};          
exports.activateRecord = activateRecord; 