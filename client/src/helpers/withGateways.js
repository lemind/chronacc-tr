import React, {Component} from 'react'
import toLower from 'lodash/toLower'

// ToDo: helper string
const firstLowerCase = (s) => {
  return toLower(s[0]) + s.substr(1);
}

/**
 * Provides Gateways.
 *
 * @param {Gateway} - one Gateway or multiple
 *
 * @return {Class} - Wrapped Class with access to Gateway
 *
 * example: @withGateways(TasksGateway), access - this.gateways.tasksGateway
 */
export default function withGateways(...gateways) {
  return (TargetClass) => {
    return class WithGateways extends TargetClass {
      constructor(){
        super()

        this.store = null
        this.initGateways()
      }

      initGateways(){
        this.gateways = {}

        for (let gatewayItem of gateways) {
          const gatewayName = firstLowerCase(gatewayItem.customName)

          this.gateways[gatewayName] = gatewayItem();

          if (!this.store) {
            this.store = this.gateways[gatewayName].store
          }
        }
      }
    }
  }
}
