'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const products = [
      {
        name: 'Wireless Headphones',
        description: 'High-quality noise-canceling over-ear headphones with 20-hour battery life.',
        price: 99.99,
        stock_quantity: 50,
        image_url: 'https://i0.wp.com/bestdealsnepal.com.np/wp-content/uploads/2025/01/honeywell-u10-headphone.jpg?resize=300%2C300&ssl=1',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Smartphone',
        description: 'Latest model with 128GB storage, 6.5-inch display, and triple camera system.',
        price: 699.99,
        stock_quantity: 30,
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbmAsKdJSwepzKO8OSOU3gm5BL7MydOohsLQ&s',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Laptop',
        description: '13-inch ultrabook with 16GB RAM and 512GB SSD for professional use.',
        price: 1299.99,
        stock_quantity: 20,
        image_url: 'https://mudita.com.np/media/catalog/product/cache/278abbc8911ee5bd8d9d36ef904a805f/h/p/hp-notebook-14s-price-in-nepal.webp',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Coffee Maker',
        description: 'Automatic drip coffee maker with programmable settings and 12-cup capacity.',
        price: 49.99,
        stock_quantity: 75,
        image_url: 'https://syakarphilipsnepal.thulo.com.np/assets/tenant/uploads/media-uploader/syakarphilipsnepal/20240630114837_1730801707.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Fitness Tracker',
        description: 'Water-resistant fitness tracker with heart rate monitor and sleep tracking.',
        price: 79.99,
        stock_quantity: 60,
        image_url: 'https://i5.walmartimages.com/seo/Fitbit-Inspire-2-Fitness-Tracker-Black_96b0eb36-17a8-4fde-a725-ff7cf9f5e675.43dfffa5bd5240f137e9c2f289ab339d.jpeg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Bluetooth Speaker',
        description: 'Portable speaker with 360-degree sound and 10-hour battery life.',
        price: 59.99,
        stock_quantity: 45,
        image_url: 'https://cdn.gadgetbytenepal.com/wp-content/uploads/2023/11/Mi-Portable-Bluetooth-Speaker-Mini-Black.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Gaming Console',
        description: 'Next-gen gaming console with 1TB storage and 4K graphics support.',
        price: 499.99,
        stock_quantity: 15,
        image_url: 'https://i5.walmartimages.com/seo/2020-New-Sony-Playstation-5-Disc-Version-Video-Game-PS-5-Console_594285d5-4251-485f-b7d5-25e042253e75.89174ac515a7f3cd24f493f899b404eb.jpeg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Electric Kettle',
        description: '1.7L stainless steel kettle with auto shut-off and boil-dry protection.',
        price: 39.99,
        stock_quantity: 80,
        image_url: 'https://hardwarepasal.com/src/img/product/2022-03-11-13-21-29_qhhOLbnXyhproduct.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Smart Watch',
        description: 'Touchscreen smartwatch with fitness tracking and smartphone notifications.',
        price: 199.99,
        stock_quantity: 25,
        image_url: 'https://www.leafstudios.in/cdn/shop/files/1_1099cd20-7237-4bdf-a180-b7126de5ef3d_grande.png?v=1722230645',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Backpack',
        description: 'Durable 30L backpack with laptop compartment and water-resistant material.',
        price: 69.99,
        stock_quantity: 40,
        image_url: 'https://m.media-amazon.com/images/I/61R3gy6ocCL.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('products', products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};