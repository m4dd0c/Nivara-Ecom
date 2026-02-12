import { Document, Types, Schema } from "mongoose";

interface IMobileNumberMain {
  number: string;
  country: {
    code: string;
    dialingCode: number;
  };
}

interface IMobileNumber {
  main: IMobileNumberMain;
  alternative?: IMobileNumberMain;
}

interface ICartId {
  cart_id: string;
}

interface IAddress {
  id: string;
  flatNo: string | number;
  landmark: string;
  address: string;
  addressLine?: string;
  pinCode: string | number;
  state: string;
  district: string;
  country: string;
  city: string;
}

interface IResetPassword {
  otp: string | null;
  expiry: Date | null;
}

interface IDob {
  day: number;
  month: number;
  year: number;
}
interface ICloudImage {
  secureUrl: string;
  publicId: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  address: IAddress[];
}

export interface IOTP extends Document {
  id: Types.ObjectId;
  mobileNumber: IMobileNumberMain;
  verified: boolean;
  createdAt: Date;
}

export interface ICookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none";
  expires: Date;
}

// top and bottoms

export type stringOrArray = string | string[];

type tColors =
  | "beige"
  | "blue"
  | "gold"
  | "green"
  | "gray"
  | "multicolor"
  | "orange"
  | "pink"
  | "purple"
  | "red"
  | "silver"
  | "white"
  | "yellow"
  | "brown"
  | "black";

type tBottomsFabric =
  | "cotton"
  | "linen"
  | "polyester"
  | "denim"
  | "fleece"
  | "nylon"
  | "spandex"
  | "canvas"
  | "wool";

type tTopsFabric =
  | "cotton"
  | "linen"
  | "polyester"
  | "wool"
  | "silk"
  | "denim"
  | "fleece"
  | "hemp"
  | "velvet"
  | "nylon"
  | "spandex"
  | "canvas";

type tTopsDesign =
  | "solidColor"
  | "stripped"
  | "checked"
  | "printed"
  | "graphic"
  | "embroidered"
  | "floralPatterned";

type tSizes = "s" | "m" | "l" | "xl" | "xxl" | "xxxl";

type tSleeveTypes =
  | "shortSleeve"
  | "longSleeve"
  | "sleeveless"
  | "halfSleeve"
  | "fiveSleeve";

type tBottomsStyle =
  | "trackPants"
  | "cargoPants"
  | "joggers"
  | "shorts"
  | "trousers";

type tTopsStyle =
  | "tShirt"
  | "basicTShirt"
  | "poloTShirt"
  | "henleyTShirt"
  | "vNeckTShirt"
  | "shirt"
  | "casualShirt"
  | "formalShirt"
  | "linenShirt"
  | "denimShirt"
  | "buttonDownShirt"
  | "sweatShirt"
  | "hoodie"
  | "jacket"
  | "denimJacket"
  | "leatherJacket"
  | "longSleeveTop"
  | "sweater";

type tTopsOccasion = "casual" | "sportswear" | "loungewear" | "vacation";
type tTopsSeason = "summer" | "winter" | "allSeason" | "rainy";
type tFits = "regularFit" | "slimFit" | "relaxedFit" | "oversized";
type tSortBy = "newest" | "popular" | "top-rated" | "oldest";

export interface IFilters {
  bottomsFabric: tBottomsFabric[];
  bottomsStyle: tBottomsStyle[];
  topsFabric: tTopsFabric[];
  topsStyle: tTopsStyle[];
  topsDesign: tTopsDesign[];
  topsOccasion: tTopsOccasion[];
  topsSeason: tTopsSeason[];
  sleeveTypes: tSleeveTypes[];
  fits: tFits[];
  sizes: tSizes[];
  colors: tColors[];
  sortBy: tSortBy[];
}
export interface ITopEnums {
  fabric: tTopsFabric[];
  design: tTopsDesign[];
  style: tTopsStyle[];
  occasion: tTopsOccasion[];
  season: tTopsSeason[];
  fit: tFits[];
  sleeveType: tSleeveTypes[];
  size: tSizes[];
  color: tColors[];
}
export interface IBottomEnums {
  fabric: tBottomsFabric[];
  style: tBottomsStyle[];
  size: tSizes[];
  color: tColors[];
  fit: tFits[];
}
interface IRatings {
  total: number;
  stars: number;
}

export interface ITop extends Document {
  id: Types.ObjectId;
  name: string;
  price: number;
  strikePrice?: number | null;
  description: string;
  fabric: tTopsFabric[];
  design: tTopsDesign[];
  style: tTopsStyle[];
  occasion: tTopsOccasion[];
  season: tTopsSeason[];
  fit: tFits[];
  sleeveType: tSleeveTypes[];
  size: tSizes[];
  color: tColors[];
  views: number;
  sold: number;
  ratings: IRatings;
  quantity: number;
  mainImage: ICloudImage;
  tax: number;
  additionalImage?: ICloudImage[];
  newArrival: boolean;
  trending: boolean;
  seasonal: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface IBottom extends Document {
  id: Types.ObjectId;
  name: string;
  price: number;
  strikePrice?: string;
  fabric: tBottomsFabric[];
  style: tBottomsStyle[];
  size: tSizes[];
  color: tColors[];
  quantity: number;
  description: string;
  views: number;
  sold: number;
  fit: tFits[];
  ratings: IRatings;
  mainImage: ICloudImage;
  additionalImage: ICloudImage[];
  tax: number;
  newArrival: boolean;
  trending: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface IReview extends Document {
  userId: Types.ObjectId;
  comment: string;
  rating: number;
  productId: Schema.Types.ObjectId;
  productType: "Top" | "Bottom";
  createdAt: Date;
  updatedAt: Date;
}

interface IOrder extends Document {
  userId: Types.ObjectId;
  receiverName: string;
  mobileNumber: string;
  address: Types.ObjectId;
  email: string;
  product: {
    quantity: number;
    size: tSizes;
    color: tColors;
    productType: "Top" | "Bottom";
    cartId: Types.ObjectId;
    productId: Schema.Types.ObjectId;
  }[];
  status: "processing" | "shipped" | "delivered" | "cancelled";
  payment: {
    paymentId: string;
    orderId: string;
    status: "pending" | "success" | "failed";
  };
  price: {
    total: number;
    subTotal: number;
    tax: number;
    discount: number;
  };
  deliveryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

type IPopulateOrder = Omit<IOrder, "product" | "address"> & {
  id: string;
  address: IAddress;
  product: {
    quantity: number;
    size: tSizes;
    color: tColors;
    productType: "Top" | "Bottom";
    productId: ITop | IBottom;
  }[];
};

export interface ICart extends Document {
  id: Types.ObjectId;
  itemId: Types.ObjectId;
  userId: Types.ObjectId;
  quantity: number;
  size: tSizes;
  color: tColors;
  itemType: "Top" | "Bottom";
}

export type ICartPopulate<ItemInterface> = Omit<ICart, "itemId"> & {
  item: ItemInterface;
};
