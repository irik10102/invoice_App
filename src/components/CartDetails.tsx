


interface Prop{
    cart:{
         name:string,
        price:number,
        category:string,
        qty:number,
        added:boolean
    }[],

    setCart:(ind:number)=>void;
}



export var removedItemsCart:number;

const CartDetails = (props:Prop)=>{
    
    var {cart, setCart} = props;


    return(
        <>
            <table>
                <tr>
                    <th>Item-Name</th>
                    <th>Category</th>
                    <th>Total-Price</th>
                </tr>
                {cart.map((val,ind)=>{
                        const {name, price,category, qty} = val;
                        return  (
                                        <tr>
                                            <td>{name}</td>
                                            <td>{category}</td>
                                            <td>{qty*price}/-</td>
                                            <td><button onClick={()=>{setCart(ind)}}>Remove</button></td>
                                        </tr>
                                        
                                )
                })}
                <tr><td><p><b>Grand Total:</b>{cart.reduce((acc,val)=>{
                    acc = acc + (val.price*val.qty);
                    return acc;
                },0)}</p></td></tr>
            </table>
        </>
    )
}

export default CartDetails;