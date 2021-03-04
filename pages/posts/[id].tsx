import Layout from "../../components/layout";
import Date from "../../components/date";
import Head from "next/head";
import { getAllPostIds, getPostData, PostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";

interface PropType {
  postData: PostData;
}

//is it correct?
interface Path {
  params: {
    id: string;
  };
}

export async function getStaticProps(path: Path) {
  const { params } = path;
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths: Path[] = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

export default function Post(props: PropType) {
  const { postData } = props;

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
