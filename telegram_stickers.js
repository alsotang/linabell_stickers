const sharp = require('sharp')
const fs = require('fs/promises')
const path = require('path')

const originalDir = path.join(__dirname, 'images')

async function main() {
  const imagePaths = await fs.readdir(originalDir)

  for (const imagePath of imagePaths) {
    const image = sharp(path.join(originalDir, imagePath))

    const sticker = await image.resize({
      width: 512,
      height: 512,
      fit: 'contain',
    }).toBuffer()

    const stickerPath = path.join(__dirname, 'telegram_stickers', `${imagePath.split('.')[0]}.webp`)

    await fs.writeFile(stickerPath, sticker)
  }
}

main();