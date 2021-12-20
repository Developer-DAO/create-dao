import { Head } from 'next/document';
import { CONFIG } from '../config';

export const SEO = () => {
  const { DAO_NAME, DESCRIPTION } = CONFIG;

  return (
    <Head>
      <title>{DAO_NAME}</title>
      <meta name="description" content={DESCRIPTION} />
    </Head>
  );
};
