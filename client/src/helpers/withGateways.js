import React, {Component} from 'react'
import { firstLowerCase } from 'helpers/strings';


/**
 * Provides Gateways.
 *
 * @param {Gateway} - one Gateway or multiple
 *
 * @return {Class} - Wrapped Class with access to Gateway
 *
 * example: @withGateways(TasksGateway), access - this.gateways.tasksGateway
 */
// deprecated
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
