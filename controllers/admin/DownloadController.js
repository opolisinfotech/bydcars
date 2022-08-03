var Request = require("request"); 
var Download = require.main.require('./models/Download');
var Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';    
const controller = 'download'; 

/** 
 *  contactus
 *  Purpose: This function is used to show listing of all arecord
 *  Pre-condition:  None
 *  Post-condition: None. 
 *  Parameters: ,
 *  Returns: json   
*/

async function contactus(req, res) { 
    res.set('content-type' , 'text/html; charset=mycharset'); 
    data = {};    
    action = 'contactus';
	LoginUser = req.session ;	
    const dataList = await Download.getAllContactUs();
    console.log(dataList);
    // -> Convert JSON to CSV data
    const csvFields = ['sn', 'name', 'phoneno', 'emailid', 'query_type', 'message', 'request_time'];
    const json2csvParser = new Json2csvParser({ csvFields });
    const csv = json2csvParser.parse(dataList);
     console.log(csv);
     res.setHeader("Content-Type", "text/csv");
     res.setHeader("Content-Disposition", "attachment; filename=contact_us.csv");
     res.status(200).end(csv);	
};       
exports.contactus = contactus;

async function supportcontact(req, res) { 
    res.set('content-type' , 'text/html; charset=mycharset'); 
    data = {};    
    action = 'supportcontact';
	LoginUser = req.session ;	
    const dataList = await Download.getAllSupportContact();
    console.log(dataList);
    // -> Convert JSON to CSV data
    const csvFields = ['sn', 'name', 'phoneno', 'emailid', 'message', 'request_time'];
    const json2csvParser = new Json2csvParser({ csvFields });
    const csv = json2csvParser.parse(dataList);
     console.log(csv);
     res.setHeader("Content-Type", "text/csv");
     res.setHeader("Content-Disposition", "attachment; filename=supportcontact.csv");
     res.status(200).end(csv);	
};       
exports.supportcontact = supportcontact;

async function smecontact(req, res) { 
    res.set('content-type' , 'text/html; charset=mycharset'); 
    data = {};    
    action = 'smecontact';
	LoginUser = req.session ;	
    const dataList = await Download.getAllSmeContact();
    console.log(dataList);
    // -> Convert JSON to CSV data
    const csvFields = ['sn', 'emailid', 'message', 'message_date'];
    const json2csvParser = new Json2csvParser({ csvFields });
    const csv = json2csvParser.parse(dataList);
     console.log(csv);
     res.setHeader("Content-Type", "text/csv");
     res.setHeader("Content-Disposition", "attachment; filename=smecontact.csv");
     res.status(200).end(csv);	
};       
exports.smecontact = smecontact;

async function newsletter(req, res) { 
    res.set('content-type' , 'text/html; charset=mycharset'); 
    data = {};    
    action = 'newsletter';
	LoginUser = req.session ;	
    const dataList = await Download.getAllSubscriber();
    console.log(dataList);
    // -> Convert JSON to CSV data
    const csvFields = ['sn', 'emailid', 'request_time'];
    const json2csvParser = new Json2csvParser({ csvFields });
    const csv = json2csvParser.parse(dataList);
     console.log(csv);
     res.setHeader("Content-Type", "text/csv");
     res.setHeader("Content-Disposition", "attachment; filename=newsletter.csv");
     res.status(200).end(csv);	
};       
exports.newsletter = newsletter;

async function testdrive(req, res) { 
    res.set('content-type' , 'text/html; charset=mycharset'); 
    data = {};    
    action = 'testdrive';
	LoginUser = req.session ;	
    const dataList = await Download.getAllTestDrive();
    console.log(dataList);
    // -> Convert JSON to CSV data
    const csvFields = ['sn', 'name', 'phoneno', 'emailid', 'state', 'city', 'dealer', 'request_time'];
    const json2csvParser = new Json2csvParser({ csvFields });
    const csv = json2csvParser.parse(dataList);
     console.log(csv);
     res.setHeader("Content-Type", "text/csv");
     res.setHeader("Content-Disposition", "attachment; filename=testdrive.csv");
     res.status(200).end(csv);	
};       
exports.testdrive = testdrive;
