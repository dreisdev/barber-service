import { PartialType } from "@nestjs/mapped-types";
import CreateExpertDto from "./create-experts";
export default class UpdateExpertDto extends PartialType(CreateExpertDto) { }