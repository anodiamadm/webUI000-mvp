import AskForLogin from "./AskForLogin";
import AskForRegister from "./AskForRegister";
import PageHeading from "./PageHeading";

const AuthorizedContents = () => {
  return (
    <div>
      <PageHeading heading={'Require login for this content'} />
      <AskForLogin />
      <AskForRegister />
    </div>
  );
}
 
export default AuthorizedContents;