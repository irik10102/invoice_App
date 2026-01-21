import { useRef } from "react"
import { useState } from "react";
import React from "react";

interface Item{
    name:string,
    price:number,
    category:string,
    qty:number,
    added:boolean
}

const ItemInfo = ()=>{
    const refName = useRef<HTMLInputElement>(null);
    const refPrice = useRef<HTMLInputElement>(null);
    const refCat   = useRef<HTMLSelectElement>(null);

    const [cartList, setCartList] = useState<Item[]>([]);
    const [list, setList] = useState<Item[]>([]);

    

    const listItem = ()=>{
        const name = refName.current!.value;
        const price = refPrice.current!.value;
        const cat = refCat.current!.value;

        setList([...list, {['name']:name, ['price']:Number(price), ['category']:cat, ['qty']:0, ['added']:false}]);
    }

    const inc = (ind:number)=>{
        list[ind].qty +=1;
        setList([...list]);
    }
    const dec = (ind:number)=>{
        if(list[ind].qty>0){
            list[ind].qty -=1;
            setList([...list]);
        }
    }

    const addCart = (ind:number)=>{
        list[ind].added = true;
        setList([...list]);

        cartList.push(list[ind]);
        setCartList([...cartList]);
    }


    return(
        <>
            <table className="container mt-5" >
                <tr>
                    <td><b>Item Name:</b></td>
                    <td><input type="text" ref={refName}/></td>
                </tr>
                <tr>
                    <td><b>Price:</b></td>
                    <td><input type="number" ref={refPrice}/></td>
                </tr>
                <tr>
                    <td><b>Category:</b></td>
                    <td>
                        <select ref={refCat}>
                            <option>Select an Option</option>
                            <option value="Household">Household</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Dress">Dress</option>
                            <option value="Food">Food</option>
                            <option value="Sports">Sports</option>
                            <option value="Drinks">Drinks</option>
                        </select>
                    </td>
                </tr>
            <tr><td colSpan={2}><button onClick ={listItem}>List Item</button></td></tr>
             </table>
             <div className="container mt-5 ">
                {(list.length > 0)?<table >
                                        <tr>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Category</th>
                                            <th colSpan={3}>Quantity</th>
                                            <th></th>
                                            <th></th>
                                            <th>Action</th>
                                        </tr>
                                        {list.map((val,ind)=>{
                                            const {name, price, category, qty} = val;
                                            return  <tr>
                                                        <td>{name}</td>
                                                        <td>{price}</td>
                                                        <td>{category}</td>
                                                        <td ><button onClick={()=>inc(ind)}>+</button></td>
                                                        <td>{qty}</td>
                                                        <td><button onClick={()=>dec(ind)}>-</button></td>
                                                        <td >{(!val.added)?<button onClick={()=>addCart(ind)}>Add Cart</button>:<p><b>Added!</b></p>}</td>
                                                    </tr>
                    
                })}</table>:<p><b>No Items Added yet!</b></p>}
                <table>
                    
                </table>
            </div>
           
            
        </>
    )
}

export default ItemInfo;