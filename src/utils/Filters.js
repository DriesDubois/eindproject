export function filterItems(items,searchInput,shortSleeves,maxPriceInput){
    if(searchInput === "" && shortSleeves===undefined && maxPriceInput==="") return items
    return items.filter(i=>(i.name.toLowerCase().includes(searchInput.toLowerCase()) || i.name.toLowerCase().includes(searchInput.toLowerCase()))&& (i.price<=maxPriceInput) && (i.shortSleeves===shortSleeves)  )
}
