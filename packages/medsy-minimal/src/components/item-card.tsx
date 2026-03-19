import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { CURRENCY } from 'helpers/constants';
import { useOnClickOutside } from 'helpers/useOnClickOutside';
import Button from 'components/button';
import Counter from 'components/counter';
import { useSpring, animated } from 'react-spring';
import {
  ItemCardBase,
  ItemCardDetailsAnimatedWrapper,
  ItemCardDetailsInformation,
  ItemCardDetailsHalfColumn,
  ItemCardDetailsTitle,
  ItemCardDetailsInfo,
  ItemCardCounterWrapper,
  ItemCardName,
  ItemCardPrice,
  ItemCardInformation,
  ItemCardType,
  ItemCardRoundedDot,
  ItemCardQuantity,
} from 'components/utils/theme';
import { useMeasure } from 'helpers/use-measure';
import { useCart } from 'contexts/cart/cart.provider';
import Image from 'next/image';

interface ItemCardProps {
  item: any;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const { addItem, getItem, removeItem } = useCart();
  const [isOpen, setOpen] = useState(false);
  const elRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(elRef, () => setOpen(false));
  const [{ ref }, { height: viewHeight }] = useMeasure();
  const { opacity, height, transform } = useSpring<any>({
    from: { height: 0, opacity: 0, transform: 'translate3d(0,-50px,0)' },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      transform: `translate3d(0,${isOpen ? 0 : -50}px,0)`,
    },
  });

  const baseClass = `${ItemCardBase} ${isOpen ? 'details-showed' : ''}`.trim();
  const count = getItem(item.id)?.quantity;

  return (
    <div ref={elRef} className={baseClass}>
      {/* Card face — image flush left, content right, plus top-right */}
      <div
        className={`flex items-stretch h-full border border-gray-300 rounded-8px overflow-hidden transition duration-200 ease-out-expo group-hover:border-gray-400 group-hover:shadow-product-hover cursor-pointer ${isOpen ? 'rounded-b-none shadow-product-item border-b-0' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {/* Image — flush to left, top, bottom edges. No padding. */}
        <div
          className="flex-shrink-0 relative bg-gray-200"
          style={{ width: '120px', minWidth: '120px', aspectRatio: '1 / 1', alignSelf: 'stretch' }}
        >
          {item.image && (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="120px"
            />
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center flex-grow px-20px py-20px relative">
          {/* Plus icon — top right */}
          <div
            className={`plus-icon ${isOpen ? 'showed' : ''} absolute top-15px right-15px`}
          />

          <span className={ItemCardName}>{item.name}</span>

          <span className={ItemCardPrice}>
            {CURRENCY}{item.price}
          </span>

          <p className={ItemCardInformation}>
            <span className={ItemCardType}>{item.type}</span>
            <span className={ItemCardRoundedDot} />
            <span className={ItemCardQuantity}>{item.quantity}</span>
          </p>
        </div>
      </div>

      {/* Accordion drawer */}
      {isOpen && (
        <animated.div
          style={{ opacity, height: isOpen ? 'auto' : height, transform }}
          ref={ref}
          className={ItemCardDetailsAnimatedWrapper}
        >
          <div className={ItemCardDetailsInformation}>
            <div className={ItemCardDetailsHalfColumn + ' mb-5'}>
              <span className={ItemCardDetailsTitle}>Format</span>
              <span className={ItemCardDetailsInfo}>{item.type}</span>
            </div>

            <div className={ItemCardDetailsHalfColumn + ' mb-5'}>
              <span className={ItemCardDetailsTitle}>Dosage</span>
              <span className={ItemCardDetailsInfo}>{item.dosage}</span>
            </div>

            <div className={ItemCardDetailsHalfColumn}>
              <span className={ItemCardDetailsTitle}>Active Substance</span>
              <span className={ItemCardDetailsInfo}>{item.substance}</span>
            </div>

            <div className={ItemCardDetailsHalfColumn}>
              <span className={ItemCardDetailsTitle}>Manufacturer</span>
              <span className={ItemCardDetailsInfo}>{item.manufacturer}</span>
            </div>
          </div>

          <div className={ItemCardCounterWrapper}>
            {item.slug && (
              <Link
                href={`/products/${item.slug}`}
                className="inline-flex items-center justify-center h-9 px-20px text-13px font-medium rounded-pill transition duration-200 mr-auto"
                style={{ color: 'var(--ps-brand)', border: '1.5px solid var(--ps-brand)' }}
              >
                Learn more
              </Link>
            )}
            {count > 0 ? (
              <Counter
                value={count}
                className="ml-3"
                onIncrement={() => addItem(item)}
                onDecrement={() => removeItem(item)}
              />
            ) : (
              <Button size="small" className="ml-3" onClick={() => addItem(item)}>
                Add to cart
              </Button>
            )}
          </div>
        </animated.div>
      )}
    </div>
  );
};

export default ItemCard;
