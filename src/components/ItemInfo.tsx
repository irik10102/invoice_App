import { useRef } from "react"
import { useState } from "react";
import React from "react";

import CartDetails from "./CartDetails";


interface Item{
    index:number,
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

    const [list, setList] = useState<Item[]>([]);
    const [cartList,setCartList] = useState<Item[]>([]);
    var indexG:number = 0;                                         //global index

    

    const listItem = ()=>{                                       //Adds new Item into the list
        const name = refName.current!.value;
        const price = refPrice.current!.value;
        const cat = refCat.current!.value;

        setList([...list, {['index']:indexG,['name']:name, ['price']:Number(price), ['category']:cat, ['qty']:1, ['added']:false}]);
        indexG+=1;
    }

    //Both inc and dec are updating the list
    const inc = (ind:number)=>{
        list[ind].qty +=1;
        setList([...list]);
    }
    const dec = (ind:number)=>{
        if(list[ind].qty>1){
            list[ind].qty -=1;
            setList([...list]);
        }
    }

    const addCart = (ind:number)=>{                      //we capture the state at which we want to keep it in list
        let obj:Item = {...list[ind]};
        setCartList([...cartList, obj]);    
        
        list[ind].added = true;
    }

    const remList = (ind:number)=>{                      //Removing from list and updating with setList()
        list.splice(ind,1);
        setList([...list]);
    }

    const cartUpd = (i:number)=>{                        //This function updates the cartList, so that the element in list could be added again the its "added" property is falsed.
        list[cartList[i].index].added = false;
        setList([...list]);

        cartList.splice(i,1);
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
                                            <th></th>
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
                                                        <td >{(!val.added)?<button onClick={()=>addCart(ind)}>Add to Cart</button>:<p><b>Added!</b></p>}</td>
                                                        <td><button onClick={()=>{remList(ind)}}>Remove</button></td>
                                                    </tr>
                    
                })}</table>:<p><b>No Items Added yet!</b></p>}

                {(cartList.length > 0)?<CartDetails cart={cartList} setCart={cartUpd}/>:<p><b>No Items Added to cart yet!</b></p>}

                
                    
                    
            </div>
           
            
        </>
    )
}
export default ItemInfo;