function totalAmount(){
    
    let amount = $(".amt");
    let qty = $(".qty")
    console.log(amount , qty)
    let sum = 0;
    for(let i = 0 ; i < amount.length ; i++){
        let t = eval(amount[i].innerHTML * qty[i].textContent);
        sum = sum + t;
        
    }

    $(".total__price").text(sum)
}

function totalAmountOfEachProduct(){
    
    let amount = $(".amt");
    let qty = $(".qty");
    let total = $(".total");
    console.log(amount , qty , total)
    let sum = 0;
    for(let i = 0 ; i < amount.length ; i++){
        total[i].innerHTML = eval(amount[i].innerHTML * qty[i].textContent);
        
    }
}

totalAmount();
totalAmountOfEachProduct()