const { SitemapStream, streamToPromise } = require('sitemap')
const { createWriteStream } = require('fs')

async function generateSitemap() {
    const sitemapStream = new SitemapStream({ hostname: 'http://localhost:3000/' })
    const writeStream = createWriteStream('./public/sitemap.xml')

    sitemapStream.pipe(writeStream)

    sitemapStream.write({ url: '/', changefreq: 'daily', priority: 0.8 })
    sitemapStream.write({ url: '/about', changefreq: 'weekly', priority: 0.8 })

    const dynamicPages = [
        { slug: 'blog-post-1', lastmod: '2025-10-30' },
        { slug: 'product-item-a', lastmod: '2025-11-01'}
    ]
    dynamicPages.forEach(page => {
        sitemapStream.write({ url: `/$page.slug}`, lastmod: page.lastmod, changefreq: 'weekly', priority: 0.7 })
    })

    sitemapStream.end()
    await streamToPromise(sitemapStream)
    await new Promise(resolve => writeStream.on('finish', resolve))
    console.log('Sitemap generated successfully!')
}

generateSitemap()