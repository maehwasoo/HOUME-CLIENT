// swagger-typescript-api 실행 래퍼
// .env에서 SWAGGER_URL을 읽어 타입을 생성합니다.
// SWAGGER_URL을 커밋된 코드에 노출시키지 않기 위한 브릿지 스크립트입니다.

import { spawnSync } from 'node:child_process';
import process from 'node:process';

process.loadEnvFile('.env');

const url = process.env.SWAGGER_URL;
if (!url) {
  console.error(
    '.env에 SWAGGER_URL이 정의되어 있지 않습니다. Swagger 문서 URL을 추가한 후 다시 실행해주세요.'
  );
  process.exit(1);
}

const result = spawnSync(
  'pnpm',
  [
    'exec',
    'swagger-typescript-api',
    'generate',
    '-p',
    url,
    '-o',
    'src/shared/apis/__generated__',
    '--no-client',
    '--modular',
    '-d',
    '--extract-request-body',
    '--extract-response-body',
    '--extract-response-error',
  ],
  { stdio: 'inherit' }
);

process.exit(result.status ?? 1);
