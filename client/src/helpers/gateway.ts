import { IGateway, IGatewayClass } from "src/redux/Gateway";
import { IProjectsGatewayCommon } from "src/redux/projects";

export interface IGatewaySingletone<T> {
  customName: string
  (): T
}

export type TGatewayCommon = IProjectsGatewayCommon

export type TGatewaySingletoneCommon = IGatewaySingletone<TGatewayCommon>

export function gatewayFactory<T>(GatewayClass: IGatewayClass<T>,
  name?: string): IGatewaySingletone<T> {
  let singleton;
  const factory = () => {
    if (singleton == null) {
      singleton = new GatewayClass()
    }

    return singleton
  }

  factory.customName = name || GatewayClass.name
  return factory
}
