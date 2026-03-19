import Head from 'next/head';
import Layout from 'containers/layout/layout';
import PolicyPageContent from 'containers/term/terms';
import { shippingData } from 'containers/term/data-shipping';

export default function ShippingPage() {
  return (
    <Layout style={{ height: 'auto' }}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="description" content="Shipping Policy for Peptide Station. Cold-chain 2-day shipping across the contiguous US. Free shipping on orders over $100." />
        <title>Shipping Policy | Peptide Station</title>
      </Head>
      <PolicyPageContent data={shippingData} />
    </Layout>
  );
}
