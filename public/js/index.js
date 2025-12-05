document.getElementById("offerForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    formData.append("title", document.getElementById("title").value);
    formData.append("price", document.getElementById("price").value);
    formData.append("description", document.getElementById("description").value);

    try {
    const response = await fetch("/upload", {
        method: "POST",
        body: formData
    })
    if (!response.ok) throw new Error("Upload failed")
    const responseData = await response.json()
    await fetchOfferData();
    } catch (error) {
        console.log("Error: ", error)
    } 
})

//getting and displaying the offers:
const fetchOfferData = async() => {
    try {
        const response = await fetch("/offers", {
            method: "GET"
        })
        if (!response.ok) throw new Error("Failed to fetch offers")
        const offersData = await response.json()
        displayOffers(offersData)
    } catch (error) {
        console.error("Error", error)
    }
}

const displayOffers = (offersData) => {
    let container = document.getElementById("offersContainer");
    container.innerHTML = "";
    for (let i = 0; i < offersData.length; i++) {
        // Main column div
        let childdiv = document.createElement("div");
        childdiv.className = "offerDiv col s12 m6 l4";

        // Card div
        let cardDiv = document.createElement("div");
        cardDiv.className = "card hoverable";

        // Card image section
        if (offersData[i].imagePath) {
            let cardImageDiv = document.createElement("div");
            cardImageDiv.className = "card-image";
            let img = document.createElement("img");
            img.src = `http://localhost:3000/${offersData[i].imagePath}`;
            img.className = "responsive-img";
            cardImageDiv.appendChild(img);

            // Title as span inside card-image
            let titleSpan = document.createElement("span");
            titleSpan.className = "card-title";
            titleSpan.innerText = offersData[i].title;
            cardImageDiv.appendChild(titleSpan);

            cardDiv.appendChild(cardImageDiv);
        } else {
            // If no image, still show title in card-content
            let cardContentDiv = document.createElement("div");
            cardContentDiv.className = "card-content";
            let titleSpan = document.createElement("span");
            titleSpan.className = "card-title";
            titleSpan.innerText = offersData[i].title;
            cardContentDiv.appendChild(titleSpan);
            cardDiv.appendChild(cardContentDiv);
        }

        // Card content section (description and price)
        let cardContentDiv = document.createElement("div");
        cardContentDiv.className = "card-content";

        let description = document.createElement("p");
        description.innerText = offersData[i].description;
        cardContentDiv.appendChild(description);

        let price = document.createElement("p");
        price.innerText = `$${offersData[i].price}`;
        cardContentDiv.appendChild(price);

        cardDiv.appendChild(cardContentDiv);

        // Append card to column
        childdiv.appendChild(cardDiv);

        // Append column to container
        container.appendChild(childdiv);
    }
}

fetchOfferData()