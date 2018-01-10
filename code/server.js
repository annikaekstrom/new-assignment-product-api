import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

// Express setup, including JSON body parsing.
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Tells express to add the "Access-Control-Allow-Origin" header to allow requests from anywhere.
app.use(cors())

// Connect to MongoDB, on the "products-api" database. If the db doesn't exist, mongo will create it.
mongoose.connect("mongodb://localhost/products-api", { useMongoClient: true })

// This makes mongo use ES6 promises, instead of its own implementation
mongoose.Promise = Promise

// Log when mongo connects, or encounters errors when trying to connect.
mongoose.connection.on("error", err => console.error("Connection error:", err))
mongoose.connection.once("open", () => console.log("Connected to mongodb"))

// This is the beginning of a model for the Product object.
const Product = mongoose.model("Product", {
  name: String,
  id: Number,
  type: String,
  size: String,
  numberinPack: Number,
  substance: String,
  price: Number,
  deliveryTime: String,
  image: String,
  description: String
  // Add more attributes to your product here.
})

app.get("/", (req, res) => {
  res.send("Products API")
})

// Endpoint to create a product. Send a POST to /products with a JSON body
// with the keys and values you want to persist in the database.
app.post("/products", (req, res) => {
  const product = new Product(req.body)

  product.save()
    .then(() => { res.status(201).send("Product created") })
    .catch(err => { res.status(400).send(err) })
})

// Add more endpoints here!
app.get("/products", (req,res) => {
  Product.find().then(allProducts => {
    res.json(allProducts)
  })
})

app.listen(8080, () => console.log("Products API listening on port 8080!"))




