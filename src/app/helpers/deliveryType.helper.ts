

export function getDeliveryTypeName(id: string): string {

    switch (id) {
        case "E":
            return "Delivery";
        case "R":
            return "Recogo en Tienda";

        default:
            return '';
    }
}