
export class SearchTreeProducts{

    classes: Class[] = [];
   

}


export class Class {

    class_id: number;
    class_name: string;
    categories: Category[] = [];
}

export class Category {
    categoryId: number;
    categoryName: string;
    subCategories: SubCategory[] = []
}

export class SubCategory {
    subcategoryId: number;
    subcategoryName: string;
    subSubCategories: SubSubCategory[] = []
}

export class SubSubCategory {
    subsubcategoryId: number;
    subsubcategoryName: string;
}