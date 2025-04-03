import { TFilter, TItemsResponse } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function getItems(
  page = 1,
  limit = 12,
  filters: TFilter
): Promise<TItemsResponse> {
  const params = new URLSearchParams();
  params.append('_page', page.toString());
  params.append('_limit', limit.toString());

  if (filters.search) {
    params.append('q', filters.search);
  }
  if (filters.category || filters.category==='all') {
    params.append('category', filters.category);
  }
  if (filters.rarity) {
    params.append('rarity', filters.rarity);
  }
  if (filters.theme) {
    params.append('theme', filters.theme);
  }
  if (filters.priceRange) {
    params.append('price_gte', filters.priceRange[0].toString());
    params.append('price_lte', filters.priceRange[1].toString());
  }
  if (filters.sortByTime) {
    params.append('_sort_time', filters.sortByTime);
  }
  if (filters.sortByPrice) {
    params.append('_sort_price', filters.sortByPrice);
  }

  try {
    const response = await fetch(`${API_URL}/items?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching items: ${response.statusText}`);
    }

    const data = await response.json();


    return {...data};
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
}