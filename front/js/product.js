//API call to get product
const retrieveKanapItems= (id) => fetch(`http://localhost:3000/api/products/${id}`)
    .then(res => res.json())
    .catch(err => console.log("Error retrieving kanap data", err))


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
    var str = window.location.href;
    var url = new URL(str);
    id = url.searchParams.get("id");

    const kanapData = await retrieveKanapItems(id)

    if (Object.keys(kanapData).length == 0) {
        alert('L\'objet que vous recherchez n\'existe pas !');
        window.location = `http://127.0.0.1:5500/front/html/index.html`
        return
    }

    addInfos(kanapData)

}

main()





