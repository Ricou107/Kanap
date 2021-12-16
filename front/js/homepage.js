//Where the product cards will be
const $items = document.getElementById('items')

//API call to get products
const retrieveKanapItems= () => fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .catch(err => console.log("Error retrieving kanap data", err))


//Create the card for each item
const createKanapCard = kanap => {
    const $kanapCard = document.createElement('a')
    $kanapCard.setAttribute('href', `./product.html?id=${kanap._id}`)

    const $kanapCardArticle = document.createElement('article')
    $kanapCard.appendChild($kanapCardArticle)

    const $kanapCardImg = document.createElement('img')
    $kanapCardImg.setAttribute('src', `${kanap.imageUrl}`)
    $kanapCardImg.setAttribute('alt', `${kanap.altTxt}`)

    const $kanapCardName = document.createElement('h3')
    $kanapCardName.classList.add('productName')
    $kanapCardName.innerText = kanap.name

    const $kanapCardDescription = document.createElement('p')
    $kanapCardDescription.classList.add('productName')
    $kanapCardDescription.innerText = kanap.description

    $kanapCardArticle.appendChild($kanapCardName)
    $kanapCardArticle.appendChild($kanapCardImg)
    $kanapCardArticle.appendChild($kanapCardDescription)
    
    return $kanapCard
}

//Function with loop that create each card
const main = async () => {
    const kanapData = await retrieveKanapItems()

    for (let i = 0; i < kanapData.length; i++) {
        if (kanapData[i]) {
            $items.appendChild(createKanapCard(kanapData[i]))
        }
    }
}

main()
