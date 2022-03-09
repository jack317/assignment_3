// Helper JS file with repeated values
window.onload = function () {
    hotdogs = document.getElementById("hotdogs");
    fries = document.getElementById("fries");
    soda = document.getElementById("soda");
    saurkraut = document.getElementById("saurkraut");
}

// Helper function to take in the grand total display it correctly and display the order. 
function presentOrder(total) {
    total = total/100
    document.getElementById("hotdog-quantity").innerHTML = `${hotdogs.value}`;
    document.getElementById("fries-quantity").innerHTML = `${fries.value}`;
    document.getElementById("soda-quantity").innerHTML = `${soda.value}`;
    document.getElementById("saurkraut-quantity").innerHTML = `${saurkraut.value}`;
    document.getElementById("customer-order").style.display='block';
    document.getElementById("customer-total").innerHTML = `Your Total is: $${total.toFixed(2)}`;
}