function totalAmountOfEachProduct(){
    
    let amount = $(".amt");
    let qty = $(".qty");
    let total = $(".total");
    console.log(amount , qty , total)
    
    for(let i = 0 ; i < amount.length ; i++){
        total[i].innerHTML = amount[i].innerHTML * qty[i].value;
    }
}

totalAmountOfEachProduct();