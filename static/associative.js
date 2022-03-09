window.onload = function () {
    // Associative Array of items and prices in cents
    menu = [];
    menu["hotdogs"] = 400
    menu["fries"] = 350
    menu["soda"] = 150
    menu["saurkraut"] = 100
    document.getElementById("order").addEventListener('click', () => getTotals(menu));
}

function getTotals(menu) {
    var total = ((hotdogs.value * menu.hotdogs) + (fries.value * menu.fries) + 
    (soda.value * menu.soda) + (saurkraut.value * menu.saurkraut));
    presentOrder(total);
}
