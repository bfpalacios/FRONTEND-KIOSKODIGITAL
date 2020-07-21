import { ProductModel } from 'src/app/models/entities/product.model';
import { ProductsPaginate } from '../models/paginates/products.paginate';


export function parseResponseToProducts(respose: any[], currentPage: number, total: number): ProductsPaginate {
    let paginateProducts: ProductsPaginate = new ProductsPaginate()
    let listProducts: ProductModel[] = [];
    respose.forEach((item) => {
        listProducts.push(new ProductModel(
            item.productTemplate.productTemplateId,
            item.productTemplate.description,
            item.productTemplate.class.name,
            item.productTemplate.category.name,
            item.productTemplate.subCategory.name,
            item.productTemplate.unitMeasure,
            item.productTemplate.pathImage,
            item.price,
            item.stock,
            item.storeProductId
        ))

    })

    paginateProducts.products = listProducts;
    paginateProducts.currentPage = currentPage;
    paginateProducts.numberPages = Math.ceil(total / 21);
    paginateProducts.numberPagesList = Array.from(Array(paginateProducts.numberPages).keys())
    paginateProducts.totalRows = total;
    paginateProducts.itemsPerPage = 21;

    return paginateProducts;
}

export function parseResponseToProductWithOutPaginate(response: any[]): ProductModel[] {
    let listProducts: ProductModel[] = [];
    response.forEach((item) => {
        listProducts.push(new ProductModel(
            item.productTemplateId,
            item.description,
            item.class.name,
            item.category.name,
            item.subCategory.name,
            item.unitMeasure,
            item.pathImage,
            0.0,
            item.stock,
            item.storeProductId
        ))

    })
    return listProducts;
}

export function mapClassesSearch(response:any[]):any[]{

    let result:any[] =[];

    response.forEach((item:any)=>{
        result.push({
            id : item.classId,
            name : item.name,
            path: item.pathImage != "NULL" ? item.pathImage : './assets/img/img_not_found.jpg',
            isSelected : false
        })
    })
    return result;
}

export function mapCategoriesSearch(response:any[]):any[]{

    let result:any[] =[];

    response.forEach((item:any)=>{
        result.push({
            id : item.categoryId,
            name : item.name,
            path: item.pathImage != "NULL" ? item.pathImage : './assets/img/img_not_found.jpg',
            isSelected : false
        })
    })
    return result;
}

export function mapSubCategoriesSearch(response:any[]):any[]{

    let result:any[] =[];

    response.forEach((item:any)=>{
        result.push({
            id : item.subCategoryId,
            name : item.name,
            path: item.pathImage != "NULL" ? item.pathImage : './assets/img/img_not_found.jpg',
            isSelected : false
        })
    })
    return result;
}

export function mapSubSubCategoriesSearch(response:any[]):any[]{

    let result:any[] =[];

    response.forEach((item:any)=>{
        result.push({
            id : item.subSubCategoryId,
            name : item.name,
            path: item.pathImage != "NULL" ? item.pathImage : './assets/img/img_not_found.jpg',
            isSelected : false
        })
    })
    return result;
}

