export function filterItems(items,searchInput,maxPriceInput){
    if(searchInput === ""  && maxPriceInput==="") return items
    if(searchInput!=="" && maxPriceInput ==="" ) return items.filter(i=>(i.name.toLowerCase().includes(searchInput.toLowerCase())))
    return items.filter(i=>(i.name.toLowerCase().includes(searchInput.toLowerCase()) && (i.price<=maxPriceInput)  ))
}
