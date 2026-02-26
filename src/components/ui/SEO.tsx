import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
}

const SEO = ({ title, description, url }: SEOProps) => {
  const siteUrl = "https://www.sogoayenigba.site";
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Helmet>
      <title>{title} | Sogo Ayenigba</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
};

export default SEO;