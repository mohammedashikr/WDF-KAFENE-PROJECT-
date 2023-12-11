
var loggedalready = sessionStorage.getItem('loggedIn');
if (loggedalready) {
    tonextpage();
}
   function checklogin(){
    var username =document.getElementById('name').value;
    var password=document.getElementById('password').value;

    if(username===password){
        alert('Login Successful!')
        tonextpage();
    }
    else{
        alert('Please enter the valid credentials!');
    }
   }

function tonextpage(){
    window.location.href='http://127.0.0.1:5500/orders.html'
}
