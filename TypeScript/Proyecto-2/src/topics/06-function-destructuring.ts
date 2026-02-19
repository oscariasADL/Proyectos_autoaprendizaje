interface Product{
    description:string;
    price:number;
    getPrice: () => number;
}

const phone: Product = {
    description: 'Nokia A1',
    price: 120.00,
    getPrice(){
        return this.price;
    }
}

const tablet: Product = {
    description: 'iPad Pro',
    price: 450.00,
    getPrice(){
        return this.price;
    }
}

interface TaxCalculationOptions{
    tax: number;
    products: Product[];
}



function taxCalculation( options: TaxCalculationOptions): number[] {

    let total = 0;

    options.products.forEach( product => {
        total += product.price;
    });

    return [total, total * options.tax];

}


const shoppingCart = [phone, tablet];
const tax = 0.15;


const result = taxCalculation({
    products: shoppingCart,
    tax: tax
});


console.log('Total: ', result[0]);
console.log('Tax: ', result[1]);


export{};