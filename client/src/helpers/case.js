// ToDo
export function caseFactory(CaseClass, name) {
  let singleton;
  const factory = (...whatever) => {
    if (singleton == null) {
      singleton = new CaseClass(...whatever)
    }

    return singleton
  }

  factory.customName = name || CaseClass.name
  return factory
}
