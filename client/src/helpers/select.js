
export function makeOptionFromItem(item){
  return {
    value: item._id,
    label: item.name
  }
}
