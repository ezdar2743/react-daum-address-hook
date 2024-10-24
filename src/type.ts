export interface AddressSearchResult {
  // NOTE: postalcode
  zonecode: string;
  address: string;
  // NOTE: R: road address, J: jibun address
  addressType: "R" | "J";
  roadAddress?: string;
  jibunAddress?: string;
  buildingName?: string;
  // NOTE: English address
  addressEnglish?: string;
  roadAddressEnglish?: string;
  jibunAddressEnglish?: string;
}

export interface UseAddressSearch {
  selectedAddress: AddressSearchResult | null;
  openSearch: () => void;
}
