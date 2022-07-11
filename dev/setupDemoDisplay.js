/* eslint-disable no-unused-vars */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { exit } = require('process');
const db = require('../db/db');
const { Category } = require('../db/models');
const getExtFromFilename = require('../util/getExtFromFilename');
const makeThumbnail = require('../util/storage/makeThumbnail');
const { STORAGE_DIR } = require('../support/consts');
const getSafeFilename = require('../util/getSafeFilename');
const connect = require('../db/connect');

// TODO proper title - discuss
const demoTitle = 'Historical Town Walk';

const items = [
  {
    title: 'Ludbrooks Corner',
    thumbnail: { src: '6947770789139578880.png' },
    media: [
      { type: 'video', src: '3 Ludbrooks Corner-1.m4v' }
    ]
  },
  {
    title: 'Post Office',
    thumbnail: { src: '6947770789135384576.png' },
    media: [
      { type: 'video', src: '4 Post Office-1.m4v' }
    ]
  },
  {
    title: 'The Whalebone Tabener\'s Hotel',
    thumbnail: { src: '6947770789051498496.png' },
    media: [
      { type: 'video', src: '5 The Whalebone Tabener\'s Hotel-1.m4v' }
    ]
  },
  {
    title: 'Wonthaggi Railway Station',
    thumbnail: { src: '6947770789106024448.png' },
    media: [
      { type: 'video', src: '6 Wonthaggi Railway Station-1.m4v' }
    ]
  },
  {
    title: 'Air Observers Site',
    thumbnail: { src: '6947770789114413056.png' },
    media: [
      { type: 'video', src: 'Air Observers Site-1.m4v' }
    ]
  },
  {
    title: 'Bank Building',
    thumbnail: { src: '6947770789122801664.png' },
    media: [
      { type: 'video', src: 'Bank Building-1.m4v' }
    ]
  },
];

const getMediaObject = ({ src, alt, type }) => {
  const ext = getExtFromFilename(src);
  const fn = `${getSafeFilename(src)}.${ext}`;
  return {
    src: fn,
    alt,
    type: type || 'image'
  };
};

async function setupDemoDisplay() {
  await connect();
  console.log('Connected to MongoDB');
  // reset database
  await db.connection.dropCollection('categories');
  try {
    const demo = new Category(
      {
        title: demoTitle,
        items: await Promise.all(items.map(async (i) => {
          console.log(i);
          const media = await Promise.all(i.media.map(async (m) => {
            const mediaObj = getMediaObject({
              src: m.src,
              type: m.type,
              alt: m.alt || i.title
            });
            fs.copyFileSync(
              path.resolve(STORAGE_DIR, m.src),
              path.resolve(STORAGE_DIR, mediaObj.src)
            );
            await makeThumbnail(mediaObj.src, mediaObj.type);
            return mediaObj;
          }));

          const tb = i.thumbnail ? getMediaObject({
            src: i.thumbnail.src,
            type: i.thumbnail.type,
            alt: i.thumbnail.alt || i.title
          }) : {};

          if (tb.src) {
            fs.copyFileSync(
              path.resolve(STORAGE_DIR, i.thumbnail.src),
              path.resolve(STORAGE_DIR, tb.src)
            );
            await makeThumbnail(tb.src, 'image');
          }
          return {
            title: i.title,
            media,
            thumbnail: tb
          };
        }))
      }
    );

    demo.thumbnail = demo.items
      .find(({ key }) => key === 'theWhaleboneTabenersHotel')
      .thumbnail;
    const result = await demo.save();
    console.log(result);
    exit(1);
    // persist to database
  } catch (err) {
    console.error(err);
    exit(0);
  }
}

setupDemoDisplay();

module.exports = setupDemoDisplay;
