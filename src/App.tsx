import { useConfirm } from "./Components/Confirmation-Modal/Confirm";

const App = () => {
  const confirm = useConfirm();
  const handleClick = async () => {
    const resp = await confirm({
      title: "Delete post ?",
      description:
        "Are you sure you want to delete this post ? This action cannot be undone. ",
    });
    console.log(resp);
    if (resp === true) {
      // complete your action
    }
  };
  return (
    <div className="section">
      <div className="post">
        <h1 className="heading">Dummy Post</h1>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt
        veniam cumque saepe ipsa magni quidem deleniti exercitationem! Nesciunt,
        dolor eaque libero quas illum ipsam provident amet officia inventore
        cumque culpa, blanditiis, suscipit eum reprehenderit eius aperiam. Odio
        nulla, deleniti aspernatur vel atque magni id libero aperiam officia
        sint debitis, quos eos exercitationem provident assumenda natus nisi
        quaerat repudiandae unde ipsa accusantium facilis. Veritatis alias
        assumenda quos qui? Dolorem culpa maiores facere exercitationem nisi
        porro enim sunt maxime! Voluptate, rem. Nostrum distinctio iusto
        quibusdam impedit. Eligendi velit cum quisquam dignissimos ipsum
        consequuntur, iste laboriosam consequatur provident quis at odio fugit
        id. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, corrupti exercitationem. Fuga consectetur suscipit beatae, eveniet saepe ratione sequi unde voluptates voluptatem recusandae modi veniam sint, numquam exercitationem enim dignissimos non similique officia sunt optio harum, velit atque reprehenderit repudiandae! Ratione aspernatur autem, natus architecto accusamus quo omnis iste quaerat quisquam nesciunt illum, corporis obcaecati quidem ut porro ab consequuntur numquam, molestiae minus nisi quasi nemo? Architecto maiores est dolor amet, quibusdam tempora vel voluptatem laborum corporis asperiores explicabo tenetur corrupti voluptates deserunt, facere aut, eaque quas repudiandae aspernatur vero beatae consequatur? Eveniet ratione dolorem aliquid sunt rerum! Commodi deleniti harum dolorem nulla, aliquid rem, sapiente laborum consequatur aspernatur aperiam minima eius accusantium, perspiciatis consequuntur! Eligendi praesentium officiis est dolorem porro soluta qui quis rem, architecto explicabo provident doloremque ipsa tempora mollitia distinctio culpa consequatur id nemo excepturi recusandae corrupti vero quos ex. Quam temporibus vero est voluptates. Maxime, necessitatibus odit. Nihil alias animi fuga cumque perspiciatis dolorum aperiam sunt qui! Laborum iure provident numquam quod, a quis doloribus optio nam, officia impedit eaque ducimus corporis esse, nesciunt assumenda debitis neque recusandae? Ipsa, impedit sapiente quaerat dignissimos excepturi eum quam quae doloremque ducimus, voluptatibus tempora provident hic dolorum, illum pariatur.
      </div>
      <button className="btn" onClick={() => handleClick()}>
        Delete post
      </button>
      <br />
    </div>
  );
};

export default App;
