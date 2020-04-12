import { ICases, ICasesClass } from "src/cases/";
import { IGatewaySingletone } from 'helpers/gateway'

interface ICasesSingletone {
  customName: string
  (): ICases
}

export function casesFactory(CasesClass: ICasesClass, gateways: IGatewaySingletone[],
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
