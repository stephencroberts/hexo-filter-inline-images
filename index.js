hexo.config.inline_images = Object.assign({
  enabled: true,
  limit: 100000,
}, hexo.config.inline_images);

hexo.extend.filter.register('after_render:html', require('./lib/inlineImages'));
