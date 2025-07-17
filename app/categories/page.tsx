'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, ArrowRight } from 'lucide-react';

interface CategoryData {
  name: string;
  count: number;
  products: Product[];
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const products: Product[] = await response.json();
        
        // Group products by category
        const categoryMap = new Map<string, Product[]>();
        products.forEach(product => {
          if (!categoryMap.has(product.category)) {
            categoryMap.set(product.category, []);
          }
          categoryMap.get(product.category)!.push(product);
        });

        // Convert to array with counts
        const categoryData: CategoryData[] = Array.from(categoryMap.entries()).map(([name, products]) => ({
          name,
          count: products.length,
          products: products.slice(0, 3), // Show first 3 products as preview
        }));

        setCategories(categoryData.sort((a, b) => b.count - a.count));
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-32 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h1>
          <p className="text-xl text-gray-600">
            Discover products organized by categories
          </p>
        </div>

        {categories.length > 0 ? (
          <div className="space-y-8">
            {categories.map((category) => (
              <Card key={category.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Package className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                        <p className="text-gray-600">{category.count} products available</p>
                      </div>
                    </div>
                    <Link href={`/products?category=${encodeURIComponent(category.name)}`}>
                      <div className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                        View All
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </Link>
                  </div>

                  {/* Product Preview */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.products.map((product) => (
                      <Link key={product._id} href={`/products/${product._id}`}>
                        <div className="group cursor-pointer">
                          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 mb-3">
                            <img
                              src={product.images[0] || '/placeholder-product.jpg'}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {product.featured && (
                              <Badge className="absolute top-2 left-2 bg-yellow-500">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                          <p className="text-blue-600 font-bold mt-1">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {category.count > 3 && (
                    <div className="mt-6 text-center">
                      <Link href={`/products?category=${encodeURIComponent(category.name)}`}>
                        <div className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                          View {category.count - 3} more products
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No categories found</h2>
            <p className="text-gray-500">Categories will appear here once products are added.</p>
          </div>
        )}
      </div>
    </div>
  );
}