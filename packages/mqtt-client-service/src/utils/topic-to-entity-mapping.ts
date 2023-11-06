import { SupportedTopics } from "../constants/topics";
import {
  UpstairsEnv,
  UpstairsEnvMetaData,
} from "../entities/upstairs-env.entity";
import { BoilerTemp, BoilerTempMetaData } from "../entities/boiler-temp.entity";

const EntityMappings: Record<string, typeof BoilerTemp | typeof UpstairsEnv> = {
  [SupportedTopics.BOILER_TEMP]: BoilerTemp,
  [SupportedTopics.UPSTAIRS_ENV]: UpstairsEnv,
};

export const EntityMetadataMappings: Record<
  string,
  typeof BoilerTempMetaData | typeof UpstairsEnvMetaData
> = {
  [SupportedTopics.BOILER_TEMP]: BoilerTempMetaData,
  [SupportedTopics.UPSTAIRS_ENV]: UpstairsEnvMetaData,
};

export default EntityMappings;
