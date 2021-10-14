let money = 1000000000;
years = 2;

function investation (money, years){
    let bank = money * 0.35;
    let bonds = money * 0.65;
    let stateBonds = bonds * 0.3;
    let stockA = bonds * 0.35;
    let stockB = bonds * 0.35;

    for(let i = 0; i < years; i++){
        bank += (bank * (3.5/100));
        stateBonds += (stateBonds * (13/100));
        stockA += (stockA * (14.5/100));
        stockB += (stockB * (12.5/100));
    }
    console.log(`total money: Rp. ${bank + stateBonds + stockA + stockB}`);
}

investation(money, years);
