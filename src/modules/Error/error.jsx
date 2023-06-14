import { Button, Result,} from 'antd';
const Error = () => (
  <Result
    status="404"
    title="OOPS! PAGE NOT FOUND"
    subTitle="Sorry, the page you are looking for is not found or never exited. Please check the URL and try again."
    extra={
        <Button type='primary' href='http://localhost:3001/app'>Go to Dashboard </Button>
    }
  />
);
export default Error;