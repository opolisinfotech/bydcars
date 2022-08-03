var Request = require("request");     
var Careers = require.main.require('./models/Careers');
const controller = 'careers'; 
  
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
    const dataList = await Careers.getAllData();
    res.render('admin/careers/list',{page_title:" List",data:dataList,LoginUser:LoginUser,controller:controller,action:action});    
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
    var careersDetail = {}; 
    var errorData = {};
	LoginUser = req.session ;	
    if(req.params.id){
        var sn_id =  String("'"+req.params.id+"'");   
        careersDetail = await Careers.getRecordByid(sn_id); 
        if(careersDetail.length == 0){ 
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/careers/list'); 
        }   
        if (req.method == "POST") { 
            var input = JSON.parse(JSON.stringify(req.body)); 
            req.checkBody('name', 'Name is required').notEmpty();
			req.checkBody('address', 'Address is required').notEmpty();
			req.checkBody('salary', 'Salary is required').notEmpty();
			req.checkBody('experience', 'Experience is required').notEmpty();
			req.checkBody('industry_preferred', 'Industry preferred is required').notEmpty();
			req.checkBody('qualification', 'Please qualification !').notEmpty();
            var errors = req.validationErrors();    
            if(errors){	  
                if(errors.length > 0){
                    errors.forEach(function (errors1) {
                        var field1 = String(errors1.param); 
                        var msg = errors1.msg; 
                        errorData[field1] = msg;   
                        careersDetail[0].field1 = req.field1;
                    }); 
                } 
                   
            }else{  
                var saveResult = ''; 
				var msg =  'Careers updated successfully.';
                var saveResult = await Careers.updateData(input);  
                req.flash('success', msg)   
                res.locals.message = req.flash(); 
                if(saveResult){  
                    res.set('content-type' , 'text/html; charset=mycharset');  
                    return res.redirect(nodeAdminUrl+'/Careers/list');     
                }     
            } 
        } 
    }else{ 
        req.flash('error', 'Invalid url.');  
        return res.redirect(nodeAdminUrl+'/careers/list');     
    }	
    res.render('admin/careers/edit',{page_title:" Edit",data:careersDetail,LoginUser:LoginUser,errorData:errorData,controller:controller,action:action});    
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
    var careersDetail = {};  
    var action = 'add'; 
    var errorData = {};
	LoginUser = req.session ;   
    if (req.method == "POST") {
        
        var input = JSON.parse(JSON.stringify(req.body));
        /*
		var upload = multer({storage: storage}).single('myfile') ;
		upload(req, res, function(err) {
			if(murl) {
				url                     = murl;
			}else {
				url  = req.param('old_banner_url');
			}
		});
		
  		*/
        req.checkBody('name', 'Name is required').notEmpty();
			req.checkBody('address', 'Address is required').notEmpty();
			req.checkBody('salary', 'Salary is required').notEmpty();
			req.checkBody('experience', 'Experience is required').notEmpty();
			req.checkBody('industry_preferred', 'Industry preferred is required').notEmpty();
			req.checkBody('qualification', 'Please qualification !').notEmpty();	
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
            var msg =  'Careers added successfully.';		
            var saveResult = await Careers.saveData(input);   
            req.flash('success', msg)   
            res.locals.message = req.flash();  
            if(saveResult){  
                res.set('content-type' , 'text/html; charset=mycharset');  
                return res.redirect(nodeAdminUrl+'/careers/list');     
            }     
        } 
    }  
    res.render('admin/careers/add',{page_title:page_title,data:data,LoginUser:LoginUser,errorData:errorData,controller:controller,action:action});    
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
   
    var careersDetail = {}; 
    if(req.params.id){
        var cat_id =  String("'"+req.params.id+"'");    
        careersDetail = await Careers.deleteRecord(cat_id);  
        if(careersDetail.length == 0){  
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/Careers/list'); 
        }else{
            req.flash('success', 'Record deleted succesfully.');    
            return res.redirect(nodeAdminUrl+'/Careers/list');  
        }   
    }else{ 
        req.flash('error', 'Invalid url.');   
        return res.redirect(nodeAdminUrl+'/Careers/list');      
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
        careersDetail = await Careers.deactivateRecord(cat_id);  
        if(careersDetail.length == 0){  
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/Careers/list'); 
        }else{
            req.flash('success', 'Record deleted succesfully.');    
            return res.redirect(nodeAdminUrl+'/Careers/list');  
        }   
    }else{ 
        req.flash('error', 'Invalid url.');   
        return res.redirect(nodeAdminUrl+'/Careers/list');      
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
        careersDetail = await Careers.activateRecord(cat_id);  
        if(careersDetail.length == 0){  
            req.flash('error', 'Invalid url')  
            return res.redirect(nodeAdminUrl+'/Careers/list'); 
        }else{
            req.flash('success', 'Record deleted succesfully.');    
            return res.redirect(nodeAdminUrl+'/Careers/list');  
        }   
    }else{ 
        req.flash('error', 'Invalid url.');   
        return res.redirect(nodeAdminUrl+'/Careers/list');      
    }    
};          
exports.activateRecord = activateRecord; 
   
