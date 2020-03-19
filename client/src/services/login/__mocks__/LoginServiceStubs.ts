import TokenResult from '../../../models/TokenResult';

export const login = () => {
  const jwt = new TokenResult();
  // tslint:disable-next-line:max-line-length
  jwt.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1NUQU5EQVJEIl0sIm5hbWUiOiJEdXN0aW4gRmFsZ291dCIsImlkIjoiNWNlMDcyZTA3YjQxOGE2NDhmZDdmMGI0IiwidHlwZSI6IkNSRUFUT1IiLCJlbWFpbCI6ImR1c3RpbkBjcmVhdG9yLmNvbSJ9.ccmUlrB2j9VGyscVMziYXxs1FFfysfngp8d91rDFK6k';
  return jwt;
};
