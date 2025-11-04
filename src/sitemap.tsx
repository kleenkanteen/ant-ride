import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream } from 'fs'

const sitemap = new SitemapStream({ hostname: 'https://www.antride.com' })

sitemap.write({ url: '/', changefreq: 'monthly', priority: 1.0 })
sitemap.write({ url: '/about', changefreq: 'monthly', priority: 0.8})

sitemap.end()

streamToPromise(sitemap).then(data => {
    createWriteStream('./public/sitemap.xml').write(data)
})