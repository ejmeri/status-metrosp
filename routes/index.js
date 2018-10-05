
var router = require('express').Router();


router.get('/', (req, res) => {
    res.send(`
    <html>
        <head>
            <title>ChatBot São Paulo - Metro</title> 
        </head>
        <body>
            
        <div class="fb-customerchat"
            page_id="1811787798918205"
            ref=""
            minimized="<true|false>">
        </div>
    
            
    <script>
      window.fbAsyncInit = function() {
        FB.init({
          appId : '330744154360265',
          autoLogAppEvents : true,
          xfbml : true,
          version : 'v2.6'
        });
      };
      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    </script>
        </body>
    </html>
    `);
});

module.exports = app => app.use('/', router);
