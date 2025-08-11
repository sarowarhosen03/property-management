import Image from "next/image";
import { FC } from "react";

interface PropretyPriceProps {
  price: {
    amount: string;
    currency: string;
  };
  location: {
    city: string;
    state: string;
  };
}

export const PropertyPrice: FC<PropretyPriceProps> = ({ price, location }) => {
  const { amount, currency } = price || {};
  const { city, state } = location || {};

  return (
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-semibold leading-10 lg:text-[2rem]">
        {currency === "USD" ? "$" : currency}
        {amount}
      </h3>

      <div className="mt-2 flex lg:mt-0">
        <div className="relative mr-2 h-6 w-6">
          <Image
            src="/svgs/location.svg"
            width={24}
            height={24}
            alt="location"
          />
        </div>
        <span className="text-sm font-medium">
          {city}, {state}
        </span>
      </div>
    </div>
  );
};
