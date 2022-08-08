import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import FormDataValidation from './FormDataValidation';

function App() {
  /*
     Email Validation : 

     /[a-z]{2,5}[\S]?([\d]{2,4})?(\.?-?_?)([a-z]{2,4})?@[\S]?[a-z]{2,5}([\d]{2,4})?(_?)([\S]?)\.[\S]?[a-z]{2,3}/gi

      samim@gmail.com
      admin@web.net
      samim_info@gmail.com
      samim-_@gmail.com
      samim2334@gmail23.com
      samim@harun_.bd
      123@gmail.com
      asa45@gmai.com
      sa@gmail.com

      url validation

      /(http(s)?)?[\S]?(:\/\/)?[\S]?(www)?[\S]?(\.)?[\S]?[\w-_]{2,20}[\S]?\.[a-z]{2,10}(\.bd)?/gi

      https://webdeveloper.net
      http://webdeveloper.net
      http://www.webdeveloper.net
      https://www.nu.ac.bd
      www.webdeveloper.net
      webdeveloper.net
      web_developer.net
      web-developer.net

      phone validation

      /\+?(\(?88\)?)?\d{11}/gi

      01759995363
      8801307216770
      +8801795349786
      (88)01759995363
      
  */
  return(
    <>
       <div>
          <h3 className='form-heading'>Form Validation</h3>
          <FormDataValidation />
       </div>
    </>
  )
}

export default App;
