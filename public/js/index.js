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
    
    } catch (error) {
        console.log("Error: ", error)
    } 
    // finally {
    //     fetchImageData()
    // }
})

// document.getElementById("uploadForm").addEventListener("submit", async function(event) {
//     event.preventDefault()
//     const formData = new FormData(this)
//     formData.append("description", document.getElementById("desc").value)

//     try {
//         const response = await fetch("/api/upload", {
//             method: "POST",
//             body: formData
//         })
//         if (!response.ok) {
//             throw new Error("Upload failed")
//         }
//         const responseData = await response.json()
//     } catch(error) {
//         console.log("Error: ", error)
//     } finally {
//         fetchImageData()
//     }
// })

// const fetchImageData = async() => {
//     try {
//         const response = await fetch("/api/images")
//         if(!response.ok) {
//             throw new Error("Failed to fetch images")
//         }
//         const imageData = await response.json()
//         displayImages(imageData)

//     } catch(error) {
//         console.error("Error", error)
//     }
// }

// const displayImages = (imageData) => {
//     const imageGrid = document.getElementById("imageGrid")
//     for(let i=0; i < imageData.length; i++) {
//         const imageItem = document.createElement("div")
//         imageItem.classList.add("imageItem")

//         const img = document.createElement("img")
//         img.src = `http://localhost:8000/${imageData[i].path}`

//         const description = document.createElement("p")
//         description.textContent = imageData[i].description

//         imageItem.appendChild(img)
//         imageItem.appendChild(description)
//         imageGrid.appendChild(imageItem)
//     }
// }

// fetchImageData()