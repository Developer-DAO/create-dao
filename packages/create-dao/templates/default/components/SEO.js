import Head from 'next/head';
import { CONFIG } from '../config';

const { DAO_NAME, DESCRIPTION } = CONFIG;

export const SEO = ({ title = DAO_NAME, description = DESCRIPTION }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
};
