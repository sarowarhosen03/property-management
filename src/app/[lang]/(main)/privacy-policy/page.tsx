import { pagePropType } from "../page";

export default function page({ params: { lang } }: pagePropType) {
  return (
    <>
      <section className="container py-10">{pageContent[lang]}</section>
    </>
  );
}

const pageContent = {
  en: (
    <>
      <div>
        <h2 className="mb-5 text-2xl font-bold">Privacy Policy</h2>
        <p className="font-[600]">
          Investing in real estate is a popular strategy for building wealth and
          securing financial stability. This type of investment involves
          purchasing properties with the intention of generating income, either
          through rental income, property appreciation, or both. Here are some
          key points to consider when investing in real estate:
        </p>
      </div>
      <div className="mt-10">
        <h2 className="mb-5 text-xl font-[600]">
          Types of Real Estate Investments
        </h2>
        <ol className="list-decimal space-y-3 ps-5 font-[500]">
          <li>
            Residential Properties: This includes single-family homes, duplexes,
            and multi-family residences. Investors can earn income through
            renting out these properties to tenants.
          </li>
          <li>
            Commercial Properties: These include office buildings, retail
            spaces, warehouses, and industrial properties. Commercial real
            estate can offer higher rental income and longer lease terms.
          </li>
          <li>
            Vacation Rentals: Properties in tourist destinations can generate
            income through short-term rentals. This market has grown
            significantly with platforms like Airbnb.
          </li>
          <li>
            Real Estate Investment Trusts (REITs): These are companies that own,
            operate, or finance income-generating real estate. Investors can buy
            shares in a REIT, providing a way to invest in real estate without
            having to buy properties directly.
          </li>
          <li>
            Land: Investing in undeveloped land can be lucrative if the property
            appreciates over time or if it is developed and sold for a profit.
          </li>
        </ol>
      </div>
      <div className="mt-10">
        <h2 className="mb-5 text-xl font-[600]">
          Benefits of Real Estate Investment
        </h2>
        <ul className="list-disc space-y-3 ps-5 font-[500]">
          <li>
            Steady Income: Rental properties can provide a consistent and
            reliable income stream.
          </li>
          <li>
            Appreciation: Over time, real estate values tend to increase,
            offering potential capital gains.
          </li>
          <li>
            Tax Advantages: There are various tax benefits associated with real
            estate, such as deductions for mortgage interest, property
            depreciation, and maintenance expenses.
          </li>
          <li>
            Diversification: Adding real estate to your investment portfolio can
            reduce risk and increase overall returns.
          </li>
          <li>
            Leverage: Real estate allows investors to use borrowed funds to
            increase potential returns, a concept known as leveraging.
          </li>
        </ul>
      </div>
      <div className="mt-10">
        <h2 className="mb-5 text-xl font-[600]">Risks and Considerations</h2>
        <ul className="list-disc space-y-3 ps-5 font-[500]">
          <li>
            Market Fluctuations: Real estate markets can be volatile, and
            property values can decrease.
          </li>
          <li>
            Maintenance and Management: Owning property requires ongoing
            maintenance and management, which can be time-consuming and costly.
          </li>
          <li>
            Liquidity: Real estate is not as liquid as other investments like
            stocks and bonds. It can take time to sell a property.
          </li>
          <li>
            Economic Factors: Economic downturns, changes in interest rates, and
            local market conditions can impact real estate investments.
          </li>
        </ul>
      </div>
      <div className="mt-10">
        <h2 className="mb-5 text-xl font-[600]">Steps to Get Started</h2>
        <ol className="list-decimal space-y-3 ps-5 font-[500]">
          <li>
            Research: Understand the different types of real estate investments
            and decide which one aligns with your goals.
          </li>
          <li>
            Financing: Determine how you will finance your investment. This may
            involve securing a mortgage or finding investors.
          </li>
          <li>
            Market Analysis: Study the market to identify the best locations and
            types of properties to invest in.
          </li>
          <li>
            Property Search: Look for properties that meet your investment
            criteria.
          </li>
          <li>
            Due Diligence: Conduct thorough inspections and evaluations of
            potential properties.
          </li>
          <li>
            Purchase and Management: Once you've purchased a property, manage it
            effectively to ensure it generates income and appreciates in value.
          </li>
        </ol>
      </div>
      <div className="mt-5">
        <h2 className="mb-5 text-2xl font-bold">Conclusion</h2>
        <p className="font-[600]">
          Real estate investment can be a powerful way to build wealth and
          achieve financial independence. By understanding the different types
          of real estate, benefits, risks, and the steps involved, investors can
          make informed decisions and maximize their returns. Whether you’re
          looking for steady rental income, long-term appreciation, or
          diversification of your investment portfolio, real estate offers a
          variety of opportunities to meet your financial goals.
        </p>
      </div>
    </>
  ),
  hy: (
    <>
      {" "}
      <div>
        <h2 className="mb-5 text-2xl font-bold">
          Գաղտնիության քաղաքականություն
        </h2>
        <p className="font-[600]">
          Անշարժ գույքի մեջ ներդրումները հայտնի ռազմավարություն են հարստություն
          ստեղծելու և ֆինանսական կայունություն ապահովելու համար։ Այս տեսակի
          ներդրումը ներառում է գույքերի ձեռքբերում՝ եկամուտ ստանալու նպատակով,
          լինի դա վարձակալության, գույքի արժևորման կամ երկուսի միջոցով։ Ահա
          անշարժ գույքի մեջ ներդրում կատարելիս հաշվի առնվող հիմնական կետերը.
        </p>
      </div>
      <div className="mt-10">
        <h2 className="mb-5 text-xl font-[600]">
          Անշարժ գույքի ներդրումների տեսակները
        </h2>
        <ol className="list-decimal space-y-3 ps-5 font-[500]">
          <li>
            Բնակելի գույք: Սա ներառում է մեկ ընտանիքի տներ, երկտնային տներ և
            բազմաբնակարանային շենքեր։ Ներդրողները կարող են եկամուտ ստանալ այս
            գույքերը վարձակալությամբ տրվելով։
          </li>
          <li>
            Առևտրային գույք: Դրանք ներառում են գրասենյակային շենքեր, մանրածախ
            տարածքներ, պահեստներ և արդյունաբերական գույք։ Առևտրային անշարժ
            գույքը կարող է առաջարկել ավելի բարձր վարձակալական եկամուտ և ավելի
            երկարաժամկետ պայմանագրեր։
          </li>
          <li>
            Հանգստյան տուներ: Տուրիստական վայրերում գույքերը կարող են եկամուտ
            ստանալ կարճաժամկետ վարձակալությունների միջոցով։ Այս շուկան զգալիորեն
            աճել է այնպիսի հարթակների միջոցով, ինչպիսին Airbnb-ն է։
          </li>
          <li>
            Անշարժ գույքի ներդրումային ֆոնդեր (REITs): Դրանք ընկերություններ են,
            որոնք ունեն, աշխատեցնում կամ ֆինանսավորում են եկամուտ ստեղծող անշարժ
            գույք։ Ներդրողները կարող են գնել բաժնետոմսեր այս ֆոնդերում՝
            տրամադրելով ներդրման հնարավորություն առանց անմիջական գույքերի
            գնելու։
          </li>
          <li>
            Հող: Ներդրումներ կատարել չզարգացած հողում կարող է լինել շահավետ, եթե
            գույքը ժամանակի ընթացքում արժևորվում է կամ զարգացվում և վաճառվում է
            շահույթով։
          </li>
        </ol>
      </div>
      <div className="mt-10">
        <h2 className="mb-5 text-xl font-[600]">
          Անշարժ գույքի ներդրումների առավելությունները
        </h2>
        <ul className="list-disc space-y-3 ps-5 font-[500]">
          <li>
            Հաստատուն եկամուտ: Վարձակալության գույքերը կարող են ապահովել
            հաստատուն և հուսալի եկամուտ։
          </li>
          <li>
            Արժևորման հեռանկար: Ժամանակի ընթացքում անշարժ գույքի արժեքները
            սովորաբար աճում են, առաջարկելով հնարավոր կապիտալ շահույթ։
          </li>
          <li>
            Հարկային առավելություններ: Անշարժ գույքի հետ կապված կան տարբեր
            հարկային առավելություններ, ինչպես հիփոթեքային տոկոսների, գույքի
            մաշվածության և պահպանման ծախսերի նվազեցումները։
          </li>
          <li>
            Դիվերսիֆիկացում: Ձեր ներդրումային պորտֆելի մեջ անշարժ գույք
            ավելացնելը կարող է նվազեցնել ռիսկը և բարձրացնել ընդհանուր
            վերադարձները։
          </li>
          <li>
            Կառուցողական ազդեցություն: Անշարժ գույքը թույլ է տալիս ներդրողներին
            օգտագործել փոխառված միջոցներ՝ պոտենցիալ վերադարձները մեծացնելու
            համար, ինչը հայտնի է որպես լծակավորություն։
          </li>
        </ul>
      </div>
      <div className="mt-10">
        <h2 className="mb-5 text-xl font-[600]">Ռիսկեր և դիտարկումներ</h2>
        <ul className="list-disc space-y-3 ps-5 font-[500]">
          <li>
            Շուկայի փոփոխություններ: Անշարժ գույքի շուկաները կարող են լինել
            անկայուն, և գույքի արժեքները կարող են նվազել։
          </li>
          <li>
            Պահպանում և կառավարում: Գույք ունենալը պահանջում է շարունակական
            պահպանման և կառավարման միջոցառումներ, որոնք կարող են լինել
            ժամանակատար և ծախսատար։
          </li>
          <li>
            Լիկվիդություն: Անշարժ գույքը նույնքան արագ չէ, որքան այլ
            ներդրումներ, ինչպիսիք են բաժնետոմսերն ու պարտատոմսերը։ Գույք
            վաճառելը կարող է պահանջել ժամանակ։
          </li>
          <li>
            Տնտեսական գործոններ: Տնտեսական անկումները, տոկոսադրույքների
            փոփոխությունները և տեղական շուկայի պայմանները կարող են ազդել անշարժ
            գույքի ներդրումների վրա։
          </li>
        </ul>
      </div>
      <div className="mt-10">
        <h2 className="mb-5 text-xl font-[600]">Նախնական քայլեր</h2>
        <ol className="list-decimal space-y-3 ps-5 font-[500]">
          <li>
            Հետազոտություն: Հասկացեք անշարժ գույքի ներդրումների տարբեր տեսակները
            և որոշեք, թե որն է համապատասխանում ձեր նպատակներին։
          </li>
          <li>
            Ֆինանսավորում: Սահմանեք, թե ինչպես եք ֆինանսավորելու ձեր ներդրումը։
            Դա կարող է ներառել հիփոթեքի ապահովում կամ ներդրողների գտնում։
          </li>
          <li>
            Շուկայի վերլուծություն: Ուսումնասիրեք շուկան՝ իմանալու լավագույն
            վայրերը և գույքերի տեսակները՝ ներդրում կատարելու համար։
          </li>
          <li>
            Գույքի որոնում: Փնտրեք գույքեր, որոնք համապատասխանում են ձեր
            ներդրումային չափանիշներին։
          </li>
          <li>
            Հետազոտություն և վերլուծություն: Ինքնուրույն ուսումնասիրեք և
            գնահատեք պոտենցիալ գույքերը։
          </li>
          <li>
            Գնում և կառավարում: Երբ ձեռք եք բերում գույք, արդյունավետորեն
            կառավարեք այն՝ ապահովելու համար, որ այն ապահովում է եկամուտ և
            արժևորվում։
          </li>
        </ol>
      </div>
      <div className="mt-5">
        <h2 className="mb-5 text-2xl font-bold">Եզրակացություն</h2>
        <p className="font-[600]">
          Անշարժ գույքի ներդրումը կարող է լինել հզոր միջոց հարստություն
          ստեղծելու և ֆինանսական անկախության հասնելու համար։ Հասկանալով անշարժ
          գույքի տարբեր տեսակները, առավելությունները, ռիսկերը և քայլերը,
          ներդրողները կարող են կայացնել տեղեկացված որոշումներ և առավելագույնի
          հասցնել իրենց վերադարձները։ Անկախ նրանից՝ փնտրում եք հաստատուն
          վարձակալական եկամուտ, երկարաժամկետ արժևորման հեռանկարներ կամ ձեր
          ներդրումային պորտֆելի դիվերսիֆիկացում, անշարժ գույքը առաջարկում է
          բազմաթիվ հնարավորություններ՝ ձեր ֆինանսական նպատակներին հասնելու
          համար։
        </p>
      </div>
    </>
  ),
  rus: (
    <>
      {" "}
      <div>
        <h2 className="mb-5 text-2xl font-bold">Политика конфиденциальности</h2>
        <p className="font-[600]">
          Инвестиции в недвижимость - популярная стратегия для создания капитала
          и обеспечения финансовой стабильности. Этот вид инвестиций
          предполагает покупку объектов недвижимости с целью получения дохода,
          будь то арендная плата, прирост стоимости недвижимости или оба
          варианта. Вот некоторые ключевые моменты, которые следует учитывать
          при инвестировании в недвижимость:
        </p>
      </div>
      <div className="mt-10">
        <h2 className="mb-5 text-xl font-[600]">
          Виды инвестиций в недвижимость
        </h2>
        <ol className="list-decimal space-y-3 ps-5 font-[500]">
          <li>
            Жилая недвижимость: Сюда входят одно- и многосемейные дома, дуплексы
            и многоквартирные здания. Инвесторы могут получать доход, сдавая эти
            объекты в аренду.
          </li>
          <li>
            Коммерческая недвижимость: Сюда входят офисные здания, торговые
            площади, склады и промышленные объекты. Коммерческая недвижимость
            может приносить более высокий арендный доход и предлагать более
            долгосрочные договоры аренды.
          </li>
          <li>
            Вакансионная недвижимость: Недвижимость в туристических направлениях
            может приносить доход за счет краткосрочной аренды. Этот рынок
            значительно вырос благодаря таким платформам, как Airbnb.
          </li>
          <li>
            Инвестиционные фонды недвижимости (REITs): Это компании, которые
            владеют, управляют или финансируют недвижимость, приносящую доход.
            Инвесторы могут покупать акции в таких фондах, предоставляя
            возможность инвестировать в недвижимость, не покупая объекты
            напрямую.
          </li>
          <li>
            Земля: Инвестирование в неразвитую землю может быть прибыльным, если
            стоимость собственности со временем увеличивается или если она
            развивается и продается с прибылью.
          </li>
        </ol>
      </div>
      <div className="mt-10">
        <h2 className="mb-5 text-xl font-[600]">
          Преимущества инвестиций в недвижимость
        </h2>
        <ul className="list-disc space-y-3 ps-5 font-[500]">
          <li>
            Стабильный доход: Арендные объекты могут обеспечивать постоянный и
            надежный источник дохода.
          </li>
          <li>
            Прирост стоимости: Со временем стоимость недвижимости, как правило,
            увеличивается, предлагая потенциальные капиталовложения.
          </li>
          <li>
            Налоговые преимущества: Существуют различные налоговые льготы,
            связанные с недвижимостью, такие как вычеты на проценты по ипотеке,
            амортизация имущества и расходы на обслуживание.
          </li>
          <li>
            Диверсификация: Добавление недвижимости в ваш инвестиционный
            портфель может снизить риски и увеличить общую доходность.
          </li>
          <li>
            Кредитное плечо: Недвижимость позволяет инвесторам использовать
            заемные средства для увеличения потенциальной прибыли, что известно
            как использование кредитного плеча.
          </li>
        </ul>
      </div>
      <div className="mt-10">
        <h2 className="mb-5 text-xl font-[600]">Риски и соображения</h2>
        <ul className="list-disc space-y-3 ps-5 font-[500]">
          <li>
            Колебания рынка: Рынки недвижимости могут быть волатильными, и
            стоимость объектов может снижаться.
          </li>
          <li>
            Обслуживание и управление: Владение недвижимостью требует
            постоянного обслуживания и управления, что может быть трудоемким и
            затратным.
          </li>
          <li>
            Ликвидность: Недвижимость не так ликвидна, как другие инвестиции,
            такие как акции и облигации. Продажа объекта может занять время.
          </li>
          <li>
            Экономические факторы: Экономические спады, изменения процентных
            ставок и местные рыночные условия могут влиять на инвестиции в
            недвижимость.
          </li>
        </ul>
      </div>
      <div className="mt-10">
        <h2 className="mb-5 text-xl font-[600]">Шаги для начала</h2>
        <ol className="list-decimal space-y-3 ps-5 font-[500]">
          <li>
            Исследование: Поймите различные виды инвестиций в недвижимость и
            решите, какой из них соответствует вашим целям.
          </li>
          <li>
            Финансирование: Определите, как вы будете финансировать свою
            инвестицию. Это может включать получение ипотеки или поиск
            инвесторов.
          </li>
          <li>
            Анализ рынка: Изучите рынок, чтобы определить лучшие местоположения
            и типы объектов для инвестиций.
          </li>
          <li>
            Поиск недвижимости: Ищите объекты, соответствующие вашим
            инвестиционным критериям.
          </li>
          <li>
            Должная проверка: Проведите тщательные проверки и оценки
            потенциальных объектов.
          </li>
          <li>
            Покупка и управление: После покупки объекта недвижимости эффективно
            управляйте им, чтобы обеспечить получение дохода и увеличение его
            стоимости.
          </li>
        </ol>
      </div>
      <div className="mt-5">
        <h2 className="mb-5 text-2xl font-bold">Заключение</h2>
        <p className="font-[600]">
          Инвестирование в недвижимость может стать мощным инструментом для
          создания капитала и достижения финансовой независимости. Понимая
          различные виды недвижимости, преимущества, риски и необходимые шаги,
          инвесторы могут принимать обоснованные решения и максимизировать свои
          доходы. Независимо от того, ищете ли вы стабильный арендный доход,
          долгосрочный прирост стоимости или диверсификацию вашего
          инвестиционного портфеля, недвижимость предлагает множество
          возможностей для достижения ваших финансовых целей.
        </p>
      </div>
    </>
  ),
};
