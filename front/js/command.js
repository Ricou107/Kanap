//Select input and Error message
const $commandForm = document.querySelector('.cart__order__form')

const $userFirstNameInput = document.getElementById('firstName')
const $userFirstNameErrorMsg = document.getElementById('firstNameErrorMsg')

const $userLastNameInput = document.getElementById('lastName')
const $userLastNameErrorMsg = document.getElementById('lastNameErrorMsg')

const $userAddressInput = document.getElementById('address')
const $userAddressErrorMsg = document.getElementById('addressErrorMsg')

const $userCityInput = document.getElementById('city')
const $userCityErrorMsg = document.getElementById('cityErrorMsg')

const $userEmailInput = document.getElementById('email')
const $userEmailErrorMsg = document.getElementById('emailErrorMsg')

//Check inputs of user
const checkUserFirstNameInput = () => {
    const isUserFirstNameValid = isNameValid($userFirstNameInput.value)

    if (isUserFirstNameValid) {
        $userFirstNameErrorMsg.textContent = ''
    } else {
        $userFirstNameErrorMsg.textContent = 'Veuillez ne pas rentrer de caracteres speciaux ou de chiffres'
    }

    return isUserFirstNameValid
}

const checkUserLastNameInput = () => {
    const isUserLastNameValid = isNameValid($userLastNameInput.value)

    if (isUserLastNameValid) {
        $userLastNameErrorMsg.textContent = ''
    } else {
        $userLastNameErrorMsg.textContent = 'Veuillez ne pas rentrer de caracteres speciaux ou de chiffres'
    }

    return isUserLastNameValid
}

const isNameValid = (value) => {
    return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value)
}


const checkUserAddressInput = () => {
    const isUserAddressValid = isAddressValid($userAddressInput.value)

    if (isUserAddressValid) {
        $userAddressErrorMsg.textContent = ''
    } else {
        $userAddressErrorMsg.textContent = 'Veuillez rentrer une adresse valide'
    }

    return isUserAddressValid
}

const isAddressValid = (value) => {
    return /^[#.0-9a-zA-Z\s,-]+$/.test(value)
}

const checkUserCityInput = () => {
    const isUserCityValid = isNameValid($userCityInput.value)

    if (isUserCityValid) {
        $userCityErrorMsg.textContent = ''
    } else {
        $userCityErrorMsg.textContent = 'Veuillez ne pas rentrer de caracteres speciaux ou de chiffres'
    }

    return isUserCityValid
}




//Check if all inputs are valid
const isFormValid = () => checkUserFirstNameInput() && checkUserLastNameInput() && checkUserAddressInput() && checkUserCityInput()

//Create Object contact
const createObjContact = () => {
    let contact = {
        firstName : $userFirstNameInput.value,
        lastName : $userLastNameInput.value,
        address : $userAddressInput.value,
        city : $userCityInput.value,
        email : $userEmailInput.value,
    }

    return contact
}

//Create Array of selected products
const createArrayProducts = () => {
    let productsBought = document.getElementsByTagName('article')
    let productsBoughtId = []
    
    for(let i = 0; i < JSON.parse(localStorage.cart).length ; i++) {
            if (!productsBoughtId.includes(productsBought[i].dataset.id)) {
                productsBoughtId.push(productsBought[i].dataset.id)
            }
    }

    return productsBoughtId
}    

$commandForm.addEventListener('submit', function(e) {
    e.preventDefault()

    if (isFormValid()) {

        console.log('Valide')
        let contact = createObjContact()
        let productsBoughtId = createArrayProducts()

        const main = async () => {
            const returnData = await send(contact,  productsBoughtId)
            const returnDataId = returnData.orderId

            window.location = `http://127.0.0.1:5500/front/html/confirmation.html?orderId=${returnDataId}`
        }

        main()
        

    } else {
        console.log('Non Valide')
    }
})



const send = async (contact, productsBoughtId) => {
    const res = await fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({contact, products : productsBoughtId}),
    })
    if (res.ok) {
        return res.json();  
      }
    }

  