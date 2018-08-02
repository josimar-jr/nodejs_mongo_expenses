// Wait for user's response
var process = module.exports = {
  askingUser: function( text ){
    return readlineSync.question( `${text} >>`);
  },
  import: function( req, res ) {
    const XLSX = require('xlsx');
    const Rx = require('rxjs');
    var User = require('./models/user.js');
    var Account = require('./models/account.js');
    var Category = require('./models/category.js');
    var Movement = require('./models/movement.js');

    console.time(`total process`);

    var userEmail = "user1@email.com"; //askingUser( `Email do usuario:` );

    // Read the file 
    var workbook = XLSX.readFile('./test/assets/__modelo.xlsx');
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    var userProcess;
    var accountProcess;
    var categProcess;

    User.findOneAndUpdate( {email: userEmail}, 
      {$set: {email: userEmail, firstName: 'User x', lastName: 'User x'}}, 
      {new: true, upsert: true}, 
      function (err, user) {
        if (err) {
          console.log(`erro na criacao de usuario ${err}`);
        } else {
          userProcess = user;
          xlData.map(
            function(x) {
              Account.findOneAndUpdate( { account: x.Conta, user_id: userProcess.id }, 
                {$set: { account: x.Conta, user_id: userProcess.id }}, 
                {new: true, upsert: true}, 
                function( err, acc ){
                  if (err) {
                    console.log(`erro na criacao de conta ${err}`);
                  } else {
                    accountProcess = acc;
                    
                    Category.findOneAndUpdate( { description: x.Categoria, user_id: userProcess.id }, 
                      { description: x.Categoria, user_id: userProcess.id },
                      {new: true, upsert: true}, 
                      function(err, cat){
                        if (err) {
                          console.log(`erro na criacao de categoria ${err}`);
                        } else {
                          categProcess = cat;
                          var valor = x.Valor;
                          var type = ( valor < 0 ? 'Receita' : 'Despesa' )
                          
                          Movement.create( {
                            user_id: userProcess.id,
                            movementDate: x.Data,
                            account_from: accountProcess.id,
                            category_id: categProcess.id,
                            title: x.Descrição,
                            value: valor,
                            movementType: type
                          }, function(err, cat){
                            if (err) {
                              console.log(`erro na criacao do movimento ${err}`);
                            //} else { 
                              // console.log(`movimento ${x.Descrição}/${valor} criado`);
                            }
                          } );
                        }
                      }
                    );
                  }
                }
              );
            }
          );
        }
        //console.timeEnd(`total process`);
        finishLog().then( x => console.timeEnd(`total process`));
        res.send('command import finished');
      }
    );
  }
}

function finishLog() {
  return new Promise((resolve, reject) => { // (A)
      setTimeout(() => resolve('DONE'), 750); // (B)
  });
}
