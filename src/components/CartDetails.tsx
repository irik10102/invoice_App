


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

    const rem = (i:number)=>{
        setCart(i);
    }

    return(
        <>
            <table>
                <tr>
                    <th>Item-Name</th>
                    <th>Category</th>
                    <th>Total-Price</th>
                </tr>
                {cart.map((val,ind)=>{
                    if(val.added){
                        const {name, price,category, qty} = val;
                        return  <tr>
                                    <td>{name}</td>
                                    <td>{category}</td>
                                    <td>{qty*price}/-</td>
                                    <td><button onClick={()=>{rem(ind)}}>Remove</button></td>
                                </tr>
                    }
                })}
            </table>
        </>
    )
}

export default CartDetails;