const products = {
	"products": [{
			"id": 1,
			"name": "Alvedon",
			"type": "Filmdragerad tablett",
			"size": "500 mg",
			"numberInPack": "20",
			"substance": "Paracetamol",
			"price": 26,
			"deliveryTime": "1-2 vardagar",
			"image": "https://www.apoteket.se/produktbilder/Validoo/097610s.jpg",
			"description": "Skonsamt mot magen om man behöver ta värkmedicin ofta. Lindrar smärta och sänker feber. Effekten på värk kommer inom 30 minuter och på feber efter ½ - 1 timme. Från 3 år."
		},
		{
			"id": 2,
			"name": "Ipren",
			"type": "Filmdragerad tablett",
			"size": "400 mg",
			"numberInPack": "30",
			"substance": "Ibuprofen",
			"price": 39,
			"deliveryTime": "1-3 vardagar",
			"image": "https://www.apoteket.se/produktbilder/Validoo/088534s.jpg",
			"description": "Lindrar smärta, dämpar inflammation och sänker feber. Effekten kommer inom 30 min, varar i ca 6 tim. Från 12 år."
		},
		{
			"id": 3,
			"name": "Paracetamol Apofri",
			"type": "Filmdragerad tablett",
			"size": "500 mg",
			"numberInPack": "20",
			"substance": "Ibuprofen",
			"price": 23,
			"deliveryTime": "1-3 vardagar",
			"image": "https://www.apoteket.se/produktbilder/custom/179396s.jpg",
			"description": "Skonsam mot magen. Samma substans som t ex Alvedon.Mot smärta & feber. Effekt på värk inom 30 min & feber efter 30-60 min. Effekten varar i 4-5 tim. Från 3 år."
		},
		{
			"id": 4,
			"name": "Minoxidil Orifarm Forte",
			"type": "Kutan lösning",
			"size": "50 mg/ml",
			"numberInPack": "10",
			"substance": "Lösning för hårtillväxt",
			"price": 459,
			"deliveryTime": "1-3 vardagar",
			"image": "https://www.apoteket.se/produktbilder/Validoo/179719s.jpg",
			"description": "Endast för män. Stimulerar hårväxt vid tidiga former av håravfall. Används under minst 2 mån. för märkbar effekt. 60 ml räcker ca 1 mån."
		},
		{
			"id": 5,
			"name": "Treo",
			"type": "Brustablett",
			"size": "500 mg/50 mg",
			"numberInPack": "60",
			"substance": "Acetylsalicylsyra + koffein",
			"price": 109,
			"deliveryTime": "1-3 vardagar",
			"image": "https://www.apoteket.se/produktbilder/Validoo/146194s.jpg",
			"description": "Vid huvudvärk av migräntyp är brustablett ett bra val liksom tillägg av koffein. Lindrar smärta, dämpar inflammation, sänker feber. Effekt inom 30 min, varar i 4-6 tim. Värk från 14 år. Feber från 18 år."
		},
		{
			"id": 6,
			"name": "Apoliva Deodorant",
			"type": "Deodorant",
			"size": "60 ml",
			"numberInPack": "1",
			"substance": "Antiperspirant. ",
			"price": 24,
			"deliveryTime": "1-5 vardagar",
			"image": "https://www.apoteket.se/produktbilder/custom/207428s.jpg",
			"description": "Denna deodorant är en effektiv antiperspirant.Lätt att applicera, och ger huden en ljuvlig doft av sommaräng och vit mysk."
		},
		{
			"id": 7,
			"name": "Intim Tvål",
			"type": "Flytande tvål",
			"size": "200 ml",
			"numberInPack": "1",
			"substance": "Oparfymerad",
			"price": 35,
			"deliveryTime": "5 vardagar",
			"image": "https://www.apoteket.se/produktbilder/Validoo/207072s.jpg",
			"description": "En mild tvål med pH-värdet anpassat för underlivets yttre delar. Speciellt framtagen för skonsam intimtvätt. Torkar inte ut huden."
		},
		{
			"id": 8,
			"name": "Otrivin",
			"type": "Nässpray",
			"size": "100 ml",
			"numberInPack": "1",
			"substance": "Läkemedel",
			"price": 35,
			"deliveryTime": "5 vardagar",
			"image": "https://www.apoteket.se/produktbilder/Validoo/180539s.jpg",
			"description": "Ger en avsvällande effekt vilket minskar nästäppan och gör det lättare att andas. Effekt inom några minuter. Från 12 år."
		},

		{
			"id": 9,
			"name": "Apoteket Saffran",
			"type": "Krydda",
			"size": "0,5 g",
			"numberInPack": "1",
			"substance": "saffran",
			"price": 35,
			"deliveryTime": "1-3 vardagar",
			"image": "https://www.apoteket.se/produktbilder/custom/823667s.jpg",
			"description": "Saffran för matlagning och bakning."
		},
		{
			"id": 10,
			"name": "Voltaren",
			"type": "Dragerad tablett",
			"size": "25 mg",
			"numberInPack": "20",
			"substance": "Diklofenak",
			"price": 35,
			"deliveryTime": "1-3 vardagar",
			"image": "https://www.apoteket.se/produktbilder/Validoo/056106s.jpg",
			"description": "Lindrar smärta, dämpar inflammation och sänker feber. Effekten kommer inom 30 minuter och varar i 4-6 timmar.Från 18 år."
		},
		{
			"id": 11,
			"name": "Intim Creme",
			"type": "Mjukgörande kräm",
			"size": "50 ml",
			"numberInPack": "1",
			"substance": "Oparfymerad",
			"price": 57,
			"deliveryTime": "1-3 vardagar",
			"image": "https://www.apoteket.se/produktbilder/Validoo/207075s.jpg",
			"description": "Mild och återfuktande kräm. Innehåller naturlig oliv- och rapsolja, samt återfuktande glycerin och mjölksyra."
		},
		{
			"id": 12,
			"name": "Nezeril",
			"type": "Nässpray",
			"size": "0,5 mg/ml",
			"numberInPack": "1",
			"substance": "Läkemedel",
			"price": 27,
			"deliveryTime": "1-3 vardagar",
			"image": "https://www.apoteket.se/produktbilder/Validoo/543744s.jpg",
			"description": "Ska inte användas längre än 10 dagar i följd. Fri från konserveringsmedel.Ger en avsvällande effekt vilket minskar nästäppan och gör det lättare att andas. Från 10 år. Effekt inom några minuter."
		}

	]
}

// products.products.forEach((data) => {
//   const product = new Product(data)
//
//   product.save()
// })
