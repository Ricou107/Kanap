//Add product to Cart
document.getElementById('addToCart').addEventListener('click', function(e) {
    e.preventDefault()

    //Variables to add
    const $selectedColor = document.getElementById('colors').value
    const $selectedQuantity = document.getElementById('quantity').value

    //If the cart is empty, add first product
    if ( localStorage.length == 0) {
        let Cart = [[id, 
            $selectedColor, 
            $selectedQuantity]]

        localStorage.cart = JSON.stringify(Cart);

    //If Cart has already a product, check if it has the same as the user want
    } else {

        let Cart = JSON.parse(localStorage.cart) 
        
        //Check if the product is Already in the cart and if so, add the new quantity
        let productAlreadyInCart = false
        let i = 0
        while (productAlreadyInCart == false && i < Cart.length)  {     
 
            if (Cart[i][0] == id && Cart[i][1] == $selectedColor) {
                productAlreadyInCart = true
                Cart[i][2] = parseInt(Cart[i][2], 10) + parseInt($selectedQuantity, 10)
            }
            i++
        }

        //If it's a different product, adda new line on the cart
        if (productAlreadyInCart == false) {
            Cart.push(
                [id, 
                    $selectedColor, 
                    $selectedQuantity]
            )
        }

        localStorage.cart = JSON.stringify(Cart);
    }
      
})
