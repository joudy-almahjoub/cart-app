export interface Product {
    id: number,
    title: string,
    price: number,
    description: string,
    quantity: number,
    added: boolean,
    bought: boolean,
    status: string,
    images: string[]
}