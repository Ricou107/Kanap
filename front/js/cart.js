//Where the product cards will be
const $items = document.getElementById('cart__items')

//API call to get products
const retrieveKanapItems= () => fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .catch(err => console.log("Error retrieving kanap data", err))


//Create the card for each item
const createCartItem = (kanap, myCart) => {

    //Create Article
    const $cartItemArticle = document.createElement('article')
    $cartItemArticle.classList.add('cart__item')
    $cartItemArticle.setAttribute('data-id', `${kanap._id}`)
    $cartItemArticle.setAttribute('data-color', `${myCart[1]}`)

        const $cartItemDivImg = document.createElement('div')
        $cartItemDivImg.classList.add('cart__item__img')

            const $cartItemImg = document.createElement('img')
            $cartItemImg.setAttribute('src', `${kanap.imageUrl}`)
            $cartItemImg.setAttribute('alt', `${kanap.altTxt}`)

        const $cartItemDivContent = document.createElement('div')
        $cartItemDivContent.classList.add('cart__item__content')

            const $cartItemDivContentDescription = document.createElement('div')
            $cartItemDivContentDescription.classList.add('cart__item__content__description')            

                const $cartItemDivContentDescriptionH2 = document.createElement('h2')
                $cartItemDivContentDescriptionH2.innerText = kanap.name
                const $cartItemDivContentDescriptionP1 = document.createElement('p')
                $cartItemDivContentDescriptionP1.innerText = myCart[1]
                const $cartItemDivContentDescriptionP2 = document.createElement('p')
                $cartItemDivContentDescriptionP2.innerText = kanap.price + ' €'

            const $cartItemDivContentSettings = document.createElement('div')
            $cartItemDivContentSettings.classList.add('cart__item__content__settings')
            
                const $cartItemDivContentSettingsQuantity = document.createElement('div')
                $cartItemDivContentSettingsQuantity.classList.add('cart__item__content__settings__quantity')

                    const $cartItemDivContentSettingsQuantityP = document.createElement('p')
                    $cartItemDivContentSettingsQuantityP.textContent = 'Qté : '

                    const $cartItemDivContentSettingsQuantityInput = document.createElement('input')
                    $cartItemDivContentSettingsQuantityInput.classList.add('itemQuantity')
                    $cartItemDivContentSettingsQuantityInput.setAttribute('type', 'number')
                    $cartItemDivContentSettingsQuantityInput.setAttribute('name', 'itemQuantity')
                    $cartItemDivContentSettingsQuantityInput.setAttribute('min', '1')
                    $cartItemDivContentSettingsQuantityInput.setAttribute('max', '100')
                    $cartItemDivContentSettingsQuantityInput.setAttribute('value', myCart[2])

                const $cartItemDivContentSettingsDelete = document.createElement('div')
                $cartItemDivContentSettingsDelete.classList.add('cart__item__content__settings__delete')

                    const $cartItemDivContentSettingsDeleteP = document.createElement('p')
                    $cartItemDivContentSettingsDeleteP.classList.add('deleteItem')
                    $cartItemDivContentSettingsDeleteP.textContent = 'Supprimer'




    $cartItemArticle.appendChild($cartItemDivImg)
        $cartItemDivImg.appendChild($cartItemImg)
    $cartItemArticle.appendChild($cartItemDivContent)
        $cartItemDivContent.appendChild($cartItemDivContentDescription)
            $cartItemDivContentDescription.appendChild($cartItemDivContentDescriptionH2)
            $cartItemDivContentDescription.appendChild($cartItemDivContentDescriptionP1)
            $cartItemDivContentDescription.appendChild($cartItemDivContentDescriptionP2)
        $cartItemDivContent.appendChild($cartItemDivContentSettings)
            $cartItemDivContentSettings.appendChild($cartItemDivContentSettingsQuantity)
                $cartItemDivContentSettingsQuantity.appendChild($cartItemDivContentSettingsQuantityP)
                $cartItemDivContentSettingsQuantity.appendChild($cartItemDivContentSettingsQuantityInput)
            $cartItemDivContentSettings.appendChild($cartItemDivContentSettingsDelete)
                $cartItemDivContentSettingsDelete.appendChild($cartItemDivContentSettingsDeleteP)

    return $cartItemArticle
}

//Function with loop that create each cart item and compute total price
const main = async () => {
    const kanapData = await retrieveKanapItems()
    const cartData = JSON.parse(localStorage.cart) 

    let totalPrice = 0
    for (let i = 0; i < kanapData.length; i++) {
        for (let j = 0; j < cartData.length; j++) {
            if (kanapData[i]._id == cartData[j][0]) {
                $items.appendChild(createCartItem(kanapData[i], cartData[j]))
                totalPrice += kanapData[i].price * cartData[j][2]
            }
        }    
    }

    document.getElementById('totalPrice').textContent = totalPrice
}

main()


