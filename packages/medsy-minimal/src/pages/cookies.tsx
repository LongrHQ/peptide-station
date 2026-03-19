import Head from 'next/head';
import Layout from 'containers/layout/layout';
import PolicyPageContent from 'containers/term/terms';
import { cookiesData } from 'containers/term/data-cookies';

export default function CookiesPage() {
  return (
    <Layout style={{ height: 'auto' }}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="description" content="Cookie Policy for Peptide Station. How we use cookies and how you can manage them." />
        <title>Cookie Policy | Peptide Station</title>
      </Head>
      <PolicyPageContent data={cookiesData} />
    </Layout>
  );
}
