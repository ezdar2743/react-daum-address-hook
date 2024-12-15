# react-daum-address-hook

간단하고 가벼운 React용 Daum(Kakao) 주소 검색 훅입니다.
성능을 최적화 하여 매우 가볍게 사용 할 수 있으며, 아주 간단하게 다음 검색 기능을 사용 할 수 있습니다.

## 특징

- 🚀 간편한 사용
- 🎯 TypeScript 지원
- 📦 초경량 (556B gzipped)
- ⚛️ React 16.8+ 지원
- 🔄 Next.js 호환

## 설치

```bash
npm install react-daum-address-hook
```

또는

```bash
yarn add react-daum-address-hook
```

## 사용법

```tsx
import { useAddressSearch } from "react-daum-address-hook";
const AddressSearch = () => {
  // NOTE: onComplete is optional
  const { selectedAddress, openSearch, isReady } = useAddressSearch({
    onComplete: (data) => {
      setValue("postalCode", data.zonecode);
      setValue("address", `${data.address} ${data.buildingName || ""}`);
    },
  });
  console.log(selectedAddress);
  return (
    <div style={{ padding: "20px" }}>
      <button onClick={openSearch} disabled={!isReady}>
        주소 검색
      </button>

      {selectedAddress && (
        <div>
          <p>우편번호: {selectedAddress.zonecode}</p>
          <p>주소: {selectedAddress.address}</p>
        </div>
      )}
    </div>
  );
};
```

반환값
selectedAddress: 선택된 주소 정보

openSearch: 주소 검색 창을 여는 함수

isReady: 주소 검색 스크립트 로드 완료 여부

## Next.js에서 사용하기

Next.js에서 사용할 경우 next.config.js에 다음 설정을 추가해주세요:

```js
jsCopy;
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["react-daum-address-hook"],
};

module.exports = nextConfig;
```

## 스크린샷
<img width="1527" alt="스크린샷 2024-12-15 15 37 50" src="https://github.com/user-attachments/assets/bcf5dc82-7780-4c3b-a450-f92807e3276b" />
<img width="1255" alt="스크린샷 2024-12-15 15 38 05" src="https://github.com/user-attachments/assets/4900a593-0e13-42af-863e-8e36ca737aff" />

## 라이선스

MIT
