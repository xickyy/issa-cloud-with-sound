'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Songs'
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
      title: 'Hard work',
      description: 'RIP Juice <3',
      url: 'Hard work url',
      imageUrl: 'Hard work image',
      userId: 1,
      albumId: 2
    },
    {
      // id: 2,
      title: 'Humble',
      description: 'Kendrick tha goat',
      url: 'Humble url',
      imageUrl: 'Humble image',
      userId: 2,
      albumId: 1
    },
    {
      // id: 3,
      title: 'Love letter',
      description: 'I wrote this song in a love letter',
      url: 'Love letter url',
      imageUrl: 'Love letter image',
      userId: 3,
      albumId: 6
    },
    {
      // id: 4,
      title: 'And to those i love, thanks for sticking around',
      description: 'Take me homeee',
      url: 'And to those i love url',
      imageUrl: 'And to those i love image',
      userId: 1,
      albumId: 7
    },
    {
      // id: 5,
      title: 'ZaZa',
      description: 'Flexin',
      url: 'ZaZa url',
      imageUrl: 'ZaZa image',
      userId: 3,
      albumId: 8
    },
    {
      // id: 6,
      title: 'Waves',
      description: 'Im a god',
      url: 'Waves url',
      imageUrl: 'Waves image',
      userId: 3,
      albumId: 5
    },
    {
      // id: 7,
      title: 'Made Of Glass',
      description: 'Am i made up of glass? Do you see straight through me?',
      url: 'Glass url',
      imageUrl: 'Waves image',
      userId: 1,
      albumId: 9
    },
    {
      // id: 8,
      title: 'Coffin',
      description: 'Gimmie the keys to the coupe, ima pull out',
      url: 'Coffin url',
      imageUrl: 'Waves image',
      userId: 2,
      albumId: 10
    },
    {
      // id: 9,
      title: 'Poland',
      description: 'I took the Wock, to Poland',
      url: 'Poland url',
      imageUrl: 'Waves image',
      userId: 3,
      albumId: 11
    },
    {
      // id: 10,
      title: 'Life goes on',
      description: 'On, and on and on and on and on and, On and on and on',
      url: 'Life goes on url',
      imageUrl: 'Waves image',
      userId: 2,
      albumId: 12
    },
    {
      // id: 11,
      title: 'Woke up like this*',
      description: 'Im a Rockstarrr',
      url: 'Woke up url',
      imageUrl: 'Woke up image',
      userId: 1,
      albumId: 13
    },
    {
      // id: 12,
      title: 'Miss you',
      description: 'I dont ever wanna see you and i never wanna miss you again </3',
      url: 'Miss you url',
      imageUrl: 'miss you image',
      userId: 1,
      albumId: 14
    },
    {
      // id: 13,
      title: 'Violent Crimes',
      description: 'Fallin, drreamin, talking in yo sleep. I know you want to cry all night',
      url: 'Violent crimes url',
      imageUrl: 'violent crimes image',
      userId: 3,
      albumId: 14
    },
    {
      // id: 14,
      title: 'Stripper love',
      description: 'She ridin, she rollin',
      url: 'stripper love url',
      imageUrl: 'stripper love image',
      userId: 2,
      albumId: 15
    },
    {
      // id: 15,
      title: 'Backseat Freestyle',
      description: 'MARTIN HAD A DREAMM!!',
      url: 'Backseat url',
      imageUrl: 'Backseat image',
      userId: 1,
      albumId: 16
    },
    {
      // id: 16,
      title: 'Flex',
      description: 'Girl thats bad, for us',
      url: 'Flex url',
      imageUrl: 'Flex image',
      userId: 3,
      albumId: 13
    },
    {
      // id: 17,
      title: '@ MEH',
      description: 'I ride with the choppa, the stick, YEAH',
      url: 'MEH url',
      imageUrl: 'MEH image',
      userId: 2,
      albumId: 17
    },
    {
      // id: 18,
      title: 'EARFQUAKE',
      description: 'Riding around, your love be shakin me up. And its making my heart break... Cause you make my EARTHQUAKE',
      url: 'earfquake url',
      imageUrl: 'earfquake image',
      userId: 2,
      albumId: 4
    },
    {
      // id: 19,
      title: 'IFHY',
      description: 'Ten minutes cant go past without you brushing my thoughts, thats fourteen forty a day, so ill say a hundred and forty four times i think about you or something like that',
      url: 'ifhy url',
      imageUrl: 'ifhy image',
      userId: 1,
      albumId: 17
    },
    {
      // id: 20,
      title: 'Jet fuel',
      description: 'Used to wanna be a super hero... fly around with a cape catching bad guys',
      url: 'jet fuel url',
      imageUrl: 'jet fuel image',
      userId: 3,
      albumId: 3
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Songs'
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete(options, null, {});
  }
};
