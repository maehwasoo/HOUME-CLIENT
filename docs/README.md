# docs/

이 폴더는 **HOUME-CLIENT**의 설계/구조/운영/참조 문서를 모아두는 곳입니다.
목표는 신규 기여자가 “어디에 무엇이 있는지”를 빠르게 찾고, 결정의 근거를 추적할 수 있게 하는 것입니다.

## Index

### Architecture

- [Layer Architecture](./architecture/layer-architecture.md)
- [Route Architecture](./architecture/route-architecture.md)
- [API Architecture](./architecture/api-architecture.md)
- [State & Hooks](./architecture/state-and-hooks.md)

### Decisions (ADR)

- `./decisions/`: 설계 결정 기록(ADR, Architecture Decision Record)
  - 파일명 규칙: `NNNN_제목_...md` (예: `0001_카카오_OAuth_...md`)

### Changes

- `./changes/`: 변경 기록(왜/무엇/검증) 모음
  - [Index](./changes/README.md)

### Reference

- [Styling System](./reference/styling-system.md)
- [Component Catalog](./reference/component-catalog.md)
- [Furniture Curation Mapping](./reference/curation-mapping.md)

### Operations

- [ONNX Runtime(Web) 도입 기록](./operations/onnx-runtime-web.md)

## 작성/유지 규칙(간단)

- 문서 안의 파일 경로/링크는 **현재 코드 기준**으로 유지합니다.
- 코드 구조 변경이 있으면, 영향받는 문서도 함께 업데이트합니다.
- 빈 폴더는 `.gitkeep`로 유지합니다.
