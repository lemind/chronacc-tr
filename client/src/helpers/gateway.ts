import { IGateway, IGatewayClass } from "src/redux/Gateway";
import { IProjectsGatewayGeneral } from "src/redux/projects";

export interface IGatewaySingletone<T> {
  customName: string
  (): T
}

export type TCommonGateway = IProjectsGatewayGeneral

export type TCommonGatewaySingletone = IGatewaySingletone<TCommonGateway>

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
