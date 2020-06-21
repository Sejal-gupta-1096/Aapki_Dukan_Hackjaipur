let amount = $(".amt");
let qty = $(".qty")
console.log(amount , qty)

function totalAmount(){
    let sum = 0;
    for(let i = 0 ; i < amount.length ; i++){
        let t = eval(amount[i].innerHTML * qty[i].textContent);
        sum = sum + t;
        
    }

    $(".total__price").text(sum)
}

function totalAmountOfEachProduct(){
    let total = $(".total");
    console.log(amount , qty , total)
    for(let i = 0 ; i < amount.length ; i++){
        total[i].innerHTML = eval(amount[i].innerHTML * qty[i].textContent);
        
    }
}

function checkoutTotal(){
    let total = $(".total");
    console.log(amount , qty , total)
    let sum = 0;
    for(let i = 0 ; i < amount.length ; i++){
        let t  = eval(amount[i].innerHTML * qty[i].textContent);
        sum = sum + t;
    }
    sum = sum + 9;
    $(".tp").text(sum)
}

totalAmount();
