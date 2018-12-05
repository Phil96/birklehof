export interface Item {
    name: string;
    id: string;
    price: number;
}
export interface Category {
    name: string;
    items: Item[];
}
export declare let categorys: {
    "categorys": Category[];
};
