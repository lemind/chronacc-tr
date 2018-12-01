export function gatewayFactory(GatewayClass, name) {
  let singleton;
  const factory = (...whatever) => {
    if (singleton == null) {
      singleton = new GatewayClass(...whatever)
    }

    return singleton
  }

  factory.customName = name || GatewayClass.name
  return factory
}
