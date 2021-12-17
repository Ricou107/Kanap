//API call to get products
const retrieveKanapItems= () => fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .catch(err => console.log("Error retrieving kanap data", err))

//Function check the id in url and find which product it corresponds
const getProductPosition = kanapData => {
    var str = window.location.href;
    var url = new URL(str);
    id = url.searchParams.get("id");

    let i = 0
    while (kanapData[i]._id != id) {
        i++
    }
    return kanapData[i]
}

//Add product infos
const addInfos = product => {
    //Add image
    const $kanapImgDiv = document.getElementsByClassName('item__img')[0]
    const $kanapImg = document.createElement('img')
    $kanapImg.setAttribute('src', `${product.imageUrl}`)
    $kanapImg.setAttribute('alt', `${product.altTxt}`)
    $kanapImgDiv.appendChild($kanapImg)

    //Add Name, price, description
    document.getElementById('title').textContent = product.name
    document.getElementById('description').textContent = product.description 
    document.getElementById('price').textContent = product.price

    //Add Colors
    const $colors = document.getElementById('colors')
    for (color of product.colors) {
        const $kanapColor = document.createElement('option')
        $kanapColor.setAttribute('value', color)
        $kanapColor.textContent = color
        $colors.appendChild($kanapColor)
}
}

const main = async () => {
    const kanapData = await retrieveKanapItems()

    product = getProductPosition(kanapData)

    addInfos(product)

}

main()





