import { StoreModel } from 'src/app/models/entities/store.models';

export function parseResponseToStore(response: any[], storeType: number): StoreModel[] {

    let stores: StoreModel[] = [];
    response.forEach((item: any) => {
        stores.push(new StoreModel(
            item.establishmentId,
            item.latitude,
            item.longitude,
            storeType,
            item.businessName,
            `${item.lastNamePaternal} ${item.lastNameMaternal} ${item.name}`,
            item.delivery,
            item.phoneNumber,
            item.address,
            item.pathImage,
            item.operationSchedule,
            item.shippingSchedule
        ))
    })
    return stores
}