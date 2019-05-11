import { handleCors, handleCompression, handleBodyRequestParsing } from "./common";
import { handleApiDocs } from "./apiDocs";

export default [handleCors, handleCompression, handleBodyRequestParsing, handleApiDocs];
