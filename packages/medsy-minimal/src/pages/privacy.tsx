import Head from 'next/head';
import Layout from 'containers/layout/layout';
import PolicyPageContent from 'containers/term/terms';
import { privacyData } from 'containers/term/data-privacy';

export default function PrivacyPage() {
  return (
    <Layout style={{ height: 'auto' }}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="description" content="Privacy Policy for Peptide Station. How we collect, use, and protect your personal information." />
        <title>Privacy Policy | Peptide Station</title>
      </Head>
      <PolicyPageContent data={privacyData} />
    </Layout>
  );
}
