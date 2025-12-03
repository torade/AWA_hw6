import {Request, Response, Router} from "express"
import { compile } from "morgan"
import {Offer, IOffer} from "../models/Offer"
import {Image, IImage} from "../models/Image"
import upload from "../middleware/multer-config"

const router: Router = Router()

router.get("/", (req, res) => {
    res.sendFile("test.html", {root: "./public"})
    
})

// router.get("/api/images",async (req: Request, res: Response) => {
//     try {
//         const images: IImage[] | null = await Image.find()

//         if(!images) {
//             return res.status(404).json({message: 'No images found'})
//         }

//         res.status(200).json(images)
//         console.log('Images fetched successfully from database')
//     } catch (error: any) {
//         console.error(`Error while fetching a file: ${error}`)
//         return res.status(500).json({message: 'Internal server error'})
//     }

// })

// router.get("/api/images/:id", async (req: Request, res: Response) => {
//     try {
//         const image: IImage | null = await Image.findById(req.params.id)
        
//         if(!image) {
//             return res.status(404).json({message: 'Image not found'})
//         }
//         res.status(200).json(image)
//         console.log('Image fetched successfully from database')

//     } catch (error: any) {
//         console.error(`Error while fetching a file: ${error}`)
//         return res.status(500).json({message: 'Internal server error'})
//     }

   
// })

router.post("/upload", upload.single("image"), async (req: Request, res: Response) => {
    try {
        let imageId: string | undefined = undefined;
        if (req.file) {
            const newImage = new Image({
                filename: req.file.filename,
                path: `public/images/${req.file.filename}` 
            });
            const savedImage = await newImage.save();
            imageId = savedImage._id.toString();
        }
        const offer: IOffer = new Offer({
            description: req.body.description,
            price: req.body.price,
            title: req.body.title,
            imageId: imageId
        })
        await offer.save()
        console.log("Offer saved successfully")
        return res.status(201).json({message: "Offer saved successfully"})
    } catch(error: any) {
        console.error(`Error while uploading file: ${error}`)
        return res.status(500).json({message: 'Internal server error'})
    }
 
    
})

// router.patch("/api/images/:id", async (req: Request, res: Response) => {
//     try {
//         const image: IImage | null = await Image.findById(req.params.id)
        
//         if(!image) {
//             return res.status(404).json({message: 'Image not found'})
//         }

//         image.description = req.body.description
//         await image.save()

//         res.status(200).json({message: "Image updated"})
//         console.log('Image updated')

//     } catch (error: any) {
//         console.error(`Error while updating a file: ${error}`)
//         return res.status(500).json({message: 'Internal server error'})
//     }

   
// })




export default router