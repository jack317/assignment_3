window.onload = function () {
    hotdogsItem = new MenuItem("hotdogs", 400);
    friesItem = new MenuItem("fries", 350);
    sodaItem = new MenuItem("soda", 150);
    saurkrautItem = new MenuItem("saurkraut", 100);
    document.getElementById("order").addEventListener('click', () => getTotals());
}

class MenuItem {
    constructor(item, price)
    {
        this.item = item;
        this.price = price;
    }
    total()
    {
        return document.getElementById(this.item).value * this.price
    }
}

function getTotals() {
    var grandTotal = hotdogsItem.total() + friesItem.total() + sodaItem.total() + 
    saurkrautItem.total();
    presentOrder(grandTotal);
}
