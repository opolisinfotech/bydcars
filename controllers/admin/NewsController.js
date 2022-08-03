var Request = require("request");
var News = require.main.require('./models/News');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';    
const controller = 'news'; 

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
    const dataList = await News.getAllData();
    res.render('admin/news/list',{page_title:" List",data:dataList,LoginUser:LoginUser,controller:controller,action:action});    
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
    var newsDetail = {}; 
    var errorData = {};
	LoginUser = req.session ;	
    if(req.params.id){
        var sn_id =  String("'"+req.params.id+"'");   
        newsDetail = await News.getRecordByid(sn_id); 
        if(newsDetail.length == 0){ 
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/news/list'); 
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
                images.mv("public/uploads/news/"+filename, function(err) {
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
			req.checkBody('article_type', 'Article type is required').notEmpty();
			req.checkBody('short_description', 'Short description is required').notEmpty();
			req.checkBody('full_description', 'Full description is required').notEmpty();	 
            var errors = req.validationErrors();    
            if(errors){	  
                if(errors.length > 0){
                    errors.forEach(function (errors1) {
                        var field1 = String(errors1.param); 
                        var msg = errors1.msg; 
                        errorData[field1] = msg;   
                        newsDetail[0].field1 = req.field1;
                    }); 
                } 
                   
            }else{  
                var saveResult = ''; 
				var msg =  'News updated successfully.'; 
                var saveResult = await News.updateData(input);  
                req.flash('success', msg)   
                res.locals.message = req.flash(); 
                if(saveResult){  
                    res.set('content-type' , 'text/html; charset=mycharset');  
                    return res.redirect(nodeAdminUrl+'/News/list');     
                }     
            } 
        } 
    }else{ 
        req.flash('error', 'Invalid url.');  
        return res.redirect(nodeAdminUrl+'/news/list');     
    } 
    res.render('admin/news/edit',{page_title:" Edit",data:newsDetail,LoginUser:LoginUser,errorData:errorData,controller:controller,action:action});    
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
    var newsDetail = {};  
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
				delete input['myfile'] ;
                input['image_url']  =  filename ;
                images.mv("public/uploads/news/"+filename, function(err) {
                    if (err){    
                        console.log(images);
                    }else{
                        console.log(images);
                    }  
                });
            } 
        }

        req.checkBody('title', 'Title is required').notEmpty();
		req.checkBody('article_type', 'Article type is required').notEmpty();
		req.checkBody('short_description', 'Short description is required').notEmpty();
		req.checkBody('full_description', 'Full description is required').notEmpty();	
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
            var msg =  'News added successfully.'; 
            var saveResult = await News.saveData(input);   
            req.flash('success', msg)   
            res.locals.message = req.flash();  
            if(saveResult){  
                res.set('content-type' , 'text/html; charset=mycharset');  
                return res.redirect(nodeAdminUrl+'/news/list');     
            }     
        } 
    }  
    res.render('admin/news/add',{page_title:page_title,data:data,LoginUser:LoginUser,errorData:errorData,controller:controller,action:action});    
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
   
    var newsDetail = {}; 
    if(req.params.id){
        var cat_id =  String("'"+req.params.id+"'");    
        newsDetail = await News.deleteRecord(cat_id);  
        if(newsDetail.length == 0){  
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/News/list'); 
        }else{
            req.flash('success', 'Record deleted succesfully.');    
            return res.redirect(nodeAdminUrl+'/News/list');  
        }   
    }else{ 
        req.flash('error', 'Invalid url.');   
        return res.redirect(nodeAdminUrl+'/News/list');      
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
        careersDetail = await News.deactivateRecord(cat_id);  
        if(careersDetail.length == 0){  
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/News/list'); 
        }else{
            req.flash('success', 'Record deleted succesfully.');    
            return res.redirect(nodeAdminUrl+'/News/list');  
        }   
    }else{ 
        req.flash('error', 'Invalid url.');   
        return res.redirect(nodeAdminUrl+'/News/list');      
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
        careersDetail = await News.activateRecord(cat_id);  
        if(careersDetail.length == 0){  
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/News/list'); 
        }else{
            req.flash('success', 'Record deleted succesfully.');    
            return res.redirect(nodeAdminUrl+'/News/list');  
        }   
    }else{ 
        req.flash('error', 'Invalid url.');   
        return res.redirect(nodeAdminUrl+'/News/list');      
    }    
};          
exports.activateRecord = activateRecord; 