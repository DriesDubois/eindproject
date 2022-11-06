import React from "react";
import {useCartContext} from "../../contexts/cartContext";
import {CartItem} from "./CartItem";
import {Button} from "react-bootstrap";

export function CartPage() {
    const {cart} = useCartContext();

    function totalPrice(cart){
        return cart.reduce((sum,item) => item.price * item.amount,0);
    }

    return (
            <div>
                <h3 className={"mb-3 text-center"}>Shopping cart</h3>
                {cart.length===0
                    ? <div className={""}><p className={"text-6xl mb-3"}>Your cart is empty.</p></div>
                    : <div className={"d-flex flex-column align-items-center"} style={{gap:"3rem"}}>{ cart.map((item, index) => <CartItem item={item} key={index}/>)}<div className={"text-center"}> <h4>Totale prijs: {totalPrice(cart)} Euro</h4> <Button className={"btn btn-dark mb-3"} href={"#Order"}>Go to checkout</Button></div></div>
                }

                {/*<Button className={"btn btn-dark absolute bottom-10 right-0"} href={"#Order"}>{t("Checkout is not available yet")}</Button>*/}
            </div>
    )

}