const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function getApiUrl(resource) {
  return `${apiBaseUrl}/${resource}`
}

export function getCollection(payload) {
  if (Array.isArray(payload)) return payload
  return payload.items ?? payload.results ?? payload.data ?? []
}

export async function fetchCollection(endpoint) {
  const response = await fetch(endpoint)
  if (!response.ok) throw new Error(`Unable to load ${endpoint}`)
  return getCollection(await response.json())
}