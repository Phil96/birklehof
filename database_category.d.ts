export interface Item {
    name: string;
    id: string;
    price: number;
}
export interface Category {
    name: string;
    items: Item[];
}
export declare let structur: Category;
export declare let balken: Category;
export declare let categorys: {
    "categorys": Category[];
};
