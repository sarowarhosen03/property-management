import { langType } from "@/app/[lang]/(main)/page";
import { SingeProperty } from "@/lib/db/type";
import "@/svgs/drainage.svg";
import Image from "next/image";

export const featureList = {
  en: {
    house: {
      Utilities: [
        {
          name: "Electricity",
          label: "Electricity",
          icon: "/svgs/electric-socket.svg",
          // value: checkUtility("Electricity"),
        },
        {
          name: "Gas",
          label: "Gas",
          icon: "/svgs/gas.svg",
          // value: checkUtility("Gas"),
        },
        {
          name: "Drainage",
          label: "Drainage",
          icon: "/svgs/drainage.svg",
          // value: checkUtility("Drainage"),
        },
        {
          name: "Constant Water Supply",
          label: "Constant Water Supply",
          icon: "/svgs/water-top.svg",
          // value: checkUtility("Constant water"),
        },
        {
          name: "Hot Water",
          label: "Hot Water",
          icon: "/svgs/warm-water.svg",
          // value: checkUtility("Warm Water"),
        },
        {
          name: "Irrigation System",
          label: "Irrigation System",
          icon: "/svgs/water-can-2.svg",
          // value: checkUtility("Irrigation System"),
        },
        {
          name: "Individual Heating",
          label: "Individual Heating",
          icon: "/svgs/sun-side.svg",
          // value: checkUtility("Individual Heating"),
        },
      ],
      Additional: [
        {
          name: "Garage",
          label: "Garage",
          icon: "/svgs/garage.svg",
          // value: checkAdditional("Garage"),
        },
        {
          name: "Parking",
          label: "Parking",
          icon: "/svgs/parking.svg",
          // value: checkAdditional("Parking"),
        },
        {
          name: "Security System",
          label: "Security System",
          icon: "/svgs/security-protection.svg",
          // value: checkAdditional("Security System"),
        },
        {
          name: "Intercom",
          label: "Intercom",
          icon: "/svgs/intercom.svg",
          // value: checkAdditional("Intercom"),
        },
        {
          name: "Fireplace",
          label: "Fireplace",
          icon: "/svgs/fireplace.svg",
          // value: checkAdditional("Fireplace"),
        },
        {
          name: "Air Conditioner",
          label: "Air Conditioner",
          icon: "/svgs/air-conditioner.svg",
          // value: checkAdditional("Air Conditioner"),
        },
        {
          name: "Satellite Dish",
          label: "Satellite Dish",
          icon: "/svgs/satellite-dish.svg",
          // value: checkAdditional("Satellite Dish"),
        },
        {
          name: "Swimming Pool",
          label: "Swimming Pool",
          icon: "/svgs/pool.svg",
          // value: checkAdditional("Swimming Pool"),
        },
        {
          name: "Barbecue Oven",
          label: "Barbecue Oven",
          icon: "/svgs/mangal.svg",
          // value: checkAdditional("Barbecue Oven"),
        },
      ],
    },
    apartment: {
      Utilities: [
        {
          name: "Constant Water Supply",
          label: "Constant Water Supply",
          icon: "/svgs/water-top.svg",
          // value: checkUtility("Constant water"),
        },
        {
          name: "Hot Water",
          label: "Hot Water",
          icon: "/svgs/warm-water.svg",
          // value: checkUtility("Warm Water"),
        },
        {
          name: "Electricity",
          label: "Electricity",
          icon: "/svgs/electric-socket.svg",
          // value: checkUtility("Electricity"),
        },
        {
          name: "Gas",
          label: "Gas",
          icon: "/svgs/gas.svg",
          // value: checkUtility("Gas"),
        },
        {
          name: "Individual Heating",
          label: "Individual Heating",
          icon: "/svgs/sun-side.svg",
          // value: checkUtility("Individual Heating"),
        },
      ],
      Additional: [
        {
          name: "Open Balcony",
          label: "Open Balcony",
          icon: "/svgs/open-balcony.svg",
          // value: checkAdditional("Open Balcony"),
        },
        {
          name: "Closed Balcony",
          label: "Closed Balcony",
          icon: "/svgs/close-balcony.svg",
          // value: checkAdditional("Closed Balcony"),
        },
        {
          name: "Terrace",
          label: "Terrace",
          icon: "/svgs/terrasse.svg",
          // value: checkAdditional("Terrace"),
        },
        {
          name: "Sun Side",
          label: "Sun Side",
          icon: "/svgs/sun-side.svg",
          // value: checkAdditional("Sun Side"),
          isPending: true,
        },
        {
          name: "Storeroom",
          label: "Storeroom",
          icon: "/svgs/storage-room.svg",
          // value: checkAdditional("Storeroom"),
        },
        {
          name: "Parking",
          label: "Parking",
          icon: "/svgs/parking.svg",
          // value: checkAdditional("Parking"),
        },
        {
          name: "Garage",
          label: "Garage",
          icon: "/svgs/garage.svg",
          // value: checkAdditional("Garage"),
        },
        {
          name: "Elevator",
          label: "Elevator",
          icon: "/svgs/elevator.svg",
          // value: checkAdditional("Elevator"),
          isPending: true,
        },
        {
          name: "Alarm system",
          label: "Alarm system",
          icon: "/svgs/security-protection.svg",
          // value: checkAdditional("Alarm system"),
          isPending: true,
        },
        {
          name: "The intercom",
          label: "The intercom",
          icon: "/svgs/intercom.svg",
          // value: checkAdditional("The intercom"),
          isPending: true,
        },
      ],
    },
    commercial: {
      Utilities: [
        {
          name: "Constant Water Supply",
          label: "Constant Water Supply",
          icon: "/svgs/water-top.svg",
          // value: checkUtility("Constant water"),
        },
        {
          name: "Hot Water",
          label: "Hot Water",
          icon: "/svgs/warm-water.svg",
          // value: checkUtility("Warm Water"),
        },
        {
          name: "Electricity",
          label: "Electricity",
          icon: "/svgs/electric-socket.svg",
          // value: checkUtility("Electricity"),
        },
        {
          name: "Gas",
          label: "Gas",
          icon: "/svgs/gas.svg",
          // value: checkUtility("Gas"),
        },
        {
          name: "Individual Heating",
          label: "Individual Heating",
          icon: "/svgs/sun-side.svg",
          // value: checkUtility("Individual Heating"),
        },
      ],
      Additional: [
        {
          name: "Garage",
          label: "Garage",
          icon: "/svgs/garage.svg",
          // value: checkAdditional("Garage"),
        },
        {
          name: "Parking Lot",
          label: "Parking Lot",
          icon: "/svgs/parking.svg",
          // value: checkAdditional("Parking Lot"),
        },
        {
          name: "Security System",
          label: "Security System",
          icon: "/svgs/security-protection.svg",
          // value: checkAdditional("Security System"),
        },
        {
          name: "Elevator",
          label: "Elevator",
          icon: "/svgs/elevator.svg",
          // value: checkAdditional("Elevator"),
        },
        {
          name: "Air Conditioner",
          label: "Air Conditioner",
          icon: "/svgs/air-conditioner.svg",
          // value: checkAdditional("Air Conditioner"),
        },
        {
          name: "Satellite Dish",
          label: "Satellite Dish",
          icon: "/svgs/satellite-dish.svg",
          // value: checkAdditional("Satellite Dish"),
        },
        {
          name: "Internet",
          label: "Internet",
          icon: "/svgs/internet.svg",
          // value: checkAdditional("Internet"),
        },
      ],
    },
    land: {
      Utilities: [
        {
          name: "fence",
          label: "Fence",
          icon: "/svgs/fence.svg",
          // value: checkUtility("Constant water"),
        },
        {
          name: "fenced",
          label: "Fenced",
          icon: "/svgs/waste-sewer.svg",
          // value: checkUtility("Constant water"),
        },
        {
          name: "irrigation water",
          label: "Irrigation Water",
          icon: "/svgs/water-top.svg",
          // value: checkUtility("Warm Water"),
        },
        {
          name: "sewer",
          label: "Sewer",
          icon: "/svgs/waste-sewer.svg",
          // value: checkUtility("Warm Water"),
        },
      ],
    },
  },
  hy: {
    house: {
      Utilities: [
        {
          name: "Electricity",
          label: "Էլեկտրականություն",
          icon: "/svgs/electric-socket.svg",
          // value: checkUtility("Electricity"),
        },
        {
          name: "Gas",
          label: "Գազ",
          icon: "/svgs/gas.svg",
          // value: checkUtility("Gas"),
        },
        {
          name: "Drainage",
          label: "Կոյուղի",
          icon: "/svgs/drainage.svg",
          // value: checkUtility("Drainage"),
        },
        {
          name: "Constant Water Supply",
          label: "Մշտական ջուր",
          icon: "/svgs/water-top.svg",
          // value: checkUtility("Constant water"),
        },
        {
          name: "Hot Water",
          label: "Տաք ջուր",
          icon: "/svgs/warm-water.svg",
          // value: checkUtility("Warm Water"),
        },
        {
          name: "Irrigation System",
          label: "Ոռոգման ջուր",
          icon: "/svgs/water-can-2.svg",
          // value: checkUtility("Irrigation System"),
        },
        {
          name: "Individual Heating",
          label: "Անհատական ջեռուցում",
          icon: "/svgs/sun-side.svg",
          // value: checkUtility("Individual Heating"),
        },
      ],
      Additional: [
        {
          name: "Garage",
          label: "Ավտոտնակ",
          icon: "/svgs/garage.svg",
          // value: checkAdditional("Garage"),
        },
        {
          name: "Parking",
          label: "Կայանատեղի",
          icon: "/svgs/parking.svg",
          // value: checkAdditional("Parking"),
        },
        {
          name: "Security System",
          label: "Անվտանգության համակարգ",
          icon: "/svgs/security-protection.svg",
          // value: checkAdditional("Security System"),
        },
        {
          name: "Intercom",
          label: "Դոմոֆոն",
          icon: "/svgs/intercom.svg",
          // value: checkAdditional("Intercom"),
        },
        {
          name: "Fireplace",
          label: "Բուխարի",
          icon: "/svgs/fireplace.svg",
          // value: checkAdditional("Fireplace"),
        },
        {
          name: "Air Conditioner",
          label: "Օդորակիչ",
          icon: "/svgs/air-conditioner.svg",
          // value: checkAdditional("Air Conditioner"),
        },
        {
          name: "Satellite Dish",
          label: "Արբանյակային ալեհավաք",
          icon: "/svgs/satellite-dish.svg",
          // value: checkAdditional("Satellite Dish"),
        },
        {
          name: "Swimming Pool",
          label: "Լողավազան",
          icon: "/svgs/pool.svg",
          // value: checkAdditional("Swimming Pool"),
        },
        {
          name: "Barbecue Oven",
          label: "Մանղալ",
          icon: "/svgs/mangal.svg",
          // value: checkAdditional("Barbecue Oven"),
        },
      ],
    },
    apartment: {
      Utilities: [
        {
          name: "Constant Water Supply",
          label: "Մշտական ջուր",
          icon: "/svgs/water-top.svg",
          // value: checkUtility("Constant water"),
        },
        {
          name: "Hot Water",
          label: "Տաք ջուր",
          icon: "/svgs/warm-water.svg",
          // value: checkUtility("Warm Water"),
        },
        {
          name: "Electricity",
          label: "Էլեկտրականություն",
          icon: "/svgs/electric-socket.svg",
          // value: checkUtility("Electricity"),
        },
        {
          name: "Gas",
          label: "Գազ",
          icon: "/svgs/gas.svg",
          // value: checkUtility("Gas"),
        },
        {
          name: "Individual Heating",
          label: "Անհատական ջեռուցում",
          icon: "/svgs/sun-side.svg",
          // value: checkUtility("Individual Heating"),
        },
      ],
      Additional: [
        {
          name: "Open Balcony",
          label: "Բաց պատշգամբ",
          icon: "/svgs/open-balcony.svg",
          // value: checkAdditional("Open Balcony"),
        },
        {
          name: "Closed Balcony",
          label: "Փակ պատշգամբ",
          icon: "/svgs/close-balcony.svg",
          // value: checkAdditional("Closed Balcony"),
        },
        {
          name: "Terrace",
          label: "Տեռաս",
          icon: "/svgs/terrasse.svg",
          // value: checkAdditional("Terrace"),
        },
        {
          name: "Sun Side",
          label: "Արևկող",
          icon: "/svgs/sun-side.svg",
          // value: checkAdditional("Sun Side"),
          isPending: true,
        },
        {
          name: "Storeroom",
          label: "Խորդանոց",
          icon: "/svgs/storage-room.svg",
          // value: checkAdditional("Storeroom"),
        },
        {
          name: "Parking",
          label: "Ավտոկայանատեղի,",
          icon: "/svgs/parking.svg",
          // value: checkAdditional("Parking"),
        },
        {
          name: "Garage",
          label: "Ավտոտնակ",
          icon: "/svgs/garage.svg",
          // value: checkAdditional("Garage"),
        },
        {
          name: "Elevator",
          label: "Վերելակ",
          icon: "/svgs/elevator.svg",
          // value: checkAdditional("Elevator"),
          isPending: true,
        },
        {
          name: "Alarm system",
          label: "Անվտանգության համակարգ",
          icon: "/svgs/security-protection.svg",
          // value: checkAdditional("Alarm system"),
          isPending: true,
        },
        {
          name: "The intercom",
          label: "Դոմոֆոն",
          icon: "/svgs/intercom.svg",
          // value: checkAdditional("The intercom"),
          isPending: true,
        },
      ],
    },
    commercial: {
      Utilities: [
        {
          name: "Constant Water Supply",
          label: "Մշտական ջուր",
          icon: "/svgs/water-top.svg",
          // value: checkUtility("Constant water"),
        },
        {
          name: "Warm Water",
          label: "Տաք ջուր",
          icon: "/svgs/warm-water.svg",
          // value: checkUtility("Warm Water"),
        },
        {
          name: "Electricity",
          label: "Էլեկտրականություն",
          icon: "/svgs/electric-socket.svg",
          // value: checkUtility("Electricity"),
        },
        {
          name: "Gas",
          label: "Գազ",
          icon: "/svgs/gas.svg",
          // value: checkUtility("Gas"),
        },
        {
          name: "Individual Heating",
          label: "Անհատական ջեռուցում",
          icon: "/svgs/sun-side.svg",
          // value: checkUtility("Individual Heating"),
        },
      ],
      Additional: [
        {
          name: "Garage",
          label: "Ավտոտնակ",
          icon: "/svgs/garage.svg",
          // value: checkAdditional("Garage"),
        },
        {
          name: "Parking Lot",
          label: "Կայանատեղի",
          icon: "/svgs/parking.svg",
          // value: checkAdditional("Parking Lot"),
        },
        {
          name: "Security System",
          label: "Անվտանգության համակարգ",
          icon: "/svgs/security-protection.svg",
          // value: checkAdditional("Security System"),
        },
        {
          name: "Elevator",
          label: "Վերելակ",
          icon: "/svgs/elevator.svg",
          // value: checkAdditional("Elevator"),
        },
        {
          name: "Air Conditioner",
          label: "Օդորակիչ",
          icon: "/svgs/air-conditioner.svg",
          // value: checkAdditional("Air Conditioner"),
        },
        {
          name: "Satellite Dish",
          label: "Արբանյակային ալեհավաք",
          icon: "/svgs/satellite-dish.svg",
          // value: checkAdditional("Satellite Dish"),
        },
        {
          name: "Internet",
          label: "Ինտերնետ",
          icon: "/svgs/internet.svg",
          // value: checkAdditional("Internet"),
        },
      ],
    },
    land: {
      Utilities: [
        {
          name: "fence",
          label: "Ցանկապատ",
          icon: "/svgs/fence.svg",
        },
        {
          name: "fenced",
          label: "Ցանկապատված",
          icon: "/svgs/waste-sewer.svg",
        },
        {
          name: "irrigation water",
          label: "Ոռոգման ջուր",
          icon: "/svgs/water-top.svg",
        },
        {
          name: "sewer",
          label: "Կոյուղի",
          icon: "/svgs/waste-sewer.svg",
        },
      ],
    },
  },
  rus: {
    house: {
      Utilities: [
        {
          name: "Electricity",
          label: "Электричество",
          icon: "/svgs/electric-socket.svg",
          // value: checkUtility("Electricity"),
        },
        {
          name: "Gas",
          label: "Газ",
          icon: "/svgs/gas.svg",
          // value: checkUtility("Gas"),
        },
        {
          name: "Drainage",
          label: "Канализация",
          icon: "/svgs/drainage.svg",
          // value: checkUtility("Drainage"),
        },
        {
          name: "Constant Water Supply",
          label: "Постоянная вода",
          icon: "/svgs/water-top.svg",
          // value: checkUtility("Constant water"),
        },
        {
          name: "Warm Water",
          label: "Горячая вода",
          icon: "/svgs/warm-water.svg",
          // value: checkUtility("Warm Water"),
        },
        {
          name: "Irrigation System",
          label: "Вода для полива",
          icon: "/svgs/water-can-2.svg",
          // value: checkUtility("Irrigation System"),
        },
        {
          name: "Individual Heating",
          label: "Индивидуальное отопление",
          icon: "/svgs/sun-side.svg",
          // value: checkUtility("Individual Heating"),
        },
      ],
      Additional: [
        {
          name: "Garage",
          label: "Гараж",
          icon: "/svgs/garage.svg",
          // value: checkAdditional("Garage"),
        },
        {
          name: "Parking",
          label: "Парковка",
          icon: "/svgs/parking.svg",
          // value: checkAdditional("Parking"),
        },
        {
          name: "Security System",
          label: "Система безопасности",
          icon: "/svgs/security-protection.svg",
          // value: checkAdditional("Security System"),
        },
        {
          name: "Intercom",
          label: "Домофон",
          icon: "/svgs/intercom.svg",
          // value: checkAdditional("Intercom"),
        },
        {
          name: "Fireplace",
          label: "Камин",
          icon: "/svgs/fireplace.svg",
          // value: checkAdditional("Fireplace"),
        },
        {
          name: "Air Conditioner",
          label: "Кондиционер",
          icon: "/svgs/air-conditioner.svg",
          // value: checkAdditional("Air Conditioner"),
        },
        {
          name: "Satellite Dish",
          label: "Спутниковая антенна",
          icon: "/svgs/satellite-dish.svg",
          // value: checkAdditional("Satellite Dish"),
        },
        {
          name: "Swimming Pool",
          label: "Бассейн",
          icon: "/svgs/pool.svg",
          // value: checkAdditional("Swimming Pool"),
        },
        {
          name: "Barbecue Oven",
          label: "Барбекю",
          icon: "/svgs/mangal.svg",
          // value: checkAdditional("Barbecue Oven"),
        },
      ],
    },
    apartment: {
      Utilities: [
        {
          name: "Constant Water Supply",
          label: "Постоянная вода",
          icon: "/svgs/water-top.svg",
          // value: checkUtility("Constant water"),
        },
        {
          name: "Warm Water",
          label: "Горячая вода",
          icon: "/svgs/warm-water.svg",
          // value: checkUtility("Warm Water"),
        },
        {
          name: "Electricity",
          label: "Электричество",
          icon: "/svgs/electric-socket.svg",
          // value: checkUtility("Electricity"),
        },
        {
          name: "Gas",
          label: "Газ",
          icon: "/svgs/gas.svg",
          // value: checkUtility("Gas"),
        },
        {
          name: "Individual Heating",
          label: "Индивидуальное отопление",
          icon: "/svgs/sun-side.svg",
          // value: checkUtility("Individual Heating"),
        },
      ],
      Additional: [
        {
          name: "Open Balcony",
          label: "Открытый балкон",
          icon: "/svgs/open-balcony.svg",
          // value: checkAdditional("Open Balcony"),
        },
        {
          name: "Closed Balcony",
          label: "Закрытый балкон",
          icon: "/svgs/close-balcony.svg",
          // value: checkAdditional("Closed Balcony"),
        },
        {
          name: "Terrace",
          label: "Терраса",
          icon: "/svgs/terrasse.svg",
          // value: checkAdditional("Terrace"),
        },
        {
          name: "Sun Side",
          label: "Солнечная сторона",
          icon: "/svgs/sun-side.svg",
          // value: checkAdditional("Sun Side"),
          isPending: true,
        },
        {
          name: "Storeroom",
          label: "Кладовая",
          icon: "/svgs/storage-room.svg",
          // value: checkAdditional("Storeroom"),
        },
        {
          name: "Parking",
          label: "Парковка",
          icon: "/svgs/parking.svg",
          // value: checkAdditional("Parking"),
        },
        {
          name: "Garage",
          label: "Гараж",
          icon: "/svgs/garage.svg",
          // value: checkAdditional("Garage"),
        },
        {
          name: "Elevator",
          label: "Лифт",
          icon: "/svgs/elevator.svg",
          // value: checkAdditional("Elevator"),
          isPending: true,
        },
        {
          name: "Alarm system",
          label: "Сигнализация",
          icon: "/svgs/security-protection.svg",
          // value: checkAdditional("Alarm system"),
          isPending: true,
        },
        {
          name: "The intercom",
          label: "Домофон",
          icon: "/svgs/intercom.svg",
          // value: checkAdditional("The intercom"),
          isPending: true,
        },
      ],
    },
    commercial: {
      Utilities: [
        {
          name: "Constant Water Supply",
          label: "Постоянная вода",
          icon: "/svgs/water-top.svg",
          // value: checkUtility("Constant water"),
        },
        {
          name: "Warm Water",
          label: "Горячая вода",
          icon: "/svgs/warm-water.svg",
          // value: checkUtility("Warm Water"),
        },
        {
          name: "Electricity",
          label: "Электричество",
          icon: "/svgs/electric-socket.svg",
          // value: checkUtility("Electricity"),
        },
        {
          name: "Gas",
          label: "Газ",
          icon: "/svgs/gas.svg",
          // value: checkUtility("Gas"),
        },
        {
          name: "Individual Heating",
          label: "Индивидуальное отопление",
          icon: "/svgs/sun-side.svg",
          // value: checkUtility("Individual Heating"),
        },
      ],
      Additional: [
        {
          name: "Garage",
          label: "Гараж",
          icon: "/svgs/garage.svg",
          // value: checkAdditional("Garage"),
        },
        {
          name: "Parking Lot",
          label: "Парковка",
          icon: "/svgs/parking.svg",
          // value: checkAdditional("Parking Lot"),
        },
        {
          name: "Security System",
          label: "Система безопасности",
          icon: "/svgs/security-protection.svg",
          // value: checkAdditional("Security System"),
        },
        {
          name: "Elevator",
          label: "Лифт",
          icon: "/svgs/elevator.svg",
          // value: checkAdditional("Elevator"),
        },
        {
          name: "Air Conditioner",
          label: "Кондиционер",
          icon: "/svgs/air-conditioner.svg",
          // value: checkAdditional("Air Conditioner"),
        },
        {
          name: "Satellite Dish",
          label: "Спутниковая антенна",
          icon: "/svgs/satellite-dish.svg",
          // value: checkAdditional("Satellite Dish"),
        },
        {
          name: "Internet",
          label: "Интернет",
          icon: "/svgs/internet.svg",
          // value: checkAdditional("Internet"),
        },
      ],
    },
    land: {
      Utilities: [
        {
          name: "fence",
          label: "Забор",
          icon: "/svgs/fence.svg",
        },
        {
          name: "fenced",
          label: "Огороженный",
          icon: "/svgs/waste-sewer.svg",
        },
        {
          name: "irrigation water",
          label: "Вода для орошения",
          icon: "/svgs/water-top.svg",
        },
        {
          name: "sewer",
          label: "Канализация",
          icon: "/svgs/waste-sewer.svg",
        },
      ],
    },
  },
} as const;

