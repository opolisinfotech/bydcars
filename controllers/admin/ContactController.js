var Request = require("request");      
var Contact = require.main.require('./models/Contact');   
const controller = 'contact'; 
  
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
    const contactList = await Contact.getAllData();   
    res.render('admin/contact/list',{page_title:" List",data:contactList,controller:controller,action:action});    
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
    var contactDetail = {}; 
    var errorData = {};
    if(req.params.id){
        var cat_id =  String("'"+req.params.id+"'");   
        contactDetail = await Contact.getRecordByid(cat_id); 
        if(contactDetail.length == 0){ 
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/contact/list'); 
        }   
        if (req.method == "POST") { 
            var input = JSON.parse(JSON.stringify(req.body)); 
            console.log(input);
            req.checkBody('title', 'Title is required').notEmpty();
            req.checkBody('is_active', 'Password is required').notEmpty(); 
            var errors = req.validationErrors();    
            if(errors){	  
                if(errors.length > 0){
                    errors.forEach(function (errors1) {
                        var field1 = String(errors1.param); 
                        var msg = errors1.msg; 
                        errorData[field1] = msg;   
                        contactDetail[0].field1 = req.field1;
                    }); 
                } 
                   
            }else{  
                var saveResult = ''; 
                var saveData = {  
                    title    : input.title,      
                    is_active : input.is_active,      
                }; 
                //console.log(saveData); return true;
                if (typeof input.id !== 'undefined' && input.id != null && input.id != '') {
                    saveData.id = input.id;  
                    var msg =  'Contact updated successfully.'; 
                    var saveResult = await Contact.updateData(saveData);  
                }else{
                    var msg =  'Contact added successfully.'; 
                    var saveResult = await Contact.saveData(saveData); 
                }   
                req.flash('success', msg)   
                res.locals.message = req.flash(); 
                if(saveResult){  
                    res.set('content-type' , 'text/html; charset=mycharset');  
                    return res.redirect(nodeAdminUrl+'/Contact/list');     
                }     
            } 
        } 
    }else{ 
        req.flash('error', 'Invalid url.');  
        return res.redirect(nodeAdminUrl+'/Contact/list');     
    } 
    res.render('admin/contact/edit',{page_title:" Edit",data:categoryDetail,errorData:errorData,controller:controller,action:action});    
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
    var contactDetail = {};  
    var action = 'add'; 
    var errorData = {};    
    if (req.method == "POST") { 
        var input = JSON.parse(JSON.stringify(req.body));  
        req.checkBody('title', 'Title is required').notEmpty();
        req.checkBody('is_active', 'Password is required').notEmpty(); 
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
            var saveData = {  
                title    : input.title,      
                is_active : input.is_active,      
            };  

            var msg =  'Contact added successfully.'; 
            var saveResult = await Contact.saveData(saveData);   
            req.flash('success', msg)   
            res.locals.message = req.flash();  
            if(saveResult){  
                res.set('content-type' , 'text/html; charset=mycharset');  
                return res.redirect(nodeAdminUrl+'/Contact/list');     
            }     
        } 
    }  
    res.render('admin/contact/add',{page_title:page_title,data:data, errorData:errorData,controller:controller,action:action});    
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
   
    var contactDetail = {}; 
    if(req.params.id){
        var cat_id =  String("'"+req.params.id+"'");    
        contactDetail = await Contact.deleteRecord(cat_id);  
        if(contactDetail.length == 0){  
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/Contact/list'); 
        }else{
            req.flash('success', 'Record deleted succesfully.');    
            return res.redirect(nodeAdminUrl+'/Contact/list');  
        }   
    }else{ 
        req.flash('error', 'Invalid url.');   
        return res.redirect(nodeAdminUrl+'/Contact/list');      
    }    
};          
exports.deleteRecord = deleteRecord; 
   
