import {Request, Response, Router} from "express"
import { compile } from "morgan"
import {Offer, IOffer} from "../models/Offer"
import {Image, IImage} from "../models/Image"
import upload from "../middleware/multer-config"

const router: Router = Router()

router.get("/", (req, res) => {
    res.sendFile("test.html", {root: "./public"})
    
})

router.get("/offers", async(req, res) => {
    try {
        let list: any[] = [];
        const offers: IOffer[] | null = await Offer.find();
        if(!offers) {
            return res.status(404).json({message: "No offers found"})
        }
        for (let offer of offers) {
            let imgPath = null;
            if (offer.imageId) {
                const img: IImage | null = await Image.findById(offer.imageId);
                if (img) {
                    imgPath = img.path.replace("public/",""); //to make path work with static folder
                }
            }
            list.push({
                title: offer.title,
                description: offer.description,
                price: offer.price,
                imagePath: imgPath
            })
        }

        res.status(200).json(list)
        console.log("Offers fetched successfully from database")
    } catch (error: any) {
        console.error(`Error while fetching offers: ${error}`)
        return res.status(500).json({message: "Internal server error"})
    }
})
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

export default router