window.onload = function () {
    // Simple Object format of items and prices in cents
    const order = {hotdogs:'400', fries:'350', soda:'150', saurkraut:'100'};
    document.getElementById("order").addEventListener('click', () => getTotals(order));
};

function getTotals(order) {
    var total = ((hotdogs.value * order.hotdogs) + (fries.value * order.fries) + 
    (soda.value * order.soda) + (saurkraut.value * order.saurkraut));
    presentOrder(total);
}
