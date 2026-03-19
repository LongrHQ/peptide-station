'use client';
import React, { useState } from 'react';
import ItemCard from 'components/item-card';
import { useSearch } from 'contexts/search/use-search';
import { useSearchable } from 'helpers/use-searchable';
import NotFound from 'assets/icons/not-found';
import {
  LayoutGrid,
  Dumbbell,
  Sparkles,
  TrendingUp,
  Microscope,
  Package,
} from 'lucide-react';

// ── Category definitions ──────────────────────────────────
// category_ids from sheet: 1=Recovery, 2=Anti-Aging, 3=Skin & Hair, 4=Growth Hormone, 5=Kits & Accessories
const CATEGORIES = [
  { id: 'all',           label: 'All',            Icon: LayoutGrid,  ids: null },
  { id: 'recovery',      label: 'Recovery',        Icon: Dumbbell,    ids: ['1'] },
  { id: 'longevity',     label: 'Longevity',       Icon: TrendingUp,  ids: ['2', '4'] },
  { id: 'skin-hair',     label: 'Skin & Hair',     Icon: Sparkles,    ids: ['3'] },
  { id: 'science',       label: 'Tested & Proven', Icon: Microscope,  ids: ['1', '2', '3', '4'] },
  { id: 'kits',          label: 'Kits & Bundles',  Icon: Package,     ids: ['5'] },
];

function filterItems(items: any[], categoryId: string) {
  if (categoryId === 'all') return items;
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  if (!cat || !cat.ids) return items;
  return items.filter((item) => {
    const cats: string[] = (item.category_ids ?? '')
      .toString()
      .split(',')
      .map((s: string) => s.trim());
    return cat.ids!.some((id) => cats.includes(id));
  });
}

const Products = React.forwardRef(
  ({ items }: any, ref: React.RefObject<HTMLDivElement>) => {
    const { searchTerm } = useSearch();
    const [activeCategory, setActiveCategory] = useState('all');

    const searchableItems = useSearchable(items, searchTerm, (item) => [item.name]);
    const visibleItems = searchTerm
      ? searchableItems
      : filterItems(searchableItems, activeCategory);

    return (
      <div
        className="w-full my-12"
        ref={ref}
        style={{ paddingLeft: '48px', paddingRight: '48px' }}
      >
        {/* ── Category filter bar ────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '32px',
          }}
        >
          {CATEGORIES.map(({ id, label, Icon }) => {
            const active = activeCategory === id;
            return (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '9px 18px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: active ? 700 : 500,
                  cursor: 'pointer',
                  border: `1.5px solid ${active ? 'var(--ps-ink)' : 'var(--ps-border)'}`,
                  backgroundColor: active ? 'var(--ps-ink)' : 'var(--ps-surface)',
                  color: active ? '#ffffff' : 'var(--ps-muted)',
                  transition: 'all 150ms ease',
                  letterSpacing: active ? '-0.01em' : '0',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--ps-ink)';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--ps-ink)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--ps-border)';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--ps-muted)';
                  }
                }}
              >
                <Icon
                  size={14}
                  strokeWidth={active ? 2.5 : 1.75}
                  color={active ? '#ffffff' : 'var(--ps-muted)'}
                />
                {label}
              </button>
            );
          })}
        </div>

        {/* ── Product grid ───────────────────────────── */}
        {visibleItems.length ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xxl:grid-cols-3">
            {visibleItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center pt-10px md:pt-40px lg:pt-20px pb-40px">
            <NotFound width="100%" />
            <h3 className="text-24px text-gray-900 font-bold mt-35px mb-0 text-center">
              No products in this category yet.
            </h3>
          </div>
        )}
      </div>
    );
  }
);

export default Products;
