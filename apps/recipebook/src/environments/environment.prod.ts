export const environment = {
  production: true,
  apiUrl: 'https://recipebook-spring-server.azurewebsites.net/',
  msal: {
    clientId: 'f6b112f2-375a-41c0-b27f-aae04c58a072',
    tenantId: 'f66b9a1c-1fb5-4639-822e-f61383bf4e2b',
    redirect: 'https://ashy-meadow-0a0b8611e.4.azurestaticapps.net'
  },
  graph: {
      uri: 'https://graph.microsoft.com/v1.0/me',
      scopes: ['user.read']
  }
}