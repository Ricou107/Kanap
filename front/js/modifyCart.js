//Event Listener to modify quantity
document.getElementById('cart__items').addEventListener('change', function(event) {
    console.log(event.target)


    let id =  event.target.closest('article').dataset.id
    let color =  event.target.closest('article').dataset.color

    //We send the new value to Loval Storage
    let Cart = JSON.parse(localStorage.cart) 

    for (let i = 0; i < Cart.length; i++){
        if (id == Cart[i][0] && color == Cart[i][1]) {
            Cart[i][2] = event.target.value
        }
    }

    localStorage.cart = JSON.stringify(Cart)

    //We compute newprice
    newTotalPrice()
})



//Function to delete Item on cart
setTimeout(function() {
    let del = document.getElementsByClassName('deleteItem');

    for(let i = 0; i < JSON.parse(localStorage.cart).length ; i++) {
        del[i].addEventListener("click", function(event) {
            event.preventDefault()
            console.log("Clicked index: " + i);

            //We get the id and color of modified product
            let id =  event.target.closest('article').dataset.id
            let color =  event.target.closest('article').dataset.color

            console.log(id, color)
            
            //We get local storage
            let Cart = JSON.parse(localStorage.cart) 
            console.log(Cart)

            //We look for the product and delete it from local storage
            for (let i = 0; i < Cart.length; i++) {
                console.log(Cart[i])
                if (Cart[i][0] == id && Cart[i][1] == color) {
                    console.log('bingo')
                    Cart.splice(i, 1)
                    console.log(Cart)
                }
            }

            //We send back the updated lcoal storage
            localStorage.cart = JSON.stringify(Cart)

            //We delete the article from the cart (front)
            document.getElementById('cart__items').removeChild(event.target.closest('article'))

            //We compute newprice
            newTotalPrice()
        })

      }
    }, 
    1000);

    


//Function that compute new Total Price each time the cart change    
    const newTotalPrice = async () => {
        let quantity = document.getElementsByClassName('itemQuantity')
        let price = document.querySelectorAll('p ~ p')
        
    
        let totalPrice = 0
    
        for(let i = 0; i < JSON.parse(localStorage.cart).length ; i++) {
            totalPrice += quantity[i].value * price[i].textContent.slice(0, -2)
        }
        
    /*  This was antoher solution. It was working fine, but called the API at each modification. 
        let price = 0
        for(let i = 0; i < JSON.parse(localStorage.cart).length ; i++) {
            let id =  quantity[i].closest('article').dataset.id
            console.log(quantity[i].value, id)
    
            for (let j = 0; j < kanapData.length; j++) {
                if (kanapData[j]._id == id) {
                    console.log(quantity[i].value, id, kanapData[j].price)
                    price += quantity[i].value * kanapData[j].price
                }
            }
    
            
        }
    */
        document.getElementById('totalPrice').textContent = totalPrice
    }
    