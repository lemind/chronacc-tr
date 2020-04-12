import { IGateway, IGatewayClass } from "src/redux/Gateway";

export interface IGatewaySingletone {
  customName: string
  (): IGateway
}

export function gatewayFactory(GatewayClass: IGatewayClass,
  name?: string): IGatewaySingletone {
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
