import ForgeUI, {
  GlobalPage,
  Code,
  Heading,
  Fragment,
  Text,
  render,
  useState,
  Button,
  Form,
  TextField,
} from "@forge/ui";
import { webTrigger, storage, fetch } from "@forge/api";

// The `listener` function is called when the webtrigger is invoked
export async function listener(req) {
  try {
    const body = JSON.parse(req.body);
    const newmotd = body.motd;
    await storage.set("motd", newmotd);
    return {
      body: "Success: Message updated\n",
      headers: { "Content-Type": ["application/json"] },
      statusCode: 200,
      statusText: "OK",
    };
  } catch (error) {
    return {
      body: error + "\n",
      headers: { "Content-Type": ["application/json"] },
      statusCode: 400,
      statusText: "Bad Request",
    }
  }
}

// Send message function
export const sendMessage = async (req, mes) => {
  console.log('req', req);
  const response = await fetch(req.trigger, {
    body: JSON.stringify({ motd: mes || "hello from sendMessage" }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  })
  // console.log('response', response);
  console.log(`Response: ${response.status} ${response.statusText}`);
  // console.log(await response.json());
};

// useState is needed to wrap functions that return a promise
const App = () => {
  const [motd] = useState(storage.get("motd"));
  const [trigger] = useState(webTrigger.getUrl("motd-listener"));
  const dataBash = JSON.stringify({ motd: "Hello, world!" });
  const sampleCurlBash = `curl -X POST ${trigger} --data '${dataBash}'`;
  const dataCmd = `"{\\"motd\\":\\"Hello\\"}"`;
  const sampleCurlCmd = `curl -X POST ${trigger} --data ${dataCmd}`;

  // useState is a UI kit hook we use to manage the form data in local state
  const [formState, setFormState] = useState(undefined);

  // Handles form submission, which is a good place to call APIs, or to set component state...
  const onSubmit = async (formData) => {
    /**
     * formData:
     * {
     *    username: 'Username',
     * }
     */
    setFormState(formData);
  };

  return (
    <Fragment>
      <Heading>Set today's message</Heading>
      <Text>To set the message, run the following curl command, then refresh this page.</Text>
      <Text>Bash shell (linux and MacOS):</Text>
      <Code text={sampleCurlBash} language="shell" />
      <Text>cmd (Windows):</Text>
      <Code text={sampleCurlCmd} language="shell" />
      {/* <Code text={`curl -X POST ${trigger} --data "{\\"motd\\":\\"Hello\\"}"`} language="shell" /> */}
      <Text>Or just manually here:</Text>
      <Form
        onSubmit={async (formData) => {
          await sendMessage({ trigger }, formData.message);
        }}
        submitButtonText="Send message"
      >
        <TextField name="message" label="message" />
      </Form>
      {/* <Button
        text="Send message"
        onClick={async () => {
          await sendMessage({ trigger });
        }}
      /> */}
      <Heading>View today's message</Heading>
      <Text>{motd ? motd : "Message not set"}</Text>
    </Fragment>
  );
};

export const run = render(
  <GlobalPage>
    <App />
  </GlobalPage>
);