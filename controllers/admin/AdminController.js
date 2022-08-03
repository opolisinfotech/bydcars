var Request = require("request");
var Users = require.main.require('./models/Users'); 
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';    
const controller = 'admin';

/** 
	 *  login
     *  Purpose: This function is used for login
	 *  Pre-condition:  None
	 *  Post-condition: None. 
	 *  Parameters: ,
	 *  Returns: void 
*/ 
// Validation rules.
async function login(req, res) {  
    res.set('content-type' , 'text/html; charset=mycharset');
    req.role_id = 0;
    data = {};
    var action = 'login';
    errorData = {};
    var adminDetail = {};
    if(req.session){
        LoginUser = req.session.LoginUser; 
        if(LoginUser){ 
            res.redirect(nodeAdminUrl+'/dashboard');  
        }  
    } 
    if (req.method == "POST") { 
	    var input = JSON.parse(JSON.stringify(req.body));   
        req.checkBody('email', 'Username must be an email address!').isEmail();
        req.checkBody('password', 'Password is required!').notEmpty();  
        var errors = req.validationErrors();  
		if(errors){	   
                if(errors.length > 0){
                    errors.forEach(function (errors1) {
                        var field1 = String(errors1.param); 
                        var msg = errors1.msg; 
                        errorData[field1] = msg;   
                    }); 
                } 
             res.set('content-type' , 'text/html'); 
			 res.render('admin/login',{page_title:"Admin - Login",data:input,errorData:errorData});          
        }else{
            // Decrypt password with password hash
			/*
            var salt = bcrypt.genSaltSync(saltRounds);
            var password = bcrypt.hashSync(input.password, salt);
            input.password = password;
			*/
			adminDetail = await Users.getUserByLogin(input);
			if( adminDetail.length != 0 ){
				req.session.username = adminDetail[0].email ;
				req.session.nick_name = adminDetail[0].name ;		   
				req.session.userid = adminDetail[0].id ;
				req.session.loggedin = true ;
				
				// save the session before redirection to ensure page
				// load does not happen before session is saved
				req.session.save(function (err) {
					if (err) return next(err)
					res.set('content-type' , 'text/html; charset=mycharset');  
					res.redirect(nodeAdminUrl+'/dashboard');
				}) ;
			}else {
				errorData['loginError'] = "Please check your login details !";
				res.set('content-type' , 'text/html'); 
				res.render('admin/login',{page_title:"Admin - Login",data:input,errorData:errorData}); 
			} 
        
		}
    }else {
        res.set('content-type' , 'text/html'); 
        res.render('admin/login',{page_title:"Admin - Login",data:data,errorData:errorData}); 
    }
    
};  
exports.login = login;

/** 
 *  dashboard
 *  Purpose: This function is used to show dashboard
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json  
*/
async function dashboard(req, res) {  

    var action = 'login';
    res.set('content-type' , 'text/html; charset=mycharset'); 
    data = {}; LoginUser = {};errorData = {};
	LoginUser = req.session ;
    res.render('admin/dashboard',{page_title:"Admin - Dashboard",data:data,LoginUser:LoginUser,controller:controller,action:action});   
    
};  
exports.dashboard = dashboard;


/** 
 *  logout
 *  Purpose: This function is used to logout
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json  
*/
async function logout(req, res) {  
      
    res.set('content-type' , 'text/html; charset=mycharset'); 
    data = {}; LoginUser = {};errorData = {};
    if(req.session){
        req.session.destroy(function (err) {
            res.redirect(nodeAdminUrl+'/login');  
        });  
    }   
    res.redirect(nodeAdminUrl+'/login');     
};  
exports.logout = logout;

/** 
 *  Edit
 *  Purpose: This function is used to get constructor List
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json  
*/
async function updatepassword(req, res) { 
   
    res.set('content-type' , 'text/html; charset=mycharset'); 
    var action = 'updatepassword';
    var usersDetail = {}; 
    var errorData = {};
	LoginUser = req.session ;
	const dataList = await Users.getUserByid(req.session.userid);	
    if (req.method == "POST") { 
            var input = JSON.parse(JSON.stringify(req.body)); 
			req.checkBody('password', 'New password is required').notEmpty().isLength({min:6, max:16}).withMessage('Password must be between 4 to 16 characters') ;
			req.checkBody('confirm_pass', 'Passwords do not match').equals(req.body.password);
            var errors = req.validationErrors();			
            if(errors){	  
                if(errors.length > 0){
                    errors.forEach(function (errors1) {
                        var field1 = String(errors1.param); 
                        var msg = errors1.msg; 
                        errorData[field1] = msg;
                    }); 
                } 
                   
            }else{  
                var saveResult = ''; 
				var msg =  'Users updated successfully.';
                delete input['confirm_pass'];
				input['id'] = req.session.id; 				
                var saveResult = await Users.updateData(input);  
                req.flash('success', msg)   
                res.locals.message = req.flash(); 
                if(saveResult){  
                    res.set('content-type' , 'text/html; charset=mycharset');  
                    return res.redirect(nodeAdminUrl+'/dashboard');     
                }     
            } 
        } 
	res.render('admin/updatepassword',{page_title:"Admin - update password",data:dataList,errorData:errorData,LoginUser:LoginUser,controller:controller,action:action});    
};         
exports.updatepassword = updatepassword; 

