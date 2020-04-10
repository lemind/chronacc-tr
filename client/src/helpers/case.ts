import { ICases, CasesClass } from "src/cases/";

interface ICasesSingletone {
  customName: string
  (): ICases
}

export function casesFactory(CasesClass: CasesClass, name?: string): ICasesSingletone {
  let singleton;
  const factory = () => {
    if (singleton == null) {
      singleton = new CasesClass()
    }

    return singleton
  }

  factory.customName = name || CasesClass.name
  return factory
}
