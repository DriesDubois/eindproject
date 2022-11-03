import React from "react";
import {useCartContext} from "../../contexts/cartContext";
import {CartItem} from "./CartItem";
import {Button} from "react-bootstrap";

export function CartPage() {
    const {cart} = useCartContext();

    return (

        <div className={""}>

            <div className={""}>
                {cart.length===0
                    ? <div className={"min-vh-30 text-center flex justify-center items-center"}><p className={"text-6xl mb-3"}>Your cart is empty.</p></div>
                    : cart.map((item, index) => <CartItem item={item} key={index}/>)
                }
                <Button className={"btn btn-dark absolute bottom-10 right-0"} href={"#Order"}>Go to checkout</Button>
                {/*<Button className={"btn btn-dark absolute bottom-10 right-0"} href={"#Order"}>{t("Checkout is not available yet")}</Button>*/}
            </div>
        </div>
    )

}