import { getOperatoAuthURL } from './get-operato-auth-url'

import { deactivateOperatoCenter } from './deactivate-operato-center'
import { generateOperatoAccessToken } from './generate-operato-access-token'

export const Query = {
  ...getOperatoAuthURL
}

export const Mutation = {
  ...generateOperatoAccessToken,
  ...deactivateOperatoCenter
}
