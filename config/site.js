module.exports = {
  pathPrefix: '/',
  title: 'Сайт о древнем Египте.', // Navigation and Site Title
  titleAlt: 'Сайт о древнем Египте', // Title for JSONLD
  description: 'Сайт о древнем Египте и многом другом.',
  url: 'https://zealous-bohr-df5586.netlify.com', // Domain of your site. No trailing slash!
  siteUrl: 'https://zealous-bohr-df5586.netlify.com', // url + pathPrefix
  siteLanguage: 'ru',
  logo: 'static/logo/logo.png', // Used for SEO
  banner: 'static/logo/banner.png',
  // JSONLD / Manifest
  favicon: 'static/logo/favicon.png', // Used for manifest favicon generation
  shortName: 'Египет', // shortname for manifest. MUST be shorter than 12 characters
  author: 'Alex', // Author for schemaORGJSONLD
  themeColor: '#001529',
  backgroundColor: '#ffffff',
  twitter: '', // Twitter Username
  menuLinks: [
    {
      name: "home",
      alias: "домой",
      link: "/",
      icon: "home",
      key: 1
    },
    {
      name: "articles",
      alias: "статьи",
      link: "/articles/",
      icon: "read",
      key: 2
    },
    {
      name: "news",
      alias: "новости",
      link: "/news/",
      icon: "notification",
      key: 3
    }
  ],
  helmetMetaData: [
    { name: 'description', content: 'Sample' },
    { name: 'keywords', content: 'sample, something' },
  ],
};