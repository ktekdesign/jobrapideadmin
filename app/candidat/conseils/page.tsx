import Loading from "app/loading";
import getTermAndPosts from "lib/getTermAndPosts";
import PostTypeList from '../../../components/post-type-list';

export default async function RecruteurActionsPage() {
  const data = await getTermAndPosts({slug: "conseils-de-tchadcarriere", type: 'category'})
  return (
    <Loading data={{posts: data?.posts}} loading={!data} >
      <PostTypeList />
    </Loading>
  );
}
