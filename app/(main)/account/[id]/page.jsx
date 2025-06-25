import AccountPage from "./AccountPage";

// app/account/[id]/page.jsx
const Page = ({ params }) => {
    return <AccountPage id={params.id} />;
  };
  
  export default Page;
  