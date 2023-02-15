const fruits = [
    {
      "index": 1,
      "isActive": true,
      "hasStock": true,
      "stock": 13,
      "price": 1.39,
      "picture": "https://img.freepik.com/vector-gratis/racimo-platano-amarillo-maduro-vector-aislado-sobre-fondo-blanco_1284-45456.jpg",
      "name": "Banana",
      "tags": [
        "Banana",
        "Yellow",
        "Fruit",
      ]
    },
    {
      "index": 2,
      "isActive": false,
      "hasStock": true,
      "stock": 17,
      "price": 1.20,
      "picture": "https://nicliquid.com/168-large_default/green-apple-flavor-concentrate.jpg",
      "name": "Green Apple",
      "tags": [
        "Apple",
        "Green",
        "Fruit",
      ]
    },
    {
      "index": 3,
      "isActive": true,
      "hasStock": false,
      "stock": 0,
      "price": 1.35,
      "picture": "https://fruityland.co/wp-content/uploads/2021/02/Red-Delicious-FL.jpg",
      "name": "Red Apple",
      "tags": [
        "Red",
        "Apple",
        "Fruit",
      ]
    },
    {
      "index": 4,
      "isActive": true,
      "hasStock": false,
      "stock": 0,
      "price": 1.29,
      "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Lemon.jpg/1024px-Lemon.jpg",
      "name": "Lemon",
      "tags": [
        "Yellow",
        "Lemon",
        "Fruit",
      ]
    },
    {
      "index": 5,
      "isActive": false,
      "hasStock": true,
      "stock": 9,
      "price": 1.89,
      "picture": "https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1024x768_scale,f_auto,q_auto:best/streams/2014/July/140707/1D274906288130-beauty-uses-strawberries.jpg",
      "name": "Strawberries",
      "tags": [
        "Berries",
        "Straw",
        "Fruit",
      ]
    },
    {
      "index": 6,
      "isActive": false,
      "hasStock": false,
      "stock": 0,
      "price": 1.46,
      "picture": "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Avocados-3d84a3a.jpg",
      "name": "Avocado",
      "tags": [
        "Avocado",
        "Green",
        "Fruit",
      ]
    },
    {
      "index": 7,
      "isActive": false,
      "hasStock": true,
      "stock": 20,
      "price": 1.34,
      "picture": "data:image/jpeg;base64,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",
      "name": "Coconut",
      "tags": [
        "Coco",
        "Coconut",
        "Fruit",
      ]
    },
    {
      "index": 8,
      "isActive": true,
      "hasStock": false,
      "stock": 0,
      "price": 1.80,
      "picture": "https://static.libertyprim.com/files/familles/figue-large.jpg?1569271764",
      "name": "Fig",
      "tags": [
        "Fig",
        "Purple",
        "Fruit",
      ]
    },
    {
      "index": 9,
      "isActive": false,
      "hasStock": true,
      "stock": 10,
      "price": 1.83,
      "picture": "https://www.gardeningknowhow.com/wp-content/uploads/2021/05/whole-and-slices-watermelon.jpg",
      "name": "Watermelon",
      "tags": [
        "Water",
        "Melon",
        "Fruit",
      ]
    },
    {
      "index": 10,
      "isActive": false,
      "hasStock": false,
      "stock": 0,
      "price": 1.47,
      "picture": "https://www.collinsdictionary.com/images/full/orange_342874121.jpg",
      "name": "Orange",
      "tags": [
        "Orange",
        "Fruit",
      ]
    },
    {
      "index": 11,
      "isActive": true,
      "hasStock": true,
      "stock": 8,
      "price": 1.93,
      "picture": "https://www.gastronomiavasca.net/uploads/image/file/5587/kiwi1.jpg",
      "name": "Kiwi",
      "tags": [
        "Kiwi",
        "Green",
        "Fruit",
      ]
    },
    {
      "index": 12,
      "isActive": false,
      "hasStock": false,
      "stock": 0,
      "price": 1.37,
      "picture": "https://www.collinsdictionary.com/images/full/grape_229112122.jpg",
      "name": "Grapes",
      "tags": [
        "Grapes",
        "Red",
        "Fruit",
      ]
    },
    {
      "index": 13,
      "isActive": false,
      "hasStock": false,
      "stock": 0,
      "price": 1.77,
      "picture": "https://media.istockphoto.com/id/1273810254/es/foto/decopon-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=QkqiFqSJbuPTZ7As8k7jAN-WNSM340VMWSqVvSyBKzA=",
      "name": "Mandarin",
      "tags": [
        "Mandarin",
        "Orange",
        "Fruit",
      ]
    }
  ];