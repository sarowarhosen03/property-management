export interface GeoCoderResponse {
  response: Response;
}

interface Response {
  GeoObjectCollection: GeoObjectCollection;
}

interface GeoObjectCollection {
  metaDataProperty: MetaDataProperty;
  featureMember: FeatureMember[];
}

interface FeatureMember {
  GeoObject: GeoObject;
}

interface GeoObject {
  metaDataProperty: MetaDataProperty2;
  name: string;
  description?: string;
  boundedBy: BoundedBy;
  uri: string;
  Point: Point;
}

interface BoundedBy {
  Envelope: Envelope;
}

interface Envelope {
  lowerCorner: string;
  upperCorner: string;
}

interface MetaDataProperty2 {
  GeocoderMetaData: GeocoderMetaData;
}

interface GeocoderMetaData {
  precision: string;
  text: string;
  kind: string;
  Address: Address;
  AddressDetails: AddressDetails;
}

interface AddressDetails {
  Country: Country;
}

interface Country {
  AddressLine: string;
  CountryNameCode: string;
  CountryName: string;
  AdministrativeArea?: AdministrativeArea;
}

interface AdministrativeArea {
  AdministrativeAreaName: string;
  Locality?: Locality;
}

interface Locality {
  LocalityName: string;
  Thoroughfare?: Thoroughfare;
  DependentLocality?: DependentLocality2;
}

interface DependentLocality2 {
  DependentLocalityName: string;
  DependentLocality?: DependentLocality;
}

interface DependentLocality {
  DependentLocalityName: string;
}

interface Thoroughfare {
  ThoroughfareName: string;
}

interface Address {
  country_code: string;
  formatted: string;
  Components: Component[];
}

interface Component {
  kind: string;
  name: string;
}

interface MetaDataProperty {
  GeocoderResponseMetaData: GeocoderResponseMetaData;
}

interface GeocoderResponseMetaData {
  Point: Point;
  request: string;
  results: string;
  found: string;
}

interface Point {
  pos: string;
}
