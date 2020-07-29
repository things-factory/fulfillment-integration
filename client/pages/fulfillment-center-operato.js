import { html, css } from 'lit-element'
import gql from 'graphql-tag'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { client, store, PageView } from '@things-factory/shell'

const FULLFILMENT_CENTER_RESULT = `{
  name
  platform
  centerId
  countryCode
  accessInfo
  status
}`

class FulfillmentCenterOperato extends connect(store)(PageView) {
  static get styles() {
    return css`
      :host {
        padding: 10px;
      }

      textarea {
        width: 800px;
        height: 400px;
      }
    `
  }

  static get properties() {
    return {
      id: String,
      fulfillmentCenter: Object,
      code: String,
      centerId: String
    }
  }

  get context() {
    return {
      title: 'center operato'
    }
  }

  render() {
    var { name = '', centerId = '', status = '', countryCode = '', accessInfo = '' } = this.fulfillmentCenter || {}

    return html`
      <a href="fulfillment-centers">Centers</a>

      <h2>${name}</h2>
      <h3>status: ${status || 'inactive'}</h3>
      <h3>center id (should be defined): ${centerId}</h3>
      <h3>country: ${countryCode}</h3>

      <h3>access information (to be hidden)</h3>
      <textarea .value=${accessInfo}> </textarea>

      <div>
        <div>
          ${status == 'active'
            ? html`<button @click=${e => this.deactivate(name)}>disconnect this center</button>`
            : html`<button @click=${e => this.activate(name)}>connect this center</button>`}
        </div>
      </div>
    `
  }

  stateChanged(state) {}

  async pageUpdated(changes, after, before) {
    if (changes.resourceId) {
      this.id = changes.resourceId

      const response = await client.query({
        query: gql`
          query($id: String!) {
            fulfillmentCenter(id: $id) ${FULLFILMENT_CENTER_RESULT}
          }
        `,
        variables: {
          id: this.id
        }
      })

      this.fulfillmentCenter = response.data.fulfillmentCenter
      this.centerId = this.fulfillmentCenter.centerId

      if (location.pathname.endsWith('connect-callback')) {
        let { code } = changes.params
        this.code = code

        await this.handleConnectCallback()
      }
    }
  }

  async getOperatoAuthURL() {
    var response = await client.query({
      query: gql`
        query($redirectUrl: String!, $nonce: String!, $centerId: String!) {
          getOperatoAuthURL(centerId: $centerId, nonce: $nonce, redirectUrl: $redirectUrl)
        }
      `,
      variables: {
        centerId: this.centerId,
        nonce: this.id,
        redirectUrl: location.origin + '/callback-operato'
      }
    })

    return response.data.getOperatoAuthURL
  }

  async handleConnectCallback() {
    const response = await client.mutate({
      mutation: gql`
        mutation($id: String!, $code: String!, $centerId: String!) {
          generateOperatoAccessToken(id: $id, code: $code, centerId: $centerId) ${FULLFILMENT_CENTER_RESULT}
        }
      `,
      variables: {
        id: this.id,
        code: this.code,
        centerId: this.centerId
      }
    })

    this.fulfillmentCenter = response.data.generateOperatoAccessToken
    var { status, name } = this.fulfillmentCenter

    document.dispatchEvent(
      new CustomEvent('notify', {
        detail: {
          level: 'info',
          message: `${status == 'active' ? 'success' : 'fail'} to activate : ${name}`
        }
      })
    )
  }

  async activate() {
    if (!this.centerId) {
      document.dispatchEvent(
        new CustomEvent('notify', {
          detail: {
            level: 'error',
            message: 'center id must be defined'
          }
        })
      )

      return
    }

    location.href = await this.getOperatoAuthURL()
  }

  async deactivate() {
    var { name } = this.fulfillmentCenter

    var response = await client.mutate({
      mutation: gql`
        mutation($name: String!) {
          deactivateOperatoCenter(name: $name) ${FULLFILMENT_CENTER_RESULT}
        }
      `,
      variables: {
        name
      }
    })

    this.fulfillmentCenter = response.data.deactivateOperatoCenter
    var { status } = this.fulfillmentCenter
    this.code = ''

    document.dispatchEvent(
      new CustomEvent('notify', {
        detail: {
          level: 'info',
          message: `${status == 'active' ? 'fail' : 'success'} to deactivate : ${name}`
        }
      })
    )
  }
}

customElements.define('fulfillment-center-operato', FulfillmentCenterOperato)
