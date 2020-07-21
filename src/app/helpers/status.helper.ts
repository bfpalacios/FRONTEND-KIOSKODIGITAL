
export function mapOrderState(stateid: string) {

    switch (stateid) {
        case "I":
            return{
                name:'Informado',
                color:'order-pending ',
                value:'warning',
            }
        case "N":
            return{
                name:'Anulado por Cliente',
                color:'order-reject ',
                value:'danger',
            }
        case "A":
            return{
                name:'Atendido',
                color:'order-acepted',
                value:'success',
            }
        case "R":
            return{
                name:'Anulado por Proveedor',
                color:'order-reject ',
                value:'danger',
            }
        case "E":
            return{
                name:'Enviado',
                color:'order-acepted',
                value:'success',
            }
        case "T":
            return{
                name:'Entregado',
                color:'order-acepted',
                value:'success',
            }
    }
}
