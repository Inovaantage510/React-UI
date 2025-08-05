import React from 'react';

import "./errorhandler.css";
import { Helmet } from 'react-helmet';

const Errorhandler = () => { 

    return ( 

         <>
         <Helmet>
          <title>Inovaantage not found page</title>
         </Helmet>

          <div id="notfound"></div>
          <div id="policy">
           Terms and conditions&nbsp;&nbsp;|&nbsp;&nbsp;Privacy policy&nbsp;&nbsp;|&nbsp;&nbsp;info@inovaantage.com 
          </div>
         </>

    ); 
};
export default Errorhandler;