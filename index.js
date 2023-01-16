const registrate = require('./controllers/createNewUser');
const authorizate = require('./controllers/authorizateUser');
const imagesController = require('./controllers/imagesController');
const staffController = require('./controllers/staffController');
const recordsController = require('./controllers/recordsController');
const servicesController = require('./controllers/servicesController');

const http = require('https');
const url = require('url');
const cors = require('cors');


const server = http.createServer(async (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Request-Method', '*');
  response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  response.setHeader('Access-Control-Allow-Headers', '*');


  let urlParts = url.parse(request.url, true);

  if (request.method === 'GET') {
      switch(urlParts.pathname) {
          case "/": {
              await imagesController(request, response);
              break;
          }
          case "/staff": {
              await staffController(request, response);
              break;
          }
          case '/services': {
              await servicesController.getShortServices(request, response);
              break;
          }
      }
  }

  if (request.method === 'POST') {
    switch (urlParts.pathname) {
      case "/login": {
        await registrate(request, response);
        break;
      }
      case "/signup": {
        await authorizate(request, response);
        break;
      }
      case '/newRecord': {
          await recordsController.createRecord(request, response);
          break;
      }
      case '/deleteRecord': {
          await recordsController.deleteRecord(request, response);
          break;
      }
      case '/records': {
          await recordsController.getRecords(request, response);
          break;
      }
    }

    if (urlParts.pathname.includes('/service/')) {
        const pathArr = urlParts.pathname.split('/');
        const id = pathArr.slice(-1);
        await servicesController.getFullServices(request, response)
    }
  }
}).listen(4000);
