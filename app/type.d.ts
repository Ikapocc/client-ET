
export interface FetchProductResults {
    id:          number;
    slug:        string;
    name:        string;
    price:       number;
    description: string;
    features:    string;
    new_product: boolean;
    images:      Image[];
}

type TypeimageProps = simpleImage | categoryImage
type TyperesponsiveProps = mobile | computer | tablet
type TypeOrderProps = first | second | thrid

interface Image {
    id:             number;
    url:            string;
    productid:      number;
    typeimage:      TypeimageProps;
    typeresponsive: TyperesponsiveProps;
}

interface Includes{
    id : number,
    quantity : number,
    item : string
}

export interface FetchSingleProductResults {
    id:          number;
    slug:        string;
    name:        string;
    price:       number;
    description: string;
    features:    string;
    new_product: boolean;
    category : string;
    gallery:     Gallery[];
    includes_product : Includes[];
    images:      Image[];
    others? : Othersprops[]
}

export interface Othersprops {
    id:     number;
    slug:   string;
    name:   string;
    images: Image[];
}
interface Gallery {
    id:        number;
    url:       TyperesponsiveProps;
    productid: number;
    typeorder: TypeOrderProps;
}

export interface SingleProductProps {
    data : FetchSingleProductResults[]
}

export interface ProductProps {
    _id:          string;
    product_name: string;
    category:     Category;
    price:        number;
    stock:        number;
    sku:          string;
    thumbnail:    string;
    description:  string;
    createBy:     string;
    createdAt:    Date;
}

export enum Category {
    Beauty = "beauty",
    Furniture = "furniture",
    Groceries = "groceries",
    HomeDecoration = "home-decoration",
    Laptops = "laptops",
    SkinCare = "skin-care",
    Smartphones = "smartphones",
    Vehicle = "vehicle",
    WomensJewellery = "womens-jewellery",
}

export class Coordinates {
    lat: number;
    lng: number;
}

export enum Country {
    UnitedStates = "United States",
}

interface Address {
    address:     string;
    city:        string;
    state:       string;
    postalCode:  string;
    country:     string;
}