//Function check the id in url and find which product it corresponds
const getOrderId = () => {
    var str = window.location.href;
    var url = new URL(str);
    orderId = url.searchParams.get("orderId");

    return orderId
}

const main = () => {
    const orderId = getOrderId()

    document.getElementById('orderId').textContent = orderId
}

main()
