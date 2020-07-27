import { Operato } from './operato'

import { config } from '@things-factory/env'
const operatoConfig = config.get('fullfilmentIntegrationOperato', {})
const { apiKey, apiSecret } = operatoConfig

function substitute(path, obj) {
  var props = []
  var re = /{([^}]+)}/g
  var text

  while ((text = re.exec(path))) {
    props.push(text[1])
  }

  var result = path
  props.forEach(prop => {
    let value = obj[prop.trim()]
    result = result.replace(`{${prop}}`, value === undefined ? '' : value)
  })

  return result
}

export const action = async ({ center, method = 'get', path, request }) => {
  const client = new Operato({
    center: center.centerId,
    apiKey,
    apiSecret,
    accessToken: center.accessToken
  })

  const { resource = {}, payload = {} } = request

  path = substitute(path, resource)

  var response = await client[method](path, payload)
  if (response.errors) {
    throw response
  }

  return response
}
