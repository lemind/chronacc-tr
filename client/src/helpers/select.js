
export function makeOptionsFromItem(item){
  return {
    value: item._id,
    label: item.name
  }
}
