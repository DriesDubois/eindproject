import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';

const CartContext = createContext();

export function CartProvider(props) {
    const [cart, setCart] = useState([])


    let localCart = localStorage.getItem("cart");

    useEffect(() => {
        console.log(localCart)
        localCart = JSON.parse(localCart);

        if(localCart) setCart(localCart)
    },[])


    const addItem = useCallback((item) => {

        if(cart.filter(i => i.id === item.id && i.size === item.size).length > 0){
            setCart(cart.map(i => i.id === item.id && i.size === item.size ? {...item, amount: i.amount += item.amount } : i))
            localStorage.setItem("cart", JSON.stringify(cart.map(i => i.id === item.id && i.size === item.size ? {...item, amount: i.amount += item.amount} : i)))
        }
        else{
            setCart([...cart, item])
            localStorage.setItem("cart", JSON.stringify([...cart, item]))
        }
    }, [cart, setCart])

    const removeCart = useCallback((item) =>{
        setCart(cart.filter(c => {return c.cartid !== item.cartid ? c : ""}))
        localStorage.setItem("cart", JSON.stringify(cart.filter(c => {return c.cartid !== item.cartid ? c : ""})))
    }, [cart, setCart])

    const changeAmountCart = useCallback((item) => {
        setCart(cart.map(c => c.cartid === item.cartid ? {...c, amount: item.amount} : c))
        localStorage.setItem("cart", JSON.stringify(cart.map(c => c.cartid === item.cartid ? {...c, amount: item.amount} : c)))
    }, [cart, setCart])

    const api = useMemo(() => ({
        cart, setCart, addItem, removeCart, changeAmountCart
    }), [cart, setCart, addItem, removeCart, changeAmountCart]);

    return <CartContext.Provider value={api}>
        {props.children}
    </CartContext.Provider>
}

export const useCartContext = () => useContext(CartContext);

