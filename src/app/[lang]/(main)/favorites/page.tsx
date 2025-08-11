import Favorites from "@/components/main/products/Favorites";
import { Properties as PropertyType } from "@/lib/db/type";
import { getDectionary } from "@/lib/getDictionary";

import { pagePropType } from "../page";

export default async function page({ params: { lang } }: pagePropType) {
  const dictionary: PropertyType = await getDectionary(lang, "properties");
  return (
    <section className="container mb-20">
      <Favorites dict={dictionary} />
    </section>
  );
}
