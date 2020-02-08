import toLower from 'lodash/toLower'

export function firstLowerCase(str){
  return toLower(str[0]) + str.substr(1);
}
