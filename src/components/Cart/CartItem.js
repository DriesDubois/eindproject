import {useCartContext} from "../../contexts/cartContext";

export function CartItem(props) {
    const {item} = props;
    const {removeCart} = useCartContext();


    return (
        <div className={"cartGrid"}>
            <p className={"mb-0 text-4xl cartGridName"}>{item.name}</p>
            <div className={"text-right"} onClick={() => removeCart(item)}>
                <span className={"removeButton text-4xl pr-1 select-none"}>x</span>
            </div>
        </div>
    )

}