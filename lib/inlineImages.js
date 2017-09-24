const fs = require('fs');
const mime = require('mime');

function inlineImages(str) {
  const hexo = this;
  const log = hexo.log || console;
  const config = hexo.config.inline_images;

  let matches;
  let newStr = str;
  const imageRegex = /<img\s[^>]*?src(\s+)?=[(\s+)"]?([^>\s"]+)[^>]*>/gi;

  if (config.enabled) {
    // eslint-disable-next-line no-cond-assign
    while ((matches = imageRegex.exec(str)) !== null) {
      const src = matches[2];
      const path = `${hexo.theme_dir}source/${src}`;

      try {
        const type = mime.getType(path) || '';
        const data = fs.readFileSync(path);
        const base64 = data.toString('base64');

        // Only inline images smaller than the limit
        if (data.length < hexo.config.inline_images.limit) {
          const newSrc = matches[0].replace(/(src(\s+)?=[(\s+)"]?)[^>\s"]+/, `$1data:${type};base64,${base64}$2`);
          newStr = newStr.replace(matches[0], newSrc);
        }
      } catch (err) {
        log.warn(`Image not found: ${path}`);
      }
    }
  }

  return newStr;
}

module.exports = inlineImages;
