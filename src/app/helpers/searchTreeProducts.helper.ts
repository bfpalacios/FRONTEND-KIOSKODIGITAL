import { SearchTreeProducts } from '../models/entities/searchTreeProducts.model';
import * as _ from 'lodash';


export default function mapTreeproducts(response: any[]): any[] {


    var result = mapClass(response);

    for (let clase of result) {
        clase.categories = mapCategory(response.filter(i => i.classId == clase.class_id))
    }

    for (let i of result) {
        for (let category of i.categories) {
            category.subCategories = mapSubCategories(response.filter(c => c.categoryId == category.categoryId));
        }
    }

    for (let a of result) {
        for (let b of a.categories) {
            for (let c of b.subCategories) {
                c.subSubCategories = mapSubSubCategory(response.filter(y => y.subsubcategoryParentId == c.subcategoryId));
            } 
        }
    }


    return result
}

function mapClass(response: any[]): any[] {
    return _.chain(response).groupBy("classId").map(function (v, i) {

        return {
            class_id: i,
            class_name: _.get(_.find(v, 'className'), 'className'),

        }
    }).value();
}

function mapCategory(response: any[]): any[] {
    return _.chain(response).groupBy("categoryId").map(function (v, i) {

        return {
            categoryId: i,
            categoryName: _.get(_.find(v, 'categoryName'), 'categoryName'),

        }
    }).value();
}

function mapSubCategories(response: any[]): any[] {
    return _.chain(response).groupBy("subcategoryId").map(function (v, i) {

        return {
            subcategoryId: i,
            subcategoryName: _.get(_.find(v, 'subcategoryName'), 'subcategoryName'),

        }
    }).value();
}

function mapSubSubCategory(response: any[]): any[] {

    return response.length > 0 ?
        _.chain(response).groupBy("subsubcategoryId").map(function (v, i) {

            return {
                subsubcategoryId: i,
                subsubcategoryName: _.get(_.find(v, 'subsubcategoryName'), 'subsubcategoryName'),
                

            }
        }).value() : [];
}

