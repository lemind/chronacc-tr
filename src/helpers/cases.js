
export function caseFactory(CaseClass) {
  let singleton;
  const factory = (...whatever) => {
    if (singleton == null) {
      singleton = new CaseClass(...whatever)
    }

    return singleton
  }

  factory.caseName = CaseClass.name
  return factory
}
