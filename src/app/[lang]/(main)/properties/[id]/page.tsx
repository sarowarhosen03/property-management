import PropertyNotFound from "@/components/common/errors/propertyNotFound";
import { SinglePropertyDetails } from "@/components/common/single-product/SinglePropertyDetails";
import { SingeProperty } from "@/lib/db/type";
import { getDectionary } from "@/lib/getDictionary";
import { Contact } from "@/types/fetchDataTypes";
import { getPropertyById } from "@/utils/fetchData";
import { Metadata, ResolvingMetadata } from "next";
import { langType } from "../../page";

type Props = {
  params: { id: string; lang: langType };
};

export default async function SingleProperty({ params: { id, lang } }: Props) {
  const singePropertyDict: SingeProperty = await getDectionary(
    lang,
    "singeProperty",
  );
  const property = await getPropertyById(id);
  const contactDict: Contact = await getDectionary(lang, "contact");

  if (!property) {
    return (
      <section className="container">
        <PropertyNotFound dict={singePropertyDict} />
      </section>
    );
  }

  return (
    <section className="container">
      <SinglePropertyDetails
        property={property}
        lang={lang}
        contactDict={contactDict}
        propertyId={id}
        singePropertyDict={singePropertyDict}
      />
    </section>
  );
}

//generate metadata
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  try {
    const previousImages = (await parent).openGraph?.images || [];

    const property = (await getPropertyById(params.id)) || {};
    if (!property) {
      return {
        title: "this page was no found",
        openGraph: {
          images: [...previousImages],
        },
      };
    }

    return {
      title: property.title[params.lang] || property.title["en"],
      openGraph: {
        images: [...property.images, ...previousImages],
      },
      description:
        property.description[params.lang] || property.description["en"],
    };
  } catch (error) {
    return { title: "server error" };
  }
}
