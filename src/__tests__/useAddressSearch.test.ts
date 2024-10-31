import { renderHook, act } from "@testing-library/react";
import { useAddressSearch } from "../useAddressSearch";

describe("useAddressSearch", () => {
  const mockPostcode = {
    open: jest.fn(),
  };

  beforeEach(() => {
    window.daum = {
      Postcode: jest.fn().mockImplementation((config) => {
        (window as any).__postcodeCallback = config.oncomplete;
        return mockPostcode;
      }),
    };
  });

  it("should update address when selected", async () => {
    const { result } = renderHook(() => useAddressSearch());

    act(() => {
      const script = document.querySelector("script");
      script?.dispatchEvent(new Event("load"));
    });

    const mockAddress = {
      zonecode: "12345",
      address: "서울시 강남구",
      addressType: "R" as const,
    };

    await act(async () => {
      await result.current.openSearch();
      (window as any).__postcodeCallback(mockAddress);
    });

    expect(result.current.selectedAddress).toEqual(mockAddress);
  });
});
