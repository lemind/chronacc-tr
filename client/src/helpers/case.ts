import { ICases, ICasesClass } from "src/cases/";
import { IGatewaySingletone, TGatewaySingletoneCommon } from 'helpers/gateway'

export interface ICasesSingletone {
  customName: string
  (): ICases
}

export function casesFactory(CasesClass: ICasesClass,
  gateways: TGatewaySingletoneCommon[],
  name?: string): ICasesSingletone {
  let singleton;
  const factory = () => {
    if (singleton == null) {
      singleton = new CasesClass(gateways)
    }

    return singleton
  }

  factory.customName = name || CasesClass.name
  return factory
}
