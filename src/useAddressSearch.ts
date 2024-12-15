import { AddressSearchResult, UseAddressSearch } from "./type";
import { useState, useCallback, useEffect } from "react";

const POSTCODE_SCRIPT_URL =
  "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

declare global {
  interface Window {
    daum: {
      Postcode: new (config: {
        oncomplete: (data: AddressSearchResult) => void;
        onclose?: () => void;
      }) => {
        open: () => void;
      };
    };
  }
}
interface UseAddressSearchProps {
  onComplete?: (data: AddressSearchResult) => void;
}

export const useAddressSearch = (
  props?: UseAddressSearchProps
): UseAddressSearch => {
  const [selectedAddress, setSelectedAddress] =
    useState<AddressSearchResult | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (document.querySelector(`script[src="${POSTCODE_SCRIPT_URL}"]`)) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = POSTCODE_SCRIPT_URL;
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.head.appendChild(script);
  }, []);

  const openSearch = useCallback(async () => {
    if (!isScriptLoaded) {
      throw new Error("Address search is not ready yet. Please try again.");
    }

    try {
      await new window.daum.Postcode({
        oncomplete: (data: AddressSearchResult) => {
          setSelectedAddress(data);
          props?.onComplete?.(data);
        },
      }).open();
    } catch (error) {
      throw new Error("Failed to open address search.");
    }
  }, [isScriptLoaded]);

  return {
    selectedAddress,
    openSearch,
    isReady: isScriptLoaded,
  };
};
