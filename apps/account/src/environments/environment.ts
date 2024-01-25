export const environment = {
  production: false,
  apiUrl: 'http://localhost:8002/',
  msal: {
    clientId: '5042dc50-b247-4926-b3c1-81c0a9215ef9',
    tenantId: 'f66b9a1c-1fb5-4639-822e-f61383bf4e2b',
    redirect: 'http://localhost:4202'
  },
  graph: {
      uri: 'https://graph.microsoft.com/v1.0/me',
      scopes: ['user.read']
  }
}