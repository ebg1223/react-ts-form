import { RTFSupportedZodTypes } from "./supportedZodTypes";
import { FormComponentMapping } from "./createSchemaForm";
export declare function getComponentForZodType(zodType: RTFSupportedZodTypes, mapping: FormComponentMapping): import("./createSchemaForm").ReactComponentWithRequiredProps<any> | undefined;
