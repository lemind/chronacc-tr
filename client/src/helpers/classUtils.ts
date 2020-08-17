
type classType = string | boolean

export function cc(...classes: classType[]): string {
  let className = ''
  classes.forEach(klass => {
    if (klass) {
      className += klass + ' '
    }
  })
  return className
}
