//suggest api
export interface SuggestResponse {
  suggest_reqid: string;
  results: Result[];
}

interface Result {
  title: Title;
  subtitle: Title;
  tags: string[];
  distance: Distance;
  address: Address;
}

interface Address {
  formatted_address: string;
  component: Component[];
}

interface Component {
  name: string;
  kind: string[];
}

interface Distance {
  value: number;
  text: string;
}

interface Title {
  text: string;
  hl: Hl[];
}

interface Hl {
  begin: number;
  end: number;
}

//geo api
export interface GeoResponse {
  response: Response;
}

interface Response {
  GeoObjectCollection: GeoObjectCollection;
}

interface GeoObjectCollection {
  metaDataProperty: MetaDataProperty;
  featureMember: FeatureMember[];
}

export interface FeatureMember {
  GeoObject: GeoObject;
}

interface GeoObject {
  metaDataProperty: MetaDataProperty2;
  name: string;
  description: string;
  boundedBy: BoundedBy;
  uri: string;
  Point: Point;
}

interface Point {
  pos: string;
}

interface MetaDataProperty2 {
  GeocoderMetaData: GeocoderMetaData;
}

interface GeocoderMetaData {
  precision: string;
  text: string;
  kind: string;
  Address: GeoAddress;
  AddressDetails: AddressDetails;
}

interface AddressDetails {
  Country: Country;
}

interface Country {
  AddressLine: string;
  CountryNameCode: string;
  CountryName: string;
  AdministrativeArea: AdministrativeArea;
}

interface AdministrativeArea {
  AdministrativeAreaName: string;
  Locality: Locality;
}

interface Locality {
  LocalityName: string;
  Thoroughfare: Thoroughfare;
}

interface Thoroughfare {
  ThoroughfareName: string;
}

interface GeoAddress {
  country_code: string;
  formatted: string;
  Components: GeoComponent[];
}

interface GeoComponent {
  kind: string;
  name: string;
}

interface MetaDataProperty {
  GeocoderResponseMetaData: GeocoderResponseMetaData;
}

interface GeocoderResponseMetaData {
  boundedBy: BoundedBy;
  request: string;
  results: string;
  found: string;
}

interface BoundedBy {
  Envelope: Envelope;
}

interface Envelope {
  lowerCorner: string;
  upperCorner: string;
}
