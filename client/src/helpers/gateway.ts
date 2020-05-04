import { IGatewayClass } from "src/redux/Gateway";
import { IProjectsGatewayCommon } from "src/redux/projects";
import { ITasksGatewayCommon } from "src/redux/tasks";

export interface IGatewaySingletone<T> {
  customName: string
  (): T
}

// TToDo: overhead?
export type TGatewayCommon = IProjectsGatewayCommon
  | ITasksGatewayCommon

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
