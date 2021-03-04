import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getPostPreviews, PostPreview } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

interface PropType {
  allPostPreviews: PostPreview[];
}

export async function getStaticProps() {
  const allPostPreviews = getPostPreviews();

  return {
    props: {
      allPostPreviews,
    },
  };
}

export default function Home(props: PropType) {
  const { allPostPreviews } = props;

  return (
    <Layout home={true}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello! I'm Mingyum Kim from South Korea.</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostPreviews.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