const types = ["apartment", "house", "commercial", "land"] as const;
export type propteryType = (typeof types)[number];
export function getFeatureList(type: propteryType, lang: langType) {
  if (!types.includes(type)) {
    return null;
  }
  return featureList[lang][type];
}

export default function FeatureList({
  details,
  lang,
  type,
  dict,
}: {
  lang: langType;
  details: {
    utilities: string[];
    additionalUtilities: string[];
  };
  type: string;
  dict: SingeProperty;
}) {
  function check(list: string[], name: string) {
    return list.some((utl) => utl.toLowerCase() === name.toLowerCase())
      ? dict.Yes
      : dict.No;
  }

  const features = getFeatureList(type as propteryType, lang);

  if (!features) return null;

  return (
    <div className="mt-8 grid grid-cols-2 gap-6 xxl:gap-24">
      <div className="col-span-2 lg:col-span-1">
        <h6 className="text-sm font-semibold xxl:text-base min-[1700px]:text-base">
          {dict.buildingFeatures}
        </h6>
        <div className="mt-3 flex flex-col gap-5 text-sm 2xl:text-base">
          {features?.Utilities?.map((utility: any, i: number) => (
            <div key={i} className="flex justify-between">
              <div className="flex gap-2">
                <div className="h-6 w-6">
                  <Image
                    title={utility.label}
                    src={utility.icon}
                    width={24}
                    height={24}
                    alt="views"
                  />
                </div>
                <p>{utility.label}</p>
              </div>
              <span className="font-semibold">
                {check(details.utilities, utility.name)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {"Additional" in features && features.Additional && (
        <div className="col-span-2 mt-8 lg:col-span-1 lg:mt-0">
          <h6 className="text-sm font-semibold xxl:text-base min-[1700px]:text-base">
            {dict.ApartmentFeatures}
          </h6>
          <div className="mt-3 flex flex-col gap-5 text-sm 2xl:text-base">
            {features?.Additional?.map((additional: any, i: number) => (
              <div key={i} className="flex justify-between">
                <div className="flex gap-2">
                  <div className="h-6 w-6">
                    <Image
                      title={additional.label}
                      src={additional.icon}
                      width={24}
                      height={24}
                      alt="views"
                    />
                  </div>
                  <p>{additional.label}</p>
                </div>
                <span className="font-semibold">
                  {check(details.additionalUtilities, additional.name)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