/**  
 *  updateBankDetail
 *  Purpose: This function is used to updateBankDetail
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: void 
*/
async function submitReview(req, res) { 
  // try {
        const validationResult = require('express-validator'); 
        var reaponseArr = '{}'; 
        var input = JSON.parse(JSON.stringify(req.body));  
        var auth_token = req.headers.authtoken; 
        //req.checkBody('contractor_id', 'contractor_id is required').notEmpty();
        req.checkBody('project_id', 'project_id is required').notEmpty();
        req.checkBody('rating', 'Rating is required').notEmpty();
        req.checkBody('reviewer_id', 'reviewer_id is required').notEmpty(); 
        //req.checkBody('review', 'review is required').notEmpty();   
        var errors = req.validationErrors();  
        if(!auth_token){   	 		 
            return res.send(JSON.stringify({ 
                "status": SessionExpireStatus,
                "message": 'Session Expired.',  
            }));	  		 
        }
        if(errors){	  		 
            return res.send(JSON.stringify({
                "status": failStatus,
                "message": errors[0].msg, 
            })); 	  		 
        }else{ 
            var respondeArray = {};
            const CheckAuthentication = await Users.CheckAuthentication(auth_token);   // Check Authentication  
            if(CheckAuthentication.length > 0){
                var constructor_id = '';
                const projectDetail = await Projects.getProjectById(input.project_id);  
                if(projectDetail.length > 0){ 
                    constructor_id = projectDetail[0].contractor_id;   
                    const checkUser = await Users.getUserByid(constructor_id);  
                    const customerDetail = await Users.getUserByid(projectDetail[0].user_id);   
                    if(checkUser.length > 0){ 

                        var reviewData = {  
                            user_id    : constructor_id,      
                            rating : input.rating,     
                            reviewer_id : input.reviewer_id, 
                            project_id : input.project_id,    
                        }; 
                        if (typeof input.review !== 'undefined' && input.review != null && input.review != '') {
                            reviewData.review = input.review;
                        } 
                        var msg =  'Review added successfully.'; 
                        var saveRecord = await Reviews.saveData(reviewData); 
                        //console.log(reviewData);      
                        if(saveRecord){ 

                            var rating = await Reviews.getOverallRating(constructor_id);               // Get avg rating 
                            var updateData = {is_rated : 1,id : input.project_id}; 
                            var rated = await Projects.updateById(updateData);                          // Update project status 
                            
                            var ratingData = {rating : parseFloat(rating).toFixed(1), user_id : constructor_id}        
                            var updateRating = await BussinessProfiles.updateRating(ratingData);      // Update overall rating  
                            
                            // Send notification to customer 
                            var notification_data = {
                                user_id : constructor_id,  
                                message : customerDetail[0].first_name+' submitted review on your project.',  
                                title : 'Review and rating.' , 
                                type : REVIEW_NOTIFICATION_TYPE,  
                                type_id : input.project_id, 
                                sender_id : input.reviewer_id 
                            }  
                            Auth.sendNotificationAndroid(notification_data,function(notificationResult){
                                //console.log(notificationResult);     
                            });   
                            return res.send(JSON.stringify({    
                                "status": successStatus, 
                                "message": msg,  
                                "data": {},          
                            })); 
                            
                        }else{
                            return res.send(JSON.stringify({ 
                                "status": failStatus,  
                                "message": 'Data could  not updated. Please try again.',
                                "data": respondeArray  
                            })); 
                        }  
                    }else{
                        return res.send(JSON.stringify({ 
                            "status": failStatus,  
                            "message": 'Invalid user_id.',
                            "data": respondeArray  
                        })); 
                    }  
                }else{
                    return res.send(JSON.stringify({ 
                        "status": failStatus,  
                        "message": 'Invalid project_id.',
                        "data": respondeArray  
                    })); 
                }
            }else{
                return res.send(JSON.stringify({ 
                    "status": failStatus,  
                    "message": 'Session expired.', 
                    "data": respondeArray   
                })); 
            }   
        } 
    // } catch (err) {
    //     return res.send(JSON.stringify({
    //         "status": failStatus,
    //         "message": err, 
    //     })); 
    // }  
    return false;  
}; 
exports.submitReview = submitReview;   
  