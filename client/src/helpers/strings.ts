import toLower from 'lodash/toLower'

export function firstLowerCase(str: string): string {
  return toLower(str[0]) + str.substr(1);
}
