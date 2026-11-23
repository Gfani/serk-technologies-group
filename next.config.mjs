/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [
        { source: '/from-drawing-to-budget-inside-the-serk-ai-estimator', destination: '/from-drawing-to-budget-inside-the-serk-ai-estimator/index.html' },
        { source: '/from-drawing-to-budget-inside-the-serk-ai-estimator/', destination: '/from-drawing-to-budget-inside-the-serk-ai-estimator/index.html' },
        { source: '/the-hospital-that-runs-on-insight', destination: '/the-hospital-that-runs-on-insight/index.html' },
        { source: '/the-hospital-that-runs-on-insight/', destination: '/the-hospital-that-runs-on-insight/index.html' },
        { source: '/close-the-books-faster-what-ai-changes-in-finance', destination: '/close-the-books-faster-what-ai-changes-in-finance/index.html' },
        { source: '/close-the-books-faster-what-ai-changes-in-finance/', destination: '/close-the-books-faster-what-ai-changes-in-finance/index.html' },
        { source: '/ai-integrated-vs-ai-added-later', destination: '/ai-integrated-vs-ai-added-later/index.html' },
        { source: '/ai-integrated-vs-ai-added-later/', destination: '/ai-integrated-vs-ai-added-later/index.html' },
        { source: '/automate-the-boring-amplify-the-brilliant', destination: '/automate-the-boring-amplify-the-brilliant/index.html' },
        { source: '/automate-the-boring-amplify-the-brilliant/', destination: '/automate-the-boring-amplify-the-brilliant/index.html' },
        { source: '/every-sale-tells-a-story-getting-more-from-your-pos', destination: '/every-sale-tells-a-story-getting-more-from-your-pos/index.html' },
        { source: '/every-sale-tells-a-story-getting-more-from-your-pos/', destination: '/every-sale-tells-a-story-getting-more-from-your-pos/index.html' },
        { source: '/five-questions-before-you-buy-business-software', destination: '/five-questions-before-you-buy-business-software/index.html' },
        { source: '/five-questions-before-you-buy-business-software/', destination: '/five-questions-before-you-buy-business-software/index.html' },
        { source: '/one-family-of-systems-the-case-for-connected-software', destination: '/one-family-of-systems-the-case-for-connected-software/index.html' },
        { source: '/one-family-of-systems-the-case-for-connected-software/', destination: '/one-family-of-systems-the-case-for-connected-software/index.html' },
        { source: '/blog-landing-page-business-v1', destination: '/blog-landing-page-business-v1/index.html' },
        { source: '/blog-landing-page-business-v1/', destination: '/blog-landing-page-business-v1/index.html' },
        { source: '/category/latest', destination: '/category/latest/index.html' },
        { source: '/category/latest/', destination: '/category/latest/index.html' },
        { source: '/page/2', destination: '/page/2/index.html' },
        { source: '/page/2/', destination: '/page/2/index.html' },
        { source: '/page/3', destination: '/page/3/index.html' },
        { source: '/page/3/', destination: '/page/3/index.html' },
      ],
    };
  },
  async redirects() {
    return [
      { source: '/about_us', destination: '/about', permanent: true },
      { source: '/about_us/', destination: '/about', permanent: true },
      { source: '/contact_us', destination: '/contact', permanent: true },
      { source: '/contact_us/', destination: '/contact', permanent: true },
      { source: '/services', destination: '/solutions', permanent: true },
      { source: '/services/', destination: '/solutions', permanent: true },
      { source: '/insight', destination: '/insights', permanent: true },
      { source: '/insight/', destination: '/insights', permanent: true },
      { source: '/affiliated', destination: '/products#affiliated', permanent: false },
      { source: '/affiliated/', destination: '/products#affiliated', permanent: false },
      { source: '/category/affiliated', destination: '/products#affiliated', permanent: false },
      { source: '/future-innovation', destination: '/products#future-innovation', permanent: false },
      { source: '/future-innovation/', destination: '/products#future-innovation', permanent: false },
      { source: '/category/future-innovation', destination: '/products#future-innovation', permanent: false },
      { source: '/ai-security', destination: '/products#ai-security', permanent: false },
      { source: '/ai-security/', destination: '/products#ai-security', permanent: false },
      { source: '/category/ai-security', destination: '/products#ai-security', permanent: false },
      { source: '/sector-intelligence', destination: '/products#sector-intelligence', permanent: false },
      { source: '/sector-intelligence/', destination: '/products#sector-intelligence', permanent: false },
      { source: '/category/sector-intelligence', destination: '/products#sector-intelligence', permanent: false },
      { source: '/enterprise-operations', destination: '/products#enterprise-operations', permanent: false },
      { source: '/enterprise-operations/', destination: '/products#enterprise-operations', permanent: false },
      { source: '/category/enterprise-operations', destination: '/products#enterprise-operations', permanent: false },
    ];
  },
};

export default nextConfig;
