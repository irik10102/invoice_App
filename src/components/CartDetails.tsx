interface Prop{
    cart:{
         name:string,
        price:number,
        category:string,
        qty:number,
        added:boolean
    }[];
}

const CartDetails = (props:Prop)=>{
    
    const {cart} = props;

    return(
        <>
            <table>
                <tr>
                    <th>Item Name</th>
                    <th>Category</th>
                    <th>Total Price</th>
                </tr>
                {cart.map((val)=>{
                    const {name, price,category, qty} = val;
                    return  <tr>
                                <td>{name}</td>
                                <td>{category}</td>
                                <td>{qty*price}/-</td>
                            </tr>
                })}
            </table>
        </>
    )
}

export default CartDetails;