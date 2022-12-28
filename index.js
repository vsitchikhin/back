const registrate = require('./controllers/createNewUser');
const authorizate = require('./controllers/authorizateUser');
const imagesController = require('./controllers/imagesController');
const recordsController = require('./controllers/recordsController');
const servicesController = require('./controllers/servicesController');

const http = require('http');
const url = require('url');
const cors = require('cors');



http.createServer(async (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Request-Method', '*');
  response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  response.setHeader('Access-Control-Allow-Headers', '*');


  let urlParts = url.parse(request.url, true);

  if (request.method === 'GET') {
      switch(urlParts.pathname) {
          case "/": {
              imagesController(request, response);
              break;
          }
          case '/services': {
              servicesController.getShortServices(request, response);
              break;
          }
          case '/records': {
              recordsController.getRecords(request, response);
              break;
          }
      }

      if (urlParts.pathname.includes('/service/')) {
          const pathArr = urlParts.pathname.split('/');
          const id = pathArr.slice(-1);
          // вернуть запись по id
          servicesController.getFullServices(request, response, id)
          // console.log(`this is service ${id}`)
      }
  }

  if (request.method === 'POST') {
    switch (urlParts.pathname) {
      case "/signup": {
        registrate(request, response);
        break;
      }
      case "/login": {
        authorizate(request, response);
        break;
      }
      case '/newRecord': {
          recordsController.createRecord(request, response);
          break;
      }
      case '/deleteUser': {

          break;
      }
      case '/deleteRecord': {
          break;
      }
    }
  }
}).listen(4000);


