import { NextResponse } from 'next/server';
import { IItem, TFilter, TItemsResponse } from '@/lib/types';
import items from '@/lib/mocks/items.json';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('_page') || '1');
    const pageSize = parseInt(searchParams.get('_limit') || '12');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const rarity = searchParams.get('rarity') || '';
    const sortBy = searchParams.get('_sort') || 'latest';
    const price_gte = searchParams.get('price_gte') || 0;
    const price_lte = searchParams.get('price_lte') || 400;

    let filteredItems = [...items] as IItem[];

    if (search) {
      filteredItems = filteredItems.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filteredItems = filteredItems.filter(item => item.category === category);
    }

    if (rarity) {
      filteredItems = filteredItems.filter(item => item.rarity === rarity);
    }

    filteredItems = filteredItems.filter(item => 
      item.price >= +price_gte && item.price <= +price_lte
    );

    switch (sortBy) {
      case 'price-asc':
        filteredItems.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredItems.sort((a, b) => b.price - a.price);
        break;
      case 'latest':
      default:
        filteredItems.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    // Calculate pagination
    const total = filteredItems.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = filteredItems.slice(startIndex, endIndex);
    const hasMore = endIndex < total;

    const response: TItemsResponse = {
      items: paginatedItems,
      total,
      page,
      pageSize,
      hasMore
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in GET /api/items:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}