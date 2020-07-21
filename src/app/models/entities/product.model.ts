

export class ProductModel {

    productId: number;
    productName: string;
    

    classname: string;
    categories: string;
    subcategory: string;
    measurementUnit: string;
    imageUrl: string;
    price: number;
    quantity: number;
    total: number;
    stock:string;
    storeProductId:string
    constructor(
        productId: number,
        productName: string,
        
        classname: string,
        categories: string,
        subcategory: string,
        measurementUnit: string,
        imageUrl: string,
        price: number,
        stock:string,
        storeProductId:string,
    ) {

        this.productId = productId;
        this.productName = productName;
        this.classname = classname;
        this.categories = categories;
        this.subcategory = subcategory;
        this.measurementUnit = measurementUnit.toLocaleLowerCase();
        this.imageUrl = imageUrl == "NULL" ? './assets/img/img_not_found.jpg' : imageUrl;
        this.price = price;
        this.quantity = measurementUnit.toLocaleLowerCase() == "kg" ? 0.10 : 1;
        this.total = Number(this.price) * Number(this.quantity);
        this.stock =  stock == 'S' ? 'SI' : 'NO';
        this.storeProductId = storeProductId;


    }


}

