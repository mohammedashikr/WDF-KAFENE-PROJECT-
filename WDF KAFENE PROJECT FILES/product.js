function readpost(){
    var a= new XMLHttpRequest();
    a.open("GET","https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products",true);
    a.send();
    a.onreadystatechange=function(){
        // console.log(this.readyState)
        // console.log(this.status)
        if(this.status==200 && this.readyState==4){
            // console.log(this.responseText)
            // console.log(typeof(this.responseText))
            var main_data =JSON.parse(this.responseText);
            // console.log(main_data)
            // console.log(typeof(main_data))
            displayProducts(main_data);
        }
        else{
            console.log('Error',a.status)
        }
    }
}
// readpost()

function displayProducts(main_data){

    var productdata =document.getElementById('productsdata')
    var totalcount=document.getElementById('ptag');
    productdata.innerHTML='';

    var ptag=0;

    main_data.filter(element => {
        const{id,medicineName,medicineBrand,expiryDate,unitPrice,stock}= element;

        const expiry =document.getElementById('Expired').checked;
        const Lowstock =document.getElementById('Low_stock').checked;

        const currentDate =new Date();

        const expired =new Date(expiryDate)<currentDate;
        const stockvalue = parseInt(stock) < 100;

        if((expired && expiry) || (Lowstock && stockvalue)){
            var text = document.createElement('tr');
            text.innerHTML=`
            <td>${id}</td>
            <td>${medicineName}</td>
            <td>${medicineBrand}</td>
            <td>${expiryDate}</td>
            <td>${unitPrice}</td>
            <td>${stock}</td>`;
            
            productdata.appendChild(text);
            ptag++;
        }
    });
    totalcount.textContent = `Count: ${ptag}`;
}

function checkbox(){
    readpost();
}

document.getElementById('Expired').addEventListener('change',checkbox);
document.getElementById('Low_stock').addEventListener('change',checkbox)

readpost();