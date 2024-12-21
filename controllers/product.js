const Product = require('../models/product');
const validateProduct = require('../validators/product');
const cloudinary = require('../utils/cloudinary');

const data = [
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
            "rate": 3.5,
            "count": 120
        },
        "stock": 100,
        "sku": "SKU001"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "Mens Casual Premium Slim Fit T-Shirts ",
        "price": 22.3,
        "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "rating": {
            "rate": 4.1,
            "count": 259
        },
        "stock": 150,
        "sku": "SKU002"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "Mens Cotton Jacket",
        "price": 55.99,
        "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        "rating": {
            "rate": 4.7,
            "count": 500
        },
        "stock": 200,
        "sku": "SKU003"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "Mens Casual Slim Fit",
        "price": 15.99,
        "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
        "rating": {
            "rate": 2.1,
            "count": 430
        },
        "stock": 80,
        "sku": "SKU004"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        "price": 695,
        "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
        "rating": {
            "rate": 4.6,
            "count": 400
        },
        "stock": 50,
        "sku": "SKU005"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "Solid Gold Petite Micropave ",
        "price": 168,
        "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
        "rating": {
            "rate": 3.9,
            "count": 70
        },
        "stock": 75,
        "sku": "SKU006"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "White Gold Plated Princess",
        "price": 9.99,
        "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
        "rating": {
            "rate": 3,
            "count": 400
        },
        "stock": 120,
        "sku": "SKU007"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "Pierced Owl Rose Gold Plated Stainless Steel Double",
        "price": 10.99,
        "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
        "rating": {
            "rate": 1.9,
            "count": 100
        },
        "stock": 200,
        "sku": "SKU008"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
        "price": 64,
        "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
        "rating": {
            "rate": 3.3,
            "count": 203
        },
        "stock": 150,
        "sku": "SKU009"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
        "price": 109,
        "description": "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
        "rating": {
            "rate": 2.9,
            "count": 470
        },
        "stock": 80,
        "sku": "SKU010"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
        "price": 109,
        "description": "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
        "rating": {
            "rate": 4.8,
            "count": 319
        },
        "stock": 90,
        "sku": "SKU011"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
        "price": 114,
        "description": "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
        "rating": {
            "rate": 4.8,
            "count": 400
        },
        "stock": 60,
        "sku": "SKU012"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
        "price": 599,
        "description": "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
        "rating": {
            "rate": 2.9,
            "count": 250
        },
        "stock": 70,
        "sku": "SKU013"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
        "price": 999.99,
        "description": "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
        "rating": {
            "rate": 2.2,
            "count": 140
        },
        "stock": 85,
        "sku": "SKU014"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
        "price": 56.99,
        "description": "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
        "rating": {
            "rate": 2.6,
            "count": 235
        },
        "stock": 90,
        "sku": "SKU015"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
        "price": 29.95,
        "description": "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
        "rating": {
            "rate": 2.9,
            "count": 340
        },
        "stock": 75,
        "sku": "SKU016"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
        "price": 39.99,
        "description": "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
        "rating": {
            "rate": 3.8,
            "count": 679
        },
        "stock": 65,
        "sku": "SKU017"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "MBJ Women's Solid Short Sleeve Boat Neck V ",
        "price": 9.85,
        "description": "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
        "rating": {
            "rate": 4.7,
            "count": 130
        },
        "stock": 90,
        "sku": "SKU018"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "Opna Women's Short Sleeve Moisture",
        "price": 7.95,
        "description": "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
        "rating": {
            "rate": 4.5,
            "count": 146
        },
        "stock": 85,
        "sku": "SKU019"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "DANVOUY Womens T Shirt Casual Cotton Short",
        "price": 12.99,
        "description": "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
        "rating": {
            "rate": 3.6,
            "count": 145
        },
        "stock": 70,
        "sku": "SKU020"
    },

    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "Hanerdun Women’s High Waist Yoga Pants",
        "price": 22.50,
        "description": "80% Nylon, 20% Spandex. Soft, stretchy fabric with moisture-wicking technology. Suitable for yoga, fitness, or casual wear.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/61M+xLmS6+L._AC_UX679_.jpg",
        "rating": {
            "rate": 4.3,
            "count": 215
        },
        "stock": 50,
        "sku": "SKU021"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "Lark & Ro Women’s Classic Faux Wrap Dress",
        "price": 39.99,
        "description": "95% Polyester, 5% Elastane. Stylish faux wrap dress with a flattering V-neck design. Perfect for office and casual wear.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/61zAIy0aepL._AC_UX679_.jpg",
        "rating": {
            "rate": 4.1,
            "count": 105
        },
        "stock": 25,
        "sku": "SKU022"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "PRETTYGARDEN Women’s Casual Long Sleeve Dress",
        "price": 29.95,
        "description": "100% Rayon. Flowy boho dress with long sleeves, suitable for casual or beach outings. Lightweight and breathable.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/61ztIrA6R4L._AC_UX679_.jpg",
        "rating": {
            "rate": 4.5,
            "count": 320
        },
        "stock": 40,
        "sku": "SKU023"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "BELONGSCI Women’s Casual Dress",
        "price": 25.99,
        "description": "100% Polyester. Simple, stylish mini dress with v-neck and ruffled sleeves. Perfect for summer or spring outings.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/51HsdX4ezhL._AC_UX679_.jpg",
        "rating": {
            "rate": 4.0,
            "count": 198
        },
        "stock": 75,
        "sku": "SKU024"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "MEROKEETY Women’s Long Sleeve Cable Knit Sweater",
        "price": 34.99,
        "description": "100% Acrylic. Cozy, soft cable knit sweater with button closure and front pockets. Perfect for fall and winter.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/61o4+u8Z+TL._AC_UX679_.jpg",
        "rating": {
            "rate": 4.6,
            "count": 98
        },
        "stock": 120,
        "sku": "SKU025"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "R.Vivimos Women’s Summer Wrap Maxi Dress",
        "price": 45.50,
        "description": "60% Cotton, 40% Polyester. Elegant wrap maxi dress with a floral print. Suitable for casual and formal occasions.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/71IGsflZ4GL._AC_UX679_.jpg",
        "rating": {
            "rate": 4.2,
            "count": 254
        },
        "stock": 65,
        "sku": "SKU026"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "GRECERELLE Women’s Casual Loose Maxi Dress",
        "price": 28.99,
        "description": "95% Rayon, 5% Spandex. Loose-fitting, comfortable maxi dress with side pockets. Perfect for summer outings.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/71kMUVpCkHL._AC_UX679_.jpg",
        "rating": {
            "rate": 4.1,
            "count": 184
        },
        "stock": 90,
        "sku": "SKU027"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "Dokotoo Women’s Open Front Chunky Knit Cardigan",
        "price": 32.99,
        "description": "100% Acrylic. Chunky knit cardigan with an open front and oversized fit. Great for layering in cold weather.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/71d4pA9RlKL._AC_UX679_.jpg",
        "rating": {
            "rate": 4.4,
            "count": 265
        },
        "stock": 35,
        "sku": "SKU028"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "R.Vivimos Women’s Bohemian Ruffle Mini Dress",
        "price": 35.99,
        "description": "100% Rayon. Flirty and fun mini dress with a bohemian ruffle design, perfect for summer beachwear.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/61++uMhOVsL._AC_UX679_.jpg",
        "rating": {
            "rate": 4.5,
            "count": 144
        },
        "stock": 70,
        "sku": "SKU029"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "ZESICA Women’s Casual Short Sleeve Maxi Dress",
        "price": 24.50,
        "description": "95% Rayon, 5% Spandex. Soft, breathable maxi dress with short sleeves, perfect for casual outings.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/71uC4AsbdnL._AC_UX679_.jpg",
        "rating": {
            "rate": 4.7,
            "count": 182
        },
        "stock": 60,
        "sku": "SKU030"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "Amazon Essentials Women’s Polar Fleece Vest",
        "price": 19.99,
        "description": "100% Polyester. A lightweight polar fleece vest perfect for layering during outdoor activities.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/71kDHhQ1RUL._AC_UX679_.jpg",
        "rating": {
            "rate": 4.0,
            "count": 125
        },
        "stock": 90,
        "sku": "SKU031"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "Ecupper Women’s Tunic Top Casual Long Sleeve",
        "price": 22.50,
        "description": "95% Rayon, 5% Spandex. Casual tunic top with long sleeves, perfect for layering in fall or winter.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/61yM3F0pERL._AC_UX679_.jpg",
        "rating": {
            "rate": 4.4,
            "count": 162
        },
        "stock": 85,
        "sku": "SKU032"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "Amoretu Women’s Tunic Top Long Sleeve Casual",
        "price": 16.99,
        "description": "100% Cotton. Soft, breathable tunic top with a loose fit, ideal for everyday casual wear.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/61l3IvS3V0L._AC_UX679_.jpg",
        "rating": {
            "rate": 4.0,
            "count": 140
        },
        "stock": 120,
        "sku": "SKU033"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "OUGES Women’s Summer Floral Short Sleeve Dress",
        "price": 27.99,
        "description": "100% Polyester. Lightweight summer dress with a floral print and short sleeves, perfect for casual wear.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/71RlqDcoffL._AC_UX679_.jpg",
        "rating": {
            "rate": 4.3,
            "count": 210
        },
        "stock": 75,
        "sku": "SKU034"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "Daily Ritual Women’s Jersey Short Sleeve T-Shirt Dress",
        "price": 18.50,
        "description": "58% Cotton, 39% Modal, 3% Spandex. Comfortable t-shirt dress made from soft jersey fabric, perfect for casual summer wear.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/71B5xDArsTL._AC_UX679_.jpg",
        "rating": {
            "rate": 4.2,
            "count": 155
        },
        "stock": 100,
        "sku": "SKU035"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "Amazon Essentials Women’s Classic-Fit Long-Sleeve T-Shirt",
        "price": 13.50,
        "description": "100% Cotton. Long-sleeve, classic-fit t-shirt with ribbed cuffs. Suitable for casual and everyday wear.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/71RZHpzJkAL._AC_UX679_.jpg",
        "rating": {
            "rate": 4.0,
            "count": 135
        },
        "stock": 150,
        "sku": "SKU036"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "ANRABESS Women’s Casual Loose Sundress",
        "price": 20.99,
        "description": "95% Rayon, 5% Spandex. Flowy, loose sundress with spaghetti straps, perfect for hot summer days.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/61ti0YDoMnL._AC_UX679_.jpg",
        "rating": {
            "rate": 4.1,
            "count": 185
        },
        "stock": 70,
        "sku": "SKU037"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "Dokotoo Women’s Casual Striped Maxi Dress",
        "price": 28.99,
        "description": "65% Cotton, 35% Polyester. Casual striped maxi dress with a relaxed fit, suitable for casual or beach outings.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/71d4qHlBkvL._AC_UX679_.jpg",
        "rating": {
            "rate": 4.3,
            "count": 145
        },
        "stock": 55,
        "sku": "SKU038"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "Adidas Women’s Essentials Linear Loose Tank Top",
        "price": 24.50,
        "description": "70% Cotton, 30% Polyester. Sleeveless loose tank top perfect for casual wear or light workouts.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/71DhW1AHL4L._AC_UX679_.jpg",
        "rating": {
            "rate": 4.5,
            "count": 125
        },
        "stock": 80,
        "sku": "SKU039"
    },
    {
        "supplierId": "66d8432ef71a1cf48e1827e2",
        "name": "Champion Women’s Jersey V-Neck Tee",
        "price": 15.50,
        "description": "100% Cotton. Classic v-neck tee with a relaxed fit. Suitable for casual wear or lounging.",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/71FrOiW7F4L._AC_UX679_.jpg",
        "rating": {
            "rate": 4.4,
            "count": 132
        },
        "stock": 95,
        "sku": "SKU040"
    }
]


// Create a new product
exports.createProduct = async (req, res) => {
    // const { error } = validateProduct(req.body);
    // if (error) return res.status(400).json({ message: error.details[0].message });

    // console.log(req.body.image)
    try {
        const result = await cloudinary.uploader.upload(req.body.image, {
            folder: 'your-folder-name',
        });




        // const newProduct = new Product(req.body);
        // const product = await newProduct.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const searchTerm = req.query.search || '';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const searchPattern = new RegExp(searchTerm, 'i');
        const skip = (page - 1) * limit;

        const products = await Product.find({
            $or: [
                { name: { $regex: searchPattern } },
                { description: { $regex: searchPattern } }
            ]
        }).skip(skip).limit(limit);

        const totalProducts = await Product.countDocuments({
            $or: [
                { name: { $regex: searchPattern } },
                { description: { $regex: searchPattern } }
            ]
        });

        res.json({
            products,
            pagination: {
                totalProducts,
                totalPages: Math.ceil(totalProducts / limit),
                currentPage: page,
                pageSize: limit
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

