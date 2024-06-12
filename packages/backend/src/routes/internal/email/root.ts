import { Endpoint, Schema, Handler } from "@/utility/endpoint";

const schema = Schema({
  tags: ["Email"]
});

const handler = Handler(() => "Hello! Email Routes");

export default Endpoint(schema, handler);
