export type TRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
export const itemCategories = ['Upper Body', 'Lower Body', 'Hat', 'Shoes', 'Accessory'] as const;
export type TItemCategory = typeof itemCategories[number];
export type TTheme = 'halloween' | 'beach' | 'new-year' | 'valentine' | 'default';
export type TTime = 'latest' | 'oldest';
export type TPrice = 'price-asc' | 'price-desc';

export interface IItem {
    id: string;
    name: string;
    price: number;
    image: string;
    rarity: TRarity;
    category: TItemCategory;
    creator: {
        name: string;
        avatar: string;
    };
    like: boolean;
    theme: TTheme;
    createdAt: string;
}

export type TFilter = {
    search: string;
    priceRange: number[];
    type: string | null;
    rarity: TRarity | null;
    category: TItemCategory | null;
    sortByTime?: TTime;
    sortByPrice?: TPrice;
    theme?: TTheme;
};

export type TItemsResponse = {
    items: IItem[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
};