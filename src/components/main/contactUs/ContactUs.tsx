import { langType } from "@/app/[lang]/(main)/page";
import ContactForm from "@/components/common/contact-form/ContactForm";
import { Contact } from "@/lib/db/type";
import { getDectionary } from "@/lib/getDictionary";
import getIp from "@/utils/getIp";
import Image from "next/image";

import contactImage from "/public/assets/images/contact.jpeg";

export async function ContactUs({ lang }: { lang: langType }) {
  const contactDict: Contact = await getDectionary(lang, "contact");
  const ipInfo = await getIp();

  return (
    <section className="xxl:mt-[160px]">
      <div className="container">
        <h2 className="mb-4 text-lg font-semibold lg:mb-10 lg:text-[32px]">
          {contactDict.ContactUsMessage}
        </h2>
        <div className="flex w-full flex-col flex-wrap gap-6 lg:flex-row xl:gap-12 xxl:gap-[122px]">
          <div className="order-1 w-full md:order-first lg:max-w-[300px] xl:max-w-[460px]">
            <div className="w-full">
              <ContactForm dict={contactDict} ipInfo={ipInfo} />
            </div>
          </div>
          <div className="relative min-h-[160px] flex-1 overflow-hidden rounded-[2rem] md:block">
            <Image
              alt="Contact Us"
              className="-z-1 h-full w-full object-cover shadow-lg"
              src={contactImage}
              fill
              placeholder="blur"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(77,65,94,0.407)] to-[rgba(55,46,68,0.55)]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
