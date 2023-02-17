'use strict';


module.exports = ( req, res, next ) => {
  
  if(req.query.name) {
    // send valid queries through
    next();
  } else {

    next('QUERY NAME REQUIRED');
  }
};

