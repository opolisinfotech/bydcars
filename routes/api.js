var express = require('express');
var router = express.Router();

var AdminController    =  require('../controllers/admin/AdminController');
var TestdriveController    =  require('../controllers/admin/TestdriveController');
var DealersController    =  require('../controllers/admin/DealersController');
var NewsController    =  require('../controllers/admin/NewsController');
var DownloadController    =  require('../controllers/admin/DownloadController');
var EventsController    =  require('../controllers/admin/EventsController');
var HomesliderController    =  require('../controllers/admin/HomesliderController');
var MediaController    =  require('../controllers/admin/MediaController');
var CmsController    =  require('../controllers/admin/CmsController');
var SmecontactController    =  require('../controllers/admin/SmecontactController'); 
var SupportcontactController    =  require('../controllers/admin/SupportcontactController');
var ContactController    =  require('../controllers/admin/ContactController');
var NewsletterController    =  require('../controllers/admin/NewsletterController');     
var CategoriesController    =  require('../controllers/admin/CategoriesController');
var CareersController    =  require('../controllers/admin/CareersController');  

/** Routes for admin  */ 
router.get('/admin/login', AdminController.login);     
router.post('/admin/login', AdminController.login);
router.get('/admin/updatepassword', requiredAuthentication, AdminController.updatepassword); 
router.post('/admin/updatepassword', requiredAuthentication, AdminController.updatepassword);      
router.get('/admin/Dashboard', requiredAuthentication, AdminController.dashboard); 

/** Routes for Test Drive module  */ 
router.get('/admin/Testdrive/list', requiredAuthentication , TestdriveController.list);     
router.get('/admin/Testdrive/edit/:id', requiredAuthentication, TestdriveController.edit);     
router.post('/admin/Testdrive/edit/:id', requiredAuthentication, TestdriveController.edit); 
router.post('/admin/Testdrive/add', requiredAuthentication, TestdriveController.add); 
router.get('/admin/Testdrive/add', requiredAuthentication, TestdriveController.add); 
router.get('/admin/Testdrive/delete/:id', requiredAuthentication, TestdriveController.deleteRecord);

/** Routes for Dealers module  */ 
router.get('/admin/Dealers/list', requiredAuthentication , DealersController.list);     
router.get('/admin/Dealers/edit/:id', requiredAuthentication, DealersController.edit);     
router.post('/admin/Dealers/edit/:id', requiredAuthentication, DealersController.edit); 
router.post('/admin/Dealers/add', requiredAuthentication, DealersController.add); 
router.get('/admin/Dealers/add', requiredAuthentication, DealersController.add); 
router.get('/admin/Dealers/delete/:id', requiredAuthentication, DealersController.deleteRecord);
router.get('/admin/Dealers/activate/:id', requiredAuthentication, DealersController.activateRecord);
router.get('/admin/Dealers/deactivate/:id', requiredAuthentication, DealersController.deactivateRecord);

/** Routes for News module  */ 
router.get('/admin/News/list', requiredAuthentication , NewsController.list);     
router.get('/admin/News/edit/:id', requiredAuthentication, NewsController.edit);     
router.post('/admin/News/edit/:id', requiredAuthentication, NewsController.edit); 
router.post('/admin/News/add', requiredAuthentication, NewsController.add); 
router.get('/admin/News/add', requiredAuthentication, NewsController.add); 
router.get('/admin/News/delete/:id', requiredAuthentication, NewsController.deleteRecord);
router.get('/admin/News/activate/:id', requiredAuthentication, NewsController.activateRecord);
router.get('/admin/News/deactivate/:id', requiredAuthentication, NewsController.deactivateRecord);

/** Routes for Events module  */ 
router.get('/admin/Events/list', requiredAuthentication , EventsController.list);     
router.get('/admin/Events/edit/:id', requiredAuthentication, EventsController.edit);     
router.post('/admin/Events/edit/:id', requiredAuthentication, EventsController.edit); 
router.post('/admin/Events/add', requiredAuthentication, EventsController.add); 
router.get('/admin/Events/add', requiredAuthentication, EventsController.add); 
router.get('/admin/Events/delete/:id', requiredAuthentication, EventsController.deleteRecord);
router.get('/admin/Events/activate/:id', requiredAuthentication, EventsController.activateRecord);
router.get('/admin/Events/deactivate/:id', requiredAuthentication, EventsController.deactivateRecord);

/** Routes for Homeslider module  */ 
router.get('/admin/Homeslider/list', requiredAuthentication , HomesliderController.list);     
router.get('/admin/Homeslider/edit/:id', requiredAuthentication, HomesliderController.edit);     
router.post('/admin/Homeslider/edit/:id', requiredAuthentication, HomesliderController.edit); 
router.post('/admin/Homeslider/add', requiredAuthentication, HomesliderController.add); 
router.get('/admin/Homeslider/add', requiredAuthentication, HomesliderController.add); 
router.get('/admin/Homeslider/delete/:id', requiredAuthentication, HomesliderController.deleteRecord);
router.get('/admin/Homeslider/activate/:id', requiredAuthentication, HomesliderController.activateRecord);
router.get('/admin/Homeslider/deactivate/:id', requiredAuthentication, HomesliderController.deactivateRecord);
/** Routes for Media module  */ 
router.get('/admin/Media/list', requiredAuthentication , MediaController.list);     
router.get('/admin/Media/edit/:id', requiredAuthentication, MediaController.edit);     
router.post('/admin/Media/edit/:id', requiredAuthentication, MediaController.edit); 
router.post('/admin/Media/add', requiredAuthentication, MediaController.add); 
router.get('/admin/Media/add', requiredAuthentication, MediaController.add); 
router.get('/admin/Media/delete/:id', requiredAuthentication, MediaController.deleteRecord);
router.get('/admin/Media/activate/:id', requiredAuthentication, MediaController.activateRecord);
router.get('/admin/Media/deactivate/:id', requiredAuthentication, MediaController.deactivateRecord);

