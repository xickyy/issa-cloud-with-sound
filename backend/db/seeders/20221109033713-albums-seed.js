'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Albums'
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(options, [
    {
      // id: 1,
      title: 'DAMN',
      userId: 1,
      description: 'Kendrick really made this album but lets throw Guy at it',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Damn.png'
    },
    {
      // id: 2,
      title: 'WRLD ON DRUGS',
      userId: 2,
      description: 'Sad boii music',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273644c510e8d4c02ae69028297'
    },
    {
      // id: 3,
      title: 'Swimming pools',
      userId: 3,
      description: 'RIP mac <3',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Mac_Miller_-_Swimming.png'
    },
    {
      // id: 4,
      title: 'IGOR',
      userId: 1,
      description: 'Odd future wolf gang kill them all',
      imageUrl: 'https://images.complex.com/images/fl_lossy,q_auto,w_910,dpr_auto/hkcs9pgcxaubh9e9sc4c/tyler-the-creator-igor-cover'
    },
    {
      // id: 5,
      title: 'The life of pablo',
      userId: 3,
      description: 'Ye wit the yeez',
      imageUrl: 'https://www.billboard.com/wp-content/uploads/media/kanye-west-the-life-of-pablo-album-2016-billboard-1024.jpg?w=1024'
    },
    {
      // id: 6,
      title: 'Xtraordinary',
      userId: 3,
      description: 'frosty, the man of snow',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b2738cf7fb63f3d99cbd27fa293a'
    },
    {
      // id: 7,
      title: 'Stop staring at the shadows',
      userId: 3,
      description: 'da $boiiis',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273e2bab14ce82f78a4160376a1'
    },
    {
      // id: 8,
      title: 'Fenix flexin Vol.2',
      userId: 3,
      description: 'flexin x2',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b2732462fcbcbadbcff47d9cb529'
    },
    {
      // id: 9,
      title: 'Teenage Emotions',
      userId: 3,
      description: 'BIG Yachty lil boat',
      imageUrl: 'https://townsquare.media/site/812/files/2017/04/C94DdkBXcAErqTW.jpg?w=980&q=75'
    },
    {
      // id: 10,
      title: 'Lil Boat 3.5',
      userId: 3,
      description: 'Same Yachty, bigger boat',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273789e7bbd2cc0ae4085b4d59f'
    },
    {
      // id: 11,
      title: 'Poland Single',
      userId: 3,
      description: 'PURPLE WOCK BOAT',
      imageUrl: 'https://i.scdn.co/image/ab67616d00001e02615d6910181bc514d4c4b011'
    },
    {
      // id: 12,
      title: 'Ugly is beautiful',
      userId: 3,
      description: 'Thicker and Uglier',
      imageUrl: 'https://images.genius.com/8f4df70c7bfb3ee73752c01b99bac046.1000x1000x1.jpg'
    },
    {
      // id: 13,
      title: 'Playboi Carti',
      userId: 3,
      description: 'Ohh i think they like me, yeah they like me',
      imageUrl: 'https://preview.redd.it/83ksogv9pfi71.jpg?width=640&crop=smart&auto=webp&s=4ed1e34349ae8aecab707fdb3ac9801ac3038e28'
    },
    {
      // id: 14,
      title: 'I hate being bi-polar its awesome',
      userId: 3,
      description: 'I have to dress kim every day so she doesnt embarass me',
      imageUrl: 'https://i.discogs.com/DLyEjqZdSx9eEh4c9je-aWCjBuoDtW1KGPJl5eRQe74/rs:fit/g:sm/q:90/h:596/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyMjU0/NDA5LTE1MzE1MDc4/OTAtNTQwMS5qcGVn.jpeg'
    },
    {
      // id: 15,
      title: 'Stripper Love single',
      userId: 3,
      description: 'Im in love with a stripper',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b27386dab8ea2ec57540fadf6c41'
    },
    {
      // id: 16,
      title: 'Good kid, m.A.A.d city',
      userId: 3,
      description: 'how is this van so iconic lol',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273d58e537cea05c2156792c53d'
    },
    {
      // id: 17,
      title: '@MEH single',
      userId: 3,
      description: 'Yeah im geekin',
      imageUrl: 'https://i1.sndcdn.com/artworks-XhydshqZZNTyCUj9-Aas0Yw-t500x500.jpg'
    },
    {
      // id: 17,
      title: 'Wolf',
      userId: 3,
      description: 'can we add some more color? like some more yellow?',
      imageUrl: 'https://media.pitchfork.com/photos/5931bf4b31bcdd124292962a/master/pass/file'
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Albums'
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete(options, null, {})
  }
};
