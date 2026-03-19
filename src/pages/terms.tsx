import Head from 'next/head';
import Layout from 'containers/layout/layout';
import PolicyPageContent from 'containers/term/terms';
import { termsData } from 'containers/term/data';

export default function TermsPage() {
  return (
    <Layout style={{ height: 'auto' }}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="description" content="Terms and Conditions for Peptide Station. All products are sold for research use only." />
        <title>Terms & Conditions | Peptide Station</title>
      </Head>
      <PolicyPageContent data={termsData} />
    </Layout>
  );
}