/** Routes for Download module  */ 
router.get('/admin/Download/contactus', requiredAuthentication , DownloadController.contactus);
router.get('/admin/Download/supportcontact', requiredAuthentication , DownloadController.supportcontact);
router.get('/admin/Download/smecontact', requiredAuthentication , DownloadController.smecontact);
router.get('/admin/Download/newsletter', requiredAuthentication , DownloadController.newsletter);
router.get('/admin/Download/testdrive', requiredAuthentication , DownloadController.testdrive);
/** Routes for Dealers module  */ 
router.get('/admin/Cms/list', requiredAuthentication , CmsController.list);     
router.get('/admin/Cms/edit/:id', requiredAuthentication, CmsController.edit);     
router.post('/admin/Cms/edit/:id', requiredAuthentication, CmsController.edit); 
router.post('/admin/Cms/add', requiredAuthentication, CmsController.add); 
router.get('/admin/Cms/add', requiredAuthentication, CmsController.add); 
router.get('/admin/Cms/delete/:id', requiredAuthentication, CmsController.deleteRecord);
router.get('/admin/Cms/activate/:id', requiredAuthentication, CmsController.activateRecord);
router.get('/admin/Cms/deactivate/:id', requiredAuthentication, CmsController.deactivateRecord);

/** Routes for Smecontact module  */ 
router.get('/admin/Smecontact/list', requiredAuthentication , SmecontactController.list);     
router.get('/admin/Smecontact/edit/:id', requiredAuthentication, SmecontactController.edit);     
router.post('/admin/Smecontact/edit/:id', requiredAuthentication, SmecontactController.edit); 
router.post('/admin/Smecontact/add', requiredAuthentication, SmecontactController.add); 
router.get('/admin/Smecontact/add', requiredAuthentication, SmecontactController.add); 
router.get('/admin/Smecontact/delete/:id', requiredAuthentication, SmecontactController.deleteRecord);

/** Routes for Supportcontact module  */ 
router.get('/admin/Supportcontact/list', requiredAuthentication , SupportcontactController.list);     
router.get('/admin/Supportcontact/edit/:id', requiredAuthentication, SupportcontactController.edit);     
router.post('/admin/Supportcontact/edit/:id', requiredAuthentication, SupportcontactController.edit); 
router.post('/admin/Supportcontact/add', requiredAuthentication, SupportcontactController.add); 
router.get('/admin/Supportcontact/add', requiredAuthentication, SupportcontactController.add); 
router.get('/admin/Supportcontact/delete/:id', requiredAuthentication, SupportcontactController.deleteRecord);

/** Routes for Supportcontact module  */ 
router.get('/admin/Contact/list', requiredAuthentication , ContactController.list);     
router.get('/admin/Contact/edit/:id', requiredAuthentication, ContactController.edit);     
router.post('/admin/Contact/edit/:id', requiredAuthentication, ContactController.edit); 
router.post('/admin/Contact/add', requiredAuthentication, ContactController.add); 
router.get('/admin/Contact/add', requiredAuthentication, ContactController.add); 
router.get('/admin/Contact/delete/:id', requiredAuthentication, ContactController.deleteRecord);

/** Routes for Newsletter module  */ 
router.get('/admin/Newsletter/list', requiredAuthentication , NewsletterController.list);     
router.get('/admin/Newsletter/edit/:id', requiredAuthentication, NewsletterController.edit);     
router.post('/admin/Newsletter/edit/:id', requiredAuthentication, NewsletterController.edit); 
router.post('/admin/Newsletter/add', requiredAuthentication, NewsletterController.add); 
router.get('/admin/Newsletter/add', requiredAuthentication, NewsletterController.add); 
router.get('/admin/Newsletter/delete/:id', requiredAuthentication, NewsletterController.deleteRecord);
    
/** Routes for category module  */ 
router.get('/admin/Categories/list', requiredAuthentication , CategoriesController.list);     
router.get('/admin/Categories/edit/:id', requiredAuthentication, CategoriesController.edit);     
router.post('/admin/Categories/edit/:id', CategoriesController.edit); 
router.post('/admin/Categories/add', requiredAuthentication, CategoriesController.add); 
router.get('/admin/Categories/add', requiredAuthentication, CategoriesController.add); 
router.get('/admin/Categories/delete/:id', requiredAuthentication, CategoriesController.deleteRecord);   

/** Routes for Careers module  */ 
router.get('/admin/Careers/list', requiredAuthentication , CareersController.list);     
router.get('/admin/Careers/edit/:id', requiredAuthentication, CareersController.edit);     
router.post('/admin/Careers/edit/:id', requiredAuthentication, CareersController.edit); 
router.post('/admin/Careers/add', requiredAuthentication, CareersController.add); 
router.get('/admin/Careers/add', requiredAuthentication, CareersController.add); 
router.get('/admin/Careers/delete/:id', requiredAuthentication, CareersController.deleteRecord);
router.get('/admin/Careers/activate/:id', requiredAuthentication, CareersController.activateRecord);
router.get('/admin/Careers/deactivate/:id', requiredAuthentication, CareersController.deactivateRecord);

router.get('/admin/logout', AdminController.logout);         
module.exports = router;       

function requiredAuthentication(req, res, next) {
    next(); 
    // if(req.session){
    //     LoginUser = req.session.LoginUser; 
    //     if(LoginUser){    
    //         next();   
    //     }else{
    //         res.redirect(nodeAdminUrl+'/login');       
    //     } 
    // }else{
    //     res.redirect(nodeAdminUrl+'/login');       
    // }
